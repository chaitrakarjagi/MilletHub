# Deployment to Render

## Frontend Deployment Steps

### 1. Prepare Your GitHub Repository

First, push your code to GitHub:

```bash
# From project root
cd c:\Users\prash\Downloads\milletHub
git add .
git commit -m "Prepare frontend for deployment to Render"
git push origin main
```

**Important:** Make sure `.gitignore` includes `node_modules` and `dist` folders.

### 2. Create Render Account

1. Go to https://dashboard.render.com
2. Sign up or log in with your GitHub account
3. Click "Connect GitHub" to authorize Render to access your repositories

### 3. Deploy Frontend to Render

#### Step-by-Step:

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Static Site"**

2. **Connect GitHub Repository:**
   - Select your `milletHub` repository
   - Click "Connect"

3. **Configure Build Settings:**
   - **Name:** `millethub-frontend` (or your preferred name)
   - **Branch:** `main`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Root Directory:** `client`

4. **Set Environment Variables:**
   - Click **"Environment"**
   - Add variable:
     - **Key:** `VITE_API_BASE_URL`
     - **Value:** `https://millethub-3sa5.onrender.com/api`

5. **Click "Create Static Site"**

Render will automatically deploy your site. You'll get a URL like `https://millethub-frontend.onrender.com`

### 4. Automatic Deployments

Every time you push to your `main` branch on GitHub, Render will automatically:
1. Build your project (`npm run build`)
2. Deploy the `dist` folder

### 5. Update Your Client Code

Update the frontend API URL for production:

In `client/src/services/api.js`, the code now uses:
```javascript
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
```

This will automatically use your Render backend URL in production.

### 6. Troubleshooting

**Build Failed:**
- Check the Logs tab in Render dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

**Blank Page/API Errors:**
- Open browser DevTools (F12)
- Check Console for errors
- Verify `VITE_API_BASE_URL` is set correctly
- Ensure MongoDB is accessible from Render IP

**CORS Errors:**
- Check backend CORS configuration
- Verify backend has frontend domain whitelisted
- Ensure backend is running and accessible

## Backend Deployment (Already Done)

Your backend is already deployed at: `https://millethub-3sa5.onrender.com`

Configuration:
- **API Base:** `https://millethub-3sa5.onrender.com/api`
- **MongoDB:** Connected (if IP whitelisted)
- **Environment Variables:** Set in Render dashboard

## Production URLs

After deployment:
- **Frontend:** `https://your-site.onrender.com`
- **Backend API:** `https://millethub-3sa5.onrender.com/api`
- **Products Endpoint:** `https://millethub-3sa5.onrender.com/api/products`

## Monitoring & Logs

1. Go to your Render dashboard
2. Select your service
3. View **"Logs"** for deployment and runtime errors
4. Check **"Events"** for deployment history

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity (cold start ~30s)
- 100 GB bandwidth/month
- For production, consider upgrading to paid tier
