#!/usr/bin/env bash
set -euo pipefail

TARGET_ORG="${1:-}"

if [[ -z "$TARGET_ORG" ]]; then
  echo "Usage: scripts/validate-public-financial-institution-app.sh <target-org-alias>"
  exit 1
fi

echo "Validating Salesforce CLI"
sf --version

echo "Validating target org access"
sf org display --target-org "$TARGET_ORG"

echo "Validating deployable metadata"
sf project deploy validate \
  --manifest manifest/financialInstitutionPublicApp.xml \
  --target-org "$TARGET_ORG"

echo "Validation complete"
