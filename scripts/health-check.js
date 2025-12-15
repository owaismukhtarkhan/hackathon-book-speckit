#!/usr/bin/env node

/**
 * Health check script for the Physical AI & Humanoid Robotics Book site
 * Checks if the deployed site is accessible and functioning properly
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

async function checkHealth(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Physical-AI-Book-Health-Check/1.0'
      }
    };

    const req = client.request(options, (res) => {
      resolve({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        healthy: res.statusCode >= 200 && res.statusCode < 300,
        timestamp: new Date().toISOString()
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => { // 10 second timeout
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runHealthChecks() {
  console.log('🏥 Running health checks for Physical AI & Humanoid Robotics Book...\n');

  const siteUrl = process.env.SITE_URL || 'https://owaismukhtarkhan.github.io/hackathon-book-speckit';

  const endpointsToCheck = [
    `${siteUrl}`,
    `${siteUrl}/docs/intro`,
    `${siteUrl}/docs/module1`,
    `${siteUrl}/docs/module2`,
    `${siteUrl}/api/status`, // This could be implemented as a status endpoint
  ];

  const results = [];

  for (const endpoint of endpointsToCheck) {
    try {
      console.log(`🔍 Checking: ${endpoint}`);
      const result = await checkHealth(endpoint);
      results.push({ endpoint, ...result });

      if (result.healthy) {
        console.log(`✅ Healthy - Status: ${result.statusCode} ${result.statusMessage}\n`);
      } else {
        console.log(`⚠️ Unhealthy - Status: ${result.statusCode} ${result.statusMessage}\n`);
      }
    } catch (error) {
      console.log(`❌ Error checking ${endpoint}: ${error.message}\n`);
      results.push({
        endpoint,
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Summary
  const healthyCount = results.filter(r => r.healthy).length;
  const totalCount = results.length;

  console.log(`📊 Health Check Summary:`);
  console.log(`   Total endpoints checked: ${totalCount}`);
  console.log(`   Healthy: ${healthyCount}`);
  console.log(`   Unhealthy: ${totalCount - healthyCount}`);

  if (healthyCount === totalCount) {
    console.log(`🎉 All health checks passed!`);
    process.exit(0);
  } else {
    console.log(`🚨 Some health checks failed.`);
    process.exit(1);
  }
}

// For local testing of the site
async function testLocalBuild() {
  console.log('🧪 Testing local build...\n');

  try {
    // Check if build directory exists
    const fs = require('fs');
    const buildDir = './build';

    if (fs.existsSync(buildDir)) {
      const stats = fs.statSync(buildDir);
      if (stats.isDirectory()) {
        console.log('✅ Build directory exists');

        // Check for essential files
        const essentialFiles = [
          'index.html',
          'docs/intro/index.html',
          'assets/js',
          'assets/css'
        ];

        for (const file of essentialFiles) {
          const filePath = `${buildDir}/${file}`;
          if (fs.existsSync(filePath)) {
            console.log(`✅ Essential file exists: ${file}`);
          } else {
            console.log(`❌ Missing essential file: ${file}`);
          }
        }
      }
    } else {
      console.log('❌ Build directory does not exist');
      console.log('💡 Run `npm run build` to create the build directory');
    }
  } catch (error) {
    console.error('❌ Error during local build test:', error.message);
  }
}

// Run health checks
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--local') || args.includes('-l')) {
    testLocalBuild();
  } else {
    runHealthChecks();
  }
}

module.exports = { checkHealth, runHealthChecks, testLocalBuild };