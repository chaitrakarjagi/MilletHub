# Render Deployment Checklist

## Pre-Deployment ✓

- [x] Frontend build successful (dist folder created)
- [x] Environment variables configured
- [x] API base URL uses environment variables
- [x] Backend is running on Render
- [x] MongoDB IP whitelisted

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Static Site created on Render
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `dist`
- [ ] Root directory set: `client`
- [ ] Environment variable set: `VITE_API_BASE_URL=https://millethub-3sa5.onrender.com/api`
- [ ] Deployment successful (check Render logs)
- [ ] Frontend loads without errors
- [ ] API calls work (check Network tab in DevTools)

## Next Steps

1. **Push to GitHub:**
   ```bash
   cd c:\Users\prash\Downloads\milletHub
   git add .
   git commit -m "Prepare frontend for Render deployment"
   git push origin main
   ```

2. **Create Static Site on Render:**
   - Visit https://dashboard.render.com
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Configure as per RENDER-DEPLOYMENT.md

3. **Verify Deployment:**
   - Visit your Render URL
   - Open DevTools (F12)
   - Check Network tab for API calls
   - Verify all API calls go to backend

## URLs After Deployment

- **Frontend:** `https://your-site-name.onrender.com`
- **Backend:** `https://millethub-3sa5.onrender.com/api`
