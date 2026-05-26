# Step-by-Step: Move Your Site to a Fresh GitHub Repo

Total time: ~15 minutes. Your live website stays up the entire time. Your domain does NOT need to be reconnected.

---

## Before you start — open these in separate browser tabs

1. **Lovable** — your current project (this one)
2. **GitHub** — logged into the account that owns your current repo
3. **Netlify** — logged into your dashboard, on the `reevestreesurgeons` site

Have your 3 screenshots handy (build settings, env vars empty, domain settings). You probably won't need them, but good to have.

---

## STEP 1 — Remix the project in Lovable (3 minutes)

This creates a clean copy of your project with no broken Git history.

1. In Lovable (this project), click your **project name** in the top-left corner.
2. Click **Settings**.
3. Scroll to the **General** section.
4. Find **"Remix this project"** and click it.
5. A dialog appears. Give the remix a name like: `reeves-tree-surgeons-v2`
6. **IMPORTANT**: If you see an option for "Remix without history" or similar — choose that one. (This is the whole point — it leaves the broken Git history behind.)
7. Click **Remix**.

Lovable will open the new project automatically. Your **old project is untouched** and your live site keeps running.

✅ Checkpoint: You're now inside the new remixed project. The URL in your browser changed to a new project ID.

---

## STEP 2 — Connect the remix to a new GitHub repo (3 minutes)

1. In the new remixed project, click the **Plus (+) button** in the chat input at the bottom-left.
2. Click **GitHub**.
3. Click **Connect project** (or **Create Repository**).
4. If GitHub asks you to authorize, click **Authorize**.
5. Choose the same GitHub account/organization you used before.
6. Give the new repo a name like: `reeves-tree-surgeons-v2` (must be different from the old repo name).
7. Click **Create Repository**.

Wait ~30 seconds. Lovable pushes all your code to the new GitHub repo.

✅ Checkpoint: Go to GitHub in another tab. You should see the new repo with all your files in it.

---

## STEP 3 — Point Netlify at the new GitHub repo (5 minutes)

This is the only "scary" step but it's just clicking a few buttons. Your domain and DNS stay exactly as they are.

1. Open **Netlify** → click your `reevestreesurgeons` site.
2. In the left sidebar, click **Site configuration** (or **Build & deploy**, depending on Netlify's layout).
3. Click **Build & deploy** → **Continuous deployment**.
4. Find the section called **Build settings** → look for **"Link to a different repository"** or **"Manage repository"** → click it.
   - If you don't see that option, look for **"Repository"** with a link/edit button next to it.
5. Netlify will ask you to **authorize GitHub again** — click through.
6. A list of your GitHub repos appears. **Select the new repo** (`reeves-tree-surgeons-v2`).
7. Netlify shows the build settings page. Confirm these:
   - **Branch to deploy**: `main`
   - **Build command**: (leave whatever appears — `netlify.toml` will override it)
   - **Publish directory**: `dist`
8. Click **Save** (or **Deploy site**).

Netlify will now start a fresh build using the new repo.

✅ Checkpoint: Go to **Deploys** in the Netlify left sidebar. You'll see a new build in progress (yellow). Wait 2–3 minutes for it to turn green ("Published").

---

## STEP 4 — Verify the site still works (2 minutes)

1. Open **https://www.reevestreesurgeons.co.uk** in a new browser tab (or refresh if already open).
2. Check that the site loads exactly as before.
3. Click a few pages to confirm navigation works.
4. Try submitting a quote form to confirm the backend (Supabase) still connects.

If anything looks broken, **don't panic** — come back here and tell me what you see. The old repo and old project still exist, so nothing is destroyed.

---

## STEP 5 — Cleanup (optional, do later)

Once you're confident the new setup works (give it a few days):
- You can **archive or delete** the old GitHub repo
- You can **delete** the old Lovable project

Don't do this on day one. Leave them as a safety net.

---

## What does NOT change (reassurance)

| Thing | Status |
|---|---|
| Your domain `reevestreesurgeons.co.uk` | ✅ Stays exactly as is |
| DNS records | ✅ No changes needed |
| SSL certificate | ✅ Stays |
| Supabase database / forms / emails | ✅ Untouched |
| Live site uptime during the switch | ✅ Zero downtime |
| Google Ads conversion tracking | ✅ Keeps working |

---

## If you get stuck

Tell me **exactly which step number** you're on and **what you see on screen** (a screenshot is perfect). I'll get you unstuck in one reply.

Ready to start? Begin with Step 1 when you have 15 minutes free.
