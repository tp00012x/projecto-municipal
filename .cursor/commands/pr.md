# Create a pull request

## Instructions

1. Confirm branch is not `main` and is pushed:
   ```bash
   git branch --show-current
   git status
   git push -u origin HEAD
   ```
2. Summarize `git log main..HEAD` and `git diff main...HEAD --stat`.
3. Create PR with `gh pr create` (base `main`).

### Title

Short, human: what the visitor/campaign gains.

### Body

```markdown
## Summary
- …

## Test plan
- [ ] Homepage loads on mobile and desktop
- [ ] (If content) copy/images look correct
- [ ] (If code) `pnpm build` locally if relevant
```

4. Paste PR URL. **Do not merge** unless user confirms after CI (see no-auto-merge rule).

## Miki-facing summary

Also give 2–3 sentences in plain Spanish describing what changed on the site.
