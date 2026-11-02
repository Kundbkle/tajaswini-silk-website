# Tejaswini Silk - Owner Deployment & Operations Guide

Welcome! This guide is written in plain, simple language for the owners of **Tejaswini Silk** (Kumthekar Road, Sadashiv Peth, Pune). It explains step-by-step how to set up your free database, launch your website, connect your custom domain, and manage your saree catalog from your smartphone.

---

## Table of Contents
1. [Step 1: Set Up Free Supabase Database & Image Storage](#step-1-set-up-free-supabase-database--image-storage)
2. [Step 2: Create Your Owner Admin Login](#step-2-create-your-owner-admin-login)
3. [Step 3: Deploy on Vercel or Netlify](#step-3-deploy-on-vercel-or-netlify)
4. [Step 4: Add Environment Variables](#step-4-add-environment-variables)
5. [Step 5: Connect Your Custom Domain (tejaswinisilk.com)](#step-5-connect-your-custom-domain-tejaswinisilkcom)
6. [Step 6: How to Add & Edit Sarees from Your Phone](#step-6-how-to-add--edit-sarees-from-your-phone)
7. [Step 7: How to Back Up Your Catalog Data](#step-7-how-to-back-up-your-catalog-data)
8. [Owner Security Checklist](#owner-security-checklist)

---

## Step 1: Set Up Free Supabase Database & Image Storage

Supabase provides your database (PostgreSQL) and image storage for photos on a generous 100% free plan.

1. Go to **[https://supabase.com](https://supabase.com)** and click **"Start your project"**.
2. Sign up with your email (e.g. `tejaswinisilkpune@gmail.com`).
3. Click **"New Project"**:
   - **Name:** `Tejaswini Silk`
   - **Database Password:** Choose a strong password and write it down safely.
   - **Region:** Select **South Asia (Mumbai - ap-south-1)** for the fastest speeds in Pune.
   - Click **"Create new project"** (takes ~1-2 minutes).
4. In your Supabase project dashboard, click on **"SQL Editor"** (icon looking like `>_` on the left sidebar).
5. Click **"New query"**.
6. Open the file `supabase/schema.sql` from your project folder, copy all its contents, and paste it into the Supabase SQL Editor box.
7. Click the green **"Run"** button.
   - *Result:* This automatically creates the `sarees` table, sets up the `saree-images` storage bucket, and activates security policies so only you can add or delete sarees.
8. Go to **Project Settings** (gear icon at bottom left) -> **API**:
   - Copy **Project URL** (e.g., `https://abcdefghijkl.supabase.co`).
   - Copy **anon public API Key** (a long string starting with `eyJ...`).
   - Keep these handy for Step 4.

---

## Step 2: Create Your Owner Admin Login

To log into your private `/admin` panel:

1. In your Supabase dashboard, click **"Authentication"** on the left menu.
2. Click the **"Users"** tab, then click **"Add user"** -> **"Create user"**.
3. Enter your email (e.g. `tejaswinisilkpune@gmail.com`) and a strong password.
4. Toggle **"Auto Confirm User?"** to **ON** (so you don't have to wait for an email confirmation).
5. Click **"Create user"**.
   - *You can now use this email and password to log in at `https://your-domain.com/admin`!*

---

## Step 3: Deploy on Vercel or Netlify

### Option A: Deploy with Vercel (Recommended)
1. Push your project code to a GitHub repository (e.g. `github.com/your-username/tejaswini-silk`).
2. Go to **[https://vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **"Add New..."** -> **"Project"**.
4. Select your `tejaswini-silk` repository and click **"Import"**.
5. Framework Preset will be automatically detected as **Vite**.
6. Do not deploy yet — first add your environment variables in the next step.

### Option B: Deploy with Netlify
1. Go to **[https://netlify.com](https://netlify.com)** and sign in with GitHub.
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Select your repository. Build command will be `npm run build` and publish directory `dist`.

---

## Step 4: Add Environment Variables

In your Vercel or Netlify project settings, find **Environment Variables** and add these three items:

| Variable Name | Value | Where to find it |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase -> Settings -> API -> Project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (your long anon public key) | Supabase -> Settings -> API -> Project API keys (`anon` / `public`) |
| `VITE_SITE_URL` | `https://tejaswinisilk.com` | Your website domain |

Now click **"Deploy"**. Within 1 minute, your website will be live with a secure preview URL!

---

## Step 5: Connect Your Custom Domain (tejaswinisilk.com)

If you purchased `tejaswinisilk.com` on GoDaddy, Namecheap, BigRock, or Google Domains:

1. **In Vercel:**
   - Go to **Project Settings** -> **Domains**.
   - Enter `tejaswinisilk.com` and `www.tejaswinisilk.com` and click **Add**.
   - Vercel will show you the exact DNS records to add.
2. **At your Domain Registrar (e.g. GoDaddy / Namecheap / BigRock):**
   - Log into your domain account and open **DNS Management**.
   - Add an **A Record**:
     - **Name / Host:** `@`
     - **Value / Points to:** `76.76.21.21` (Vercel IP address)
     - **TTL:** Automatic or 3600
   - Add a **CNAME Record**:
     - **Name / Host:** `www`
     - **Value / Points to:** `cname.vercel-dns.com`
     - **TTL:** Automatic or 3600
3. **How long does it take?**
   - DNS updates usually take between **15 minutes to 2 hours** (maximum 24 hours globally).
4. **Enabling HTTPS (Green Padlock):**
   - Vercel and Netlify automatically generate a **free SSL certificate** (Let's Encrypt) as soon as your domain points to the server. You do not need to buy an SSL certificate.

---

## Step 6: How to Add & Edit Sarees from Your Phone

You can add sarees to your website directly from your smartphone while standing in your Kumthekar Road showroom!

1. Open your phone's browser (Safari or Chrome) and visit:  
   `https://tejaswinisilk.com/admin`
2. Log in with your email and password from Step 2.
3. Tap the **"+ Add Saree"** button.
4. **Taking Photos:**
   - Tap **"Take Photo"** to open your phone camera directly and photograph the saree, pallu, and border.
   - Or tap **"Choose from Gallery"** to select multiple photos already taken.
   - *Automatic Fast Loading:* The website automatically compresses and resizes photos inside your phone browser before uploading. You don't have to worry about large file sizes.
   - Tap **"Set Cover"** on any photo to make it the primary thumbnail.
5. **Fill in Details:**
   - Saree Name in English (e.g., *Rani Pink Maharani Mor-Bangadi Paithani*)
   - Marathi Name (e.g., *राणी गुलाबी मोर-बांगडी पैठणी*)
   - Category (Select from Paithani Pure Silk, 9-Yard, etc.)
   - Fabric (Pure Silk, Art Silk, etc.)
   - Price in INR (₹)
   - Colour, Length, and brief description
6. Tap **"Publish Saree to Catalog"**.
   - *The saree is instantly live on your website for customers to view and enquire on WhatsApp!*
7. **One-Tap Toggles on Your Phone:**
   - Tap **"Sold Out" / "In Stock"** to instantly update availability.
   - Tap **"New Arrival"** to feature the saree in the New Arrivals strip.

---

## Step 7: How to Back Up Your Catalog Data

Your data is safely stored in Supabase's cloud, but you can download a complete backup anytime:

1. Open Supabase -> **Table Editor** -> click `sarees`.
2. Click the **"Export"** button at the top right and choose **"Export to CSV"**.
3. Save this CSV file to your computer or Google Drive.
4. Supabase also creates daily automated backups of your database.

---

## Owner Security Checklist

- [x] **Row Level Security (RLS) is Active:** Only logged-in owners can edit or delete products. Public visitors can only view.
- [x] **Only `anon` key is in the frontend:** Your private `service_role` secret key is never used in the website code.
- [x] **Admin URL is private:** The `/admin` route is not linked anywhere in the public customer navigation menus.
- [x] **Robots.txt blocks search engines from admin:** Search engines (Google/Bing) are disallowed from indexing `/admin`.
- [x] **Direct WhatsApp Ordering:** Orders bypass payment gateway fees and send formatted, itemized requests directly to your phone (+91 84460 06000).
