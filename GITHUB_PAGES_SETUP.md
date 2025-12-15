# GitHub Pages Configuration

To properly deploy your Docusaurus site to GitHub Pages, follow these steps:

## 1. Verify GitHub Actions Workflow

The repository already contains the correct workflow configuration in `.github/workflows/deploy.yml` that:
- Builds the Docusaurus site on pushes to the `main` branch
- Publishes the built site to the `gh-pages` branch

## 2. Configure GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages** (in the left sidebar)
3. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)` (this is the default)
4. Click **Save**

## 3. Alternative: Manual gh-pages Branch Creation

If the GitHub Actions workflow fails to create the `gh-pages` branch automatically,
a manual `gh-pages` branch has been created with a basic site structure that can
serve as a placeholder until the Docusaurus build issue is resolved.

## 5. Wait for Deployment

After configuring GitHub Pages:
1. The GitHub Actions workflow will automatically run on the next push to `main`
2. The workflow builds the site and pushes to the `gh-pages` branch
3. GitHub Pages serves the site from that branch

## 6. Access Your Site

Your site will be available at:
- `https://<username>.github.io/<repository-name>/`
- For this repository: `https://owaismukhtarkhan.github.io/hackathon-book-speckit/`

## 7. Troubleshooting

If you still see the README instead of the Docusaurus site:

1. **Check GitHub Pages source**: Ensure it's set to `gh-pages` branch
2. **Wait for build**: The first deployment may take a few minutes
3. **Check Actions**: Verify the workflow completed successfully in the Actions tab
4. **Check branch**: Ensure the `gh-pages` branch exists after a successful build

## 8. Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file in the root with your domain name
2. Configure DNS settings as required by your domain provider