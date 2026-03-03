# Upstream Merge Rules

## Two-Remote Setup
- `origin` = `rubidanimdm/evebleu-v3` — OUR repo (push here)
- `upstream` = `dekeld4u-ops/eve-concierge-dubai` — Team/Lovable repo (pull only)

## Priority Rule (NON-NEGOTIABLE)
**OUR additions ALWAYS take priority over upstream changes.**

We use Lovable/upstream to receive input from other team members working on the website. When merging upstream:

1. Our custom features, components, and modifications are NEVER removed or overwritten
2. If there is a merge conflict, ASK THE USER what to do — do not auto-resolve
3. After merge, verify all our features still work (build test)

## Our Custom Features (DO NOT REMOVE)
- Google OAuth login (Login.tsx, Signup.tsx)
- Admin Users tab + manage-admin-users edge function
- FloatingChatButton with BOTH AI Concierge + WhatsApp buttons
- ConciergeChat WhatsApp escalation after 3+ messages
- Enhanced AI concierge (multi-language, general knowledge, gemini-2.5-flash-preview)
- Hotel/flight search section on homepage (hidden via `{false &&}` until API ready)
- YachtsPage fallback data (FALLBACK_YACHTS)
- firebase.json cache headers fix
- super admin seeding migration
- AdminUsers.tsx component

## Merge Procedure
```bash
git fetch upstream
git merge upstream/main  # if conflicts, ask user
npm run build            # verify build passes
```
