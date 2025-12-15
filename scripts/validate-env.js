#!/usr/bin/env node

/**
 * Environment validation script for Docusaurus
 * Validates required environment variables before build/deploy
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

console.log('Validating environment variables...\n');

const requiredEnvVars = [
  'NODE_ENV',
];

const optionalEnvVars = [
  'SITE_URL',
  'BASE_URL',
  'GA_TRACKING_ID',
  'UMAMI_WEBSITE_ID',
  'UMAMI_SCRIPT_URL',
  'GITHUB_TOKEN',
];

let hasErrors = false;

// Check required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found required environment variable: ${envVar}`);
  }
}

// Check optional environment variables
for (const envVar of optionalEnvVars) {
  if (process.env[envVar]) {
    console.log(`✅ Found optional environment variable: ${envVar}`);
  } else {
    console.log(`ℹ️  Optional environment variable not set: ${envVar}`);
  }
}

if (hasErrors) {
  console.error('\n❌ Environment validation failed. Please set all required environment variables.');
  process.exit(1);
} else {
  console.log('\n✅ Environment validation passed!');
}

module.exports = { requiredEnvVars, optionalEnvVars };