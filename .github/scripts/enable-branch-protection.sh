#!/usr/bin/env bash
# Requires: gh auth login (repo admin)
set -euo pipefail

OWNER="${OWNER:-tp00012x}"
REPO="${REPO:-projecto-municipal}"
BRANCH="${BRANCH:-main}"

echo "Applying classic branch protection to ${OWNER}/${REPO}:${BRANCH}…"

gh api \
  --method PUT \
  "repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" \
  --input - <<'EOF'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true
}
EOF

echo "Done. Verify: https://github.com/${OWNER}/${REPO}/settings/branches"
