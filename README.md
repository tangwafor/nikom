# 🌴 Nikom Ni Mankon

**Maryland Mankon Community Financial Management App**

A web application for managing bi-weekly Njangi contributions and host fees for the Mankon community in Maryland, USA.

## Features

- 💰 **Group Njangi Tracking** - Track $1,000 contributions to group beneficiaries
- 🏠 **Host Fee Tracking** - Track $20 host fees from all members
- 🔐 **Admin Mode** - Password-protected editing (default: `nikom2026`)
- 📱 **WhatsApp Integration** - Generate formatted messages to share in your group
- 📊 **Live Dashboard** - Real-time payment status
- 💾 **Data Persistence** - Saves to browser localStorage

---

## 🚀 Deploy to GitHub Pages (FREE) - Step by Step

### Step 1: Create GitHub Account
1. Go to **[github.com](https://github.com)**
2. Click **"Sign up"** (if you don't have an account)
3. Create your account

### Step 2: Create New Repository
1. Click the **"+"** button (top right corner)
2. Click **"New repository"**
3. Fill in:
   - **Repository name:** `nikom-ni-mankon`
   - **Description:** `Nikom Ni Mankon Management App`
   - Select **"Public"**
4. Click **"Create repository"**

### Step 3: Upload the Files
1. In your new repository, click **"uploading an existing file"**
2. **Drag and drop ALL files** from the extracted zip folder
   - Make sure to include the hidden `.github` folder!
   - On Mac: Press `Cmd + Shift + .` to show hidden files
   - On Windows: In File Explorer, View → Show → Hidden items
3. Scroll down and click **"Commit changes"**

### Step 4: Enable GitHub Pages
1. In your repository, click **"Settings"** (tab at the top)
2. In the left sidebar, click **"Pages"**
3. Under **"Build and deployment"**:
   - **Source:** Select **"GitHub Actions"**
4. That's it! GitHub will automatically build and deploy.

### Step 5: Wait for Deployment
1. Click the **"Actions"** tab in your repository
2. You'll see a workflow running (yellow circle)
3. Wait 1-2 minutes until it turns green ✅
4. Your app is now live!

### Step 6: Get Your Link
Your app will be available at:
```
https://YOUR-USERNAME.github.io/nikom-ni-mankon/
```

Replace `YOUR-USERNAME` with your GitHub username.

---

## 📱 Share with Your WhatsApp Group

Post this message in your Nikom WhatsApp group:

```
🌴 *NIKOM NI MANKON APP* 🌴

View live payment status anytime!

👉 https://YOUR-USERNAME.github.io/nikom-ni-mankon/

📌 Bookmark this link!
```

---

## 🔐 Admin Access

**Default Password:** `nikom2026`

### To Login as Admin:
1. Open the app
2. Click **"🔐 Admin Login"** (top right)
3. Enter password: `nikom2026`
4. Now you can mark payments!

### To Change Password:
1. Before uploading, edit `src/App.jsx`
2. Find line 4:
   ```javascript
   const ADMIN_PASSWORD = 'nikom2026';
   ```
3. Change to your password:
   ```javascript
   const ADMIN_PASSWORD = 'YourNewPassword';
   ```

---

## 📋 How to Use

### For Admin (You):
1. Open app and login as admin
2. Select a meeting
3. Mark payments as members pay ($1,000 Njangi + $20 Host Fee)
4. Go to **"📱 WhatsApp"** tab
5. Generate and share updates to the group

### For Members:
1. Click the shared link
2. View who has paid and who hasn't
3. See their own payment status
4. **Cannot edit** (view only)

---

## ⚠️ Important: Upload Hidden Files!

The `.github` folder is **hidden** but **required** for deployment!

**To see hidden files:**
- **Mac:** In Finder, press `Cmd + Shift + .`
- **Windows:** In File Explorer → View → Show → Hidden items
- **Linux:** Press `Ctrl + H` in file manager

Make sure you upload:
- `.github/` folder (contains `workflows/deploy.yml`)
- All other visible files

---

## 🆘 Troubleshooting

### "404 Not Found" Error
- Wait 2-3 minutes after first deployment
- Make sure GitHub Pages source is set to "GitHub Actions"
- Check the Actions tab for any errors

### Deployment Failed (Red X)
1. Click on the failed workflow in Actions tab
2. Check the error message
3. Common fix: Make sure `.github/workflows/deploy.yml` was uploaded

### Can't See .github Folder
- It's a hidden folder - see instructions above
- You MUST upload this folder for deployment to work

---

## 💡 Tips

1. **Bookmark the link** - Share and pin in WhatsApp group
2. **Same device** - Admin should use same browser (data saves locally)
3. **Regular updates** - Share WhatsApp summaries after meetings
4. **Free forever** - GitHub Pages hosting is 100% free!

---

🌴 *From the fertile raffia groves of Asonka* 🌴

🇨🇲 Mankon × 🇺🇸 Maryland

**Nikom Ni Mankon - Growing Together!**
