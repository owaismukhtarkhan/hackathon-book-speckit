# Physical AI & Humanoid Robotics Book

A Spec-Driven Book for Absolute Beginners

## Overview

This repository contains the source code for the "Physical AI & Humanoid Robotics" book, built with Docusaurus and designed for educational purposes.

## Deployment Configuration

This project is configured for deployment to GitHub Pages with the following features:

- **GitHub Actions Workflow**: Automated deployment via `.github/workflows/deploy.yml`
- **Environment Validation**: Pre-build validation of required environment variables
- **Health Checks**: Scripts to verify site functionality
- **Production Build**: Optimized build process for production

## Deployment Process

### Prerequisites

- Node.js >= 18.0
- npm

### Environment Variables

Required environment variables are validated before build:

- `NODE_ENV` (set to `production` for builds)

Optional environment variables can be configured in `.env`:

- `SITE_URL` - Production URL for the site
- `BASE_URL` - Base path for the site
- Analytics and monitoring variables

### Build Process

1. **Install dependencies**: `npm install`
2. **Validate environment**: `npm run validate-env`
3. **Build site**: `npm run build`
4. **Run health checks**: `npm run health-check:local`

### GitHub Pages Deployment

The site is configured to deploy to GitHub Pages using the `gh-pages` branch. The workflow is triggered automatically on pushes to the `main` branch.

## Scripts

- `npm run build` - Build the site for production
- `npm run start` - Start the development server
- `npm run serve` - Serve the built site locally
- `npm run validate-env` - Validate environment variables
- `npm run health-check:local` - Run local health checks
- `npm run health-check` - Run health checks on deployed site
- `npm run deploy` - Deploy to GitHub Pages (typically handled by GitHub Actions)

## Current Status

This project is configured for production deployment. The GitHub Actions workflow will handle the build and deployment process automatically when changes are pushed to the main branch.

## Troubleshooting

If the build fails with module parsing errors:
1. Clear the cache: `npm run clear`
2. Ensure all dependencies are installed: `npm install`
3. Check that `NODE_ENV` is set to `production`

## Contributing

See the documentation in the `/docs` directory for detailed information about the book content and contribution guidelines.