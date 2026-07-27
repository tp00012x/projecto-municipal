# Create a feature branch

## Instructions

1. Ensure working tree is clean or stash is intentional.
2. Update main:
   ```bash
   git checkout main
   git pull origin main
   ```
3. Create branch:
   ```bash
   git checkout -b [who]/[short-topic]
   ```
   Examples: `miki/update-propuesta-3`, `anthony/fix-hero-scrim`

## Rules

- Lowercase, hyphens, short topic (max ~6 words).
- Do not commit on `main` for experimental content.
