#!/usr/bin/env bash
set -euo pipefail

DEV_HUB_ALIAS="react-enroll-zelle"
SCRATCH_ALIAS="fi_finder_scratch_$(date +%Y%m%d%H%M%S)"
DURATION_DAYS="7"
SCRATCH_DEF="config/project-scratch-def.json"
BOOTSTRAP_MANIFEST="manifest/financialInstitutionPublicAppScratchBootstrap.xml"
FULL_MANIFEST="manifest/financialInstitutionPublicApp.xml"
BANK_DATA_FILE="scripts/data/zelle-financial-institutions-accounts.csv"
UI_BUNDLE_DIR="force-app/main/default/uiBundles/financialinstitutionfinder"
IMPORT_DATA="true"
OPEN_ORG="false"
RESTART_LOCALHOST="false"
LOCALHOST_PORT="5173"

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
  --ui-bundle-dir <path>     React UI bundle directory for localhost env setup.
                             Default: force-app/main/default/uiBundles/financialinstitutionfinder
  --skip-data                Skip Account data import.
  --restart-localhost        Restart local Vite dev server as the final foreground step.
  --localhost-port <port>    Localhost port to restart/check.
                             Default: 5173
  --open                     Open the scratch org after deployment.
  -h, --help                 Show this help.

Examples:
  scripts/deploy-financial-institution-scratch.sh --dev-hub react-enroll-zelle --alias fi_test
  npm run fi:scratch:deploy -- --dev-hub react-enroll-zelle --alias fi_test --restart-localhost --open
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
        --ui-bundle-dir)
            UI_BUNDLE_DIR="$2"
            shift 2
            ;;
        --skip-data)
            IMPORT_DATA="false"
            shift
            ;;
        --restart-localhost)
            RESTART_LOCALHOST="true"
            shift
            ;;
        --localhost-port)
            LOCALHOST_PORT="$2"
            shift 2
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

run_json_retry() {
    local max_attempts="$1"
    local sleep_seconds="$2"
    shift 2

    local attempt=1
    local output
    while true; do
        if output="$("$@" 2>&1)"; then
            printf '%s' "$output"
            return 0
        fi

        if [[ "$attempt" -ge "$max_attempts" ]]; then
            echo "$output" >&2
            return 1
        fi

        echo "Command failed on attempt $attempt/$max_attempts. Retrying in ${sleep_seconds}s..." >&2
        echo "$output" >&2
        sleep "$sleep_seconds"
        attempt=$((attempt + 1))
    done
}

require_command sf
require_command node

restart_localhost() {
    echo "Restarting local Vite dev server on http://127.0.0.1:${LOCALHOST_PORT}/..."
    if command -v lsof >/dev/null 2>&1; then
        local pids
        pids="$(lsof -tiTCP:"$LOCALHOST_PORT" -sTCP:LISTEN -n -P || true)"
        if [[ -n "$pids" ]]; then
            echo "Stopping existing process(es) on port $LOCALHOST_PORT: $pids"
            kill $pids || true
            sleep 2
        fi
    else
        echo "lsof not found; skipping existing localhost process cleanup."
    fi

    echo "Starting local Vite dev server. Press Ctrl+C when finished."
    cd "$UI_BUNDLE_DIR"
    npm run dev -- --host 127.0.0.1 --port "$LOCALHOST_PORT"
}

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

if [[ ! -d "$UI_BUNDLE_DIR" ]]; then
    echo "UI bundle directory not found: $UI_BUNDLE_DIR" >&2
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

LOCAL_ENV_FILE="$UI_BUNDLE_DIR/.env.local"
printf 'VITE_SF_ORG_ALIAS=%s\n' "$SCRATCH_ALIAS" > "$LOCAL_ENV_FILE"
echo "Localhost Vite target updated: $LOCAL_ENV_FILE -> $SCRATCH_ALIAS"

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
    import_json="$(run_json_retry 3 10 sf data import bulk \
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
Localhost URL: http://127.0.0.1:${LOCALHOST_PORT}/
EOF

if [[ "$RESTART_LOCALHOST" == "true" ]]; then
    restart_localhost
fi
