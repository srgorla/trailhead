#!/usr/bin/env bash
set -euo pipefail

DEV_HUB_ALIAS="react-enroll-zelle"
SCRATCH_ALIAS="fi_finder_scratch_$(date +%Y%m%d%H%M%S)"
DURATION_DAYS="7"
SCRATCH_DEF="config/project-scratch-def.json"
BOOTSTRAP_MANIFEST="manifest/financialInstitutionPublicAppScratchBootstrap.xml"
FULL_MANIFEST="manifest/financialInstitutionPublicApp.xml"
BANK_DATA_FILE="scripts/data/zelle-financial-institutions-accounts.csv"
IMPORT_DATA="true"
OPEN_ORG="false"

usage() {
    cat <<'EOF'
Usage:
  scripts/deploy-financial-institution-scratch.sh [options]

Creates a scratch org from a Dev Hub and deploys the public Financial Institution Finder app.

Options:
  --dev-hub <alias>          Dev Hub alias to create the scratch org from.
                             Default: react-enroll-zelle
  --alias <alias>            Scratch org alias.
                             Default: fi_finder_scratch_<timestamp>
  --duration-days <days>     Scratch org duration in days.
                             Default: 7
  --definition-file <path>   Scratch org definition file.
                             Default: config/project-scratch-def.json
  --data-file <path>         Account CSV data file to import.
                             Default: scripts/data/zelle-financial-institutions-accounts.csv
  --skip-data                Skip Account data import.
  --open                     Open the scratch org after deployment.
  -h, --help                 Show this help.

Examples:
  scripts/deploy-financial-institution-scratch.sh --dev-hub react-enroll-zelle --alias fi_test
  npm run fi:scratch:deploy -- --dev-hub react-enroll-zelle --alias fi_test --open
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --dev-hub)
            DEV_HUB_ALIAS="$2"
            shift 2
            ;;
        --alias)
            SCRATCH_ALIAS="$2"
            shift 2
            ;;
        --duration-days)
            DURATION_DAYS="$2"
            shift 2
            ;;
        --definition-file)
            SCRATCH_DEF="$2"
            shift 2
            ;;
        --data-file)
            BANK_DATA_FILE="$2"
            shift 2
            ;;
        --skip-data)
            IMPORT_DATA="false"
            shift
            ;;
        --open)
            OPEN_ORG="true"
            shift
            ;;
        -h | --help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage
            exit 2
            ;;
    esac
done

require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "Missing required command: $1" >&2
        exit 1
    fi
}

json_get() {
    local expression="$1"
    node -e "
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const data = JSON.parse(input);
const value = (${expression})(data);
if (value === undefined || value === null || value === '') process.exit(1);
console.log(value);
"
}

run_json() {
    local output
    if ! output="$("$@" 2>&1)"; then
        echo "$output" >&2
        exit 1
    fi
    printf '%s' "$output"
}

require_command sf
require_command node

if [[ ! -f "$SCRATCH_DEF" ]]; then
    echo "Scratch org definition file not found: $SCRATCH_DEF" >&2
    exit 1
fi

if [[ ! -f "$BOOTSTRAP_MANIFEST" ]]; then
    echo "Bootstrap manifest not found: $BOOTSTRAP_MANIFEST" >&2
    exit 1
fi

if [[ ! -f "$FULL_MANIFEST" ]]; then
    echo "Full manifest not found: $FULL_MANIFEST" >&2
    exit 1
fi

if [[ "$IMPORT_DATA" == "true" && ! -f "$BANK_DATA_FILE" ]]; then
    echo "Data import file not found: $BANK_DATA_FILE" >&2
    exit 1
fi

echo "Creating scratch org '$SCRATCH_ALIAS' from Dev Hub '$DEV_HUB_ALIAS'..."
create_json="$(run_json sf org create scratch \
    --definition-file "$SCRATCH_DEF" \
    --target-dev-hub "$DEV_HUB_ALIAS" \
    --alias "$SCRATCH_ALIAS" \
    --duration-days "$DURATION_DAYS" \
    --wait 20 \
    --json)"

SCRATCH_USERNAME="$(printf '%s' "$create_json" | json_get "data => data.result.username")"
SCRATCH_ORG_ID="$(printf '%s' "$create_json" | json_get "data => data.result.orgId")"

echo "Scratch org created."
echo "  Alias: $SCRATCH_ALIAS"
echo "  Username: $SCRATCH_USERNAME"
echo "  Org ID: $SCRATCH_ORG_ID"

echo "Deploying bootstrap manifest..."
sf project deploy start --manifest "$BOOTSTRAP_MANIFEST" --target-org "$SCRATCH_ALIAS" --wait 30

echo "Deploying guest sharing rule..."
sf project deploy start \
    --metadata SharingGuestRule:Account.PublicActiveFinancialInstitutions \
    --target-org "$SCRATCH_ALIAS" \
    --wait 20

echo "Assigning admin permission set..."
sf org assign permset \
    --name Financial_Institution_Public_App_Admin \
    --target-org "$SCRATCH_ALIAS"

echo "Finding generated site guest user..."
guest_json="$(run_json sf data query \
    --target-org "$SCRATCH_ALIAS" \
    --query "SELECT Id, Username, Profile.Name FROM User WHERE UserType = 'Guest' AND Username LIKE 'fifinderapp%'" \
    --json)"

GUEST_USERNAME="$(printf '%s' "$guest_json" | json_get "data => data.result.records[0] && data.result.records[0].Username")"
echo "Guest user: $GUEST_USERNAME"

echo "Assigning guest permission set..."
sf org assign permset \
    --name Financial_Institution_Public_App_Guest \
    --on-behalf-of "$GUEST_USERNAME" \
    --target-org "$SCRATCH_ALIAS"

if [[ "$IMPORT_DATA" == "true" ]]; then
    echo "Importing bank Account data from $BANK_DATA_FILE..."
    import_json="$(run_json sf data import bulk \
        --sobject Account \
        --file "$BANK_DATA_FILE" \
        --target-org "$SCRATCH_ALIAS" \
        --wait 10 \
        --json)"

    PROCESSED_RECORDS="$(printf '%s' "$import_json" | json_get "data => data.result.processedRecords")"
    SUCCESSFUL_RECORDS="$(printf '%s' "$import_json" | json_get "data => data.result.successfulRecords")"
    FAILED_RECORDS="$(printf '%s' "$import_json" | json_get "data => data.result.failedRecords")"
    echo "Data import complete: $SUCCESSFUL_RECORDS successful, $FAILED_RECORDS failed, $PROCESSED_RECORDS processed."
fi

echo "Verifying public active Account records..."
count_json="$(run_json sf data query \
    --target-org "$SCRATCH_ALIAS" \
    --query "SELECT COUNT(Id) total FROM Account WHERE Publicly_Listed__c = true AND Institution_Status__c = 'Active'" \
    --json)"
PUBLIC_RECORD_COUNT="$(printf '%s' "$count_json" | json_get "data => data.result.records[0].total")"
echo "Public active Account records: $PUBLIC_RECORD_COUNT"

echo "Verifying site network..."
network_json="$(run_json sf data query \
    --target-org "$SCRATCH_ALIAS" \
    --query "SELECT Id, Name, Status, UrlPathPrefix FROM Network WHERE Name = 'fifinderapp'" \
    --json)"
NETWORK_STATUS="$(printf '%s' "$network_json" | json_get "data => data.result.records[0].Status")"
NETWORK_PREFIX="$(printf '%s' "$network_json" | json_get "data => data.result.records[0].UrlPathPrefix")"
echo "Network status: $NETWORK_STATUS ($NETWORK_PREFIX)"

echo "Verifying Zelle logo CSP trusted site..."
csp_json="$(run_json sf data query \
    --use-tooling-api \
    --target-org "$SCRATCH_ALIAS" \
    --query "SELECT Id, DeveloperName, EndpointUrl, IsActive FROM CspTrustedSite WHERE DeveloperName = 'ZellePay_Logos'" \
    --json)"
CSP_ENDPOINT="$(printf '%s' "$csp_json" | json_get "data => data.result.records[0].EndpointUrl")"
CSP_ACTIVE="$(printf '%s' "$csp_json" | json_get "data => data.result.records[0].IsActive")"
echo "CSP trusted site: $CSP_ENDPOINT active=$CSP_ACTIVE"

display_json="$(run_json sf org display --target-org "$SCRATCH_ALIAS" --json)"
INSTANCE_URL="$(printf '%s' "$display_json" | json_get "data => data.result.instanceUrl")"
PUBLIC_URL="$(printf '%s' "$INSTANCE_URL" | node -e "
const input = require('fs').readFileSync(0, 'utf8').trim();
const url = new URL(input);
url.hostname = url.hostname.replace('.my.salesforce.com', '.my.site.com');
url.pathname = '/fifinderapp/';
console.log(url.toString());
")"

echo "Checking public site URL..."
if command -v curl >/dev/null 2>&1; then
    curl -I "$PUBLIC_URL"
else
    echo "curl not found; skipping HTTP check."
fi

if [[ "$OPEN_ORG" == "true" ]]; then
    echo "Opening scratch org..."
    sf org open --target-org "$SCRATCH_ALIAS" --path /lightning/setup/SetupOneHome/home
fi

cat <<EOF

Done.
Scratch org alias: $SCRATCH_ALIAS
Scratch org username: $SCRATCH_USERNAME
Guest username: $GUEST_USERNAME
Public app URL: $PUBLIC_URL
EOF
