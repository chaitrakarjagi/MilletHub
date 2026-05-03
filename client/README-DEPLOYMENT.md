# Frontend Deployment Guide

## Deployment Steps

### 1. Build for Production
```bash
npm run build
```
This creates a `dist` folder with optimized production files.

### 2. Deploy to Netlify

**Option A: Using Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Option B: Using Netlify Dashboard**
1. Go to https://app.netlify.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_BASE_URL=https://millethub-3sa5.onrender.com/api`

### 3. Deploy to Render (Alternative)

1. Go to https://dashboard.render.com
2. Create a new Static Site
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment: `VITE_API_BASE_URL=https://millethub-3sa5.onrender.com/api`

## Environment Variables

The application uses these environment variables:

- **Development** (`.env.local`): `VITE_API_BASE_URL=http://localhost:5000/api`
- **Production** (`.env.production`): `VITE_API_BASE_URL=https://millethub-3sa5.onrender.com/api`

For custom deployments, set `VITE_API_BASE_URL` to your backend URL.

## Local Testing

To test production build locally:
```bash
npm run build
npm run preview
```

This will serve the built files and show you exactly how it will look in production.

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure your backend has CORS enabled for your frontend domain.

### Blank Page After Deployment
Check browser console for errors and ensure API_BASE_URL is correctly set.

### API Calls Failing
Verify that `VITE_API_BASE_URL` environment variable is set in your deployment platform.
