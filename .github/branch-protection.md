# Branch protection for `main` (Anthony)

GitHub MCP cannot set rulesets from here. Do this once in the UI (≈2 min) **or** run the script below after `gh auth login`.

## Option A — GitHub UI (recommended)

1. Open: https://github.com/tp00012x/projecto-municipal/settings/branches
2. **Add branch ruleset** (or classic Branch protection rule) for `main`:
   - Restrict deletions
   - Block force pushes
   - Require a pull request before merging
   - Require approvals: **1** (optional but good while Miki learns)
   - Require review from Code Owners (uses `.github/CODEOWNERS`)
   - Do **not** allow bypass for everyone (Anthony can keep admin bypass if needed)
3. Save.

## Option B — `gh` script

```bash
gh auth login   # once
./.github/scripts/enable-branch-protection.sh
```

## Collaborator permissions

| Person | GitHub | Repo role | Vercel / Neon / `.env` |
|--------|--------|-----------|-------------------------|
| Anthony (`tp00012x`) | admin | admin | yes |
| Content collaborator (`v-leonp` today) | write | **write** | **no** |

If Miki uses another GitHub user, invite them with **Write** (not Admin):

https://github.com/tp00012x/projecto-municipal/settings/access

Never give Miki Vercel Environment Variables or Neon.
