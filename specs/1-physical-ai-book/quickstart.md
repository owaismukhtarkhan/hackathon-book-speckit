# Quickstart Guide: Physical AI & Humanoid Robotics Book

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/owaismukhtarkhan/hackathon-book-speckit.git
   cd hackathon-book-speckit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   This command starts a local development server and opens the application in your browser at `http://localhost:3000`.

4. **Edit content**
   - Content files are located in the `docs/` directory
   - Changes to content are automatically reflected in the browser

5. **Build for production**
   ```bash
   npm run build
   ```

   This command generates static content in the `build/` directory, which can be served using any static hosting service.

## Content Structure

- `docs/` - Contains all book content in MDX format
- `src/` - Custom React components
- `static/` - Static assets like images
- `docusaurus.config.js` - Main configuration file
- `sidebars.js` - Navigation structure

## Adding New Content

1. Create a new MDX file in the appropriate module directory within `docs/`
2. Add the file to the sidebar configuration in `sidebars.js`
3. Use the frontmatter to specify metadata:

```md
---
title: Your Content Title
sidebar_position: 1
description: Brief description of the content
tags: [tag1, tag2]
---
```

## Custom Components

The book includes several custom components for interactive learning:

- `InteractiveExercise` - For code exercises with real-time feedback
- `SimulationViewer` - For embedding simulation content
- `ProgressTracker` - For tracking learning progress
- `Assessment` - For quizzes and assessments