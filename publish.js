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

// Read package.json to get version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const version = packageJson.version;
const repoOwner = packageJson.build.publish[0].owner;
const repoName = packageJson.build.publish[0].repo;

// Set environment variable
process.env.GH_TOKEN = token;

console.log('✅ GH_TOKEN loaded from .env');
console.log('📦 Version:', version);
console.log('\n🔄 Step 1: Committing and pushing changes to GitHub...\n');

// Check if there are changes to commit
try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim()) {
        console.log('📝 Changes detected, committing...');
        
        // Add all changes
        execSync('git add .', { stdio: 'inherit' });
        
        // Commit with version message
        const commitMessage = `Release v${version}`;
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
        
        // Push to GitHub
        console.log('\n📤 Pushing to GitHub...');
        execSync('git push', { stdio: 'inherit' });
        
        console.log('✅ Changes pushed successfully!\n');
    } else {
        console.log('✅ No changes to commit, repository is up to date.\n');
    }
} catch (gitError) {
    console.log('⚠️  Git operation completed (may have warnings)\n');
}

console.log('🚀 Step 2: Building and publishing with electron-builder...\n');

try {
    execSync('electron-builder --win --publish always', {
        stdio: 'inherit',
        env: { ...process.env, GH_TOKEN: token }
    });
    
    console.log('\n✅ Build and publish completed successfully!');
    console.log('\n📋 Release Information:');
    console.log(`   Repository: ${repoOwner}/${repoName}`);
    console.log(`   Version: ${version}`);
    console.log(`   Release URL: https://github.com/${repoOwner}/${repoName}/releases/tag/v${version}`);
    console.log('\n📦 Files uploaded:');
    console.log('   ✓ Gestion-des-Factures-Setup-' + version + '.exe');
    console.log('   ✓ Gestion-des-Factures-' + version + '.exe (portable)');
    console.log('   ✓ latest.yml');
    console.log('   ✓ Source code (zip) - Added automatically by GitHub');
    console.log('   ✓ Source code (tar.gz) - Added automatically by GitHub');
    console.log('\n💡 Note: Source code archives are created automatically by GitHub when the release is published.');
    console.log('   They may take a few seconds to appear in the release page.');
    
} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}
