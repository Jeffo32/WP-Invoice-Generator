# Wolfe Productions — Invoice Generator (Vercel)

## Setup & Deployment

### Step 1 — Push to GitHub
Upload this folder to a GitHub repo (or reuse your existing Invoice-Generator repo — just replace the contents).

### Step 2 — Import to Vercel
1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repo
4. Leave all build settings as default — Vercel auto-detects everything
5. Click **Deploy**

### Step 3 — Add Stripe Secret Key
1. In Vercel, go to your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_live_...`
   - **Environment:** Production (and Preview if you want)
3. Click **Save**
4. Go to **Deployments → Redeploy** to apply the env variable

### Step 4 — Test
Open your Vercel URL, generate an invoice — the QR code should appear automatically.

---

### File structure
```
wolfe-invoice-vercel/
├── index.html          # Invoice generator
├── vercel.json         # Vercel config
├── package.json        # Stripe dependency
└── api/
    └── create-payment-link.js  # Serverless function
```
