// Read GH_TOKEN from .env and run electron-builder
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse GH_TOKEN
const tokenMatch = envContent.match(/GH_TOKEN=(.+)/);
if (!tokenMatch) {
    console.error('❌ GH_TOKEN not found in .env file');
    process.exit(1);
}

const token = tokenMatch[1].trim();

// Set environment variable and run electron-builder
process.env.GH_TOKEN = token;

console.log('✅ GH_TOKEN loaded from .env');
console.log('🚀 Starting electron-builder...\n');

try {
    execSync('electron-builder --win --publish always', {
        stdio: 'inherit',
        env: { ...process.env, GH_TOKEN: token }
    });
    console.log('\n✅ Build and publish completed successfully!');
} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}
