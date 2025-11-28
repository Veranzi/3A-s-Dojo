# Deployment Guide for Lookout Quest

## Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Lookout Quest"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **That's it!** Your site will be live in minutes.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## Environment Variables

No environment variables are required. The app uses:
- Client-side localStorage for progress tracking
- Static quiz data
- No backend API needed

## Build Settings

Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Optimization

The app is already optimized with:
- Next.js automatic code splitting
- Image optimization (if you add images)
- Static generation where possible
- Client-side caching via localStorage

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18+ (check `package.json` engines if needed)
- Clear `.next` folder and rebuild
- Check for TypeScript errors: `npm run lint`

### Runtime Errors
- Check browser console for errors
- Verify all imports are correct
- Ensure localStorage is available (not in private/incognito mode)

## Support

For issues, check:
- Next.js documentation: https://nextjs.org/docs
- Vercel documentation: https://vercel.com/docs

