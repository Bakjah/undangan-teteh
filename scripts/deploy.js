import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Short paths to avoid ENAMETOOLONG
const tempDir = 'C:\\deploy';
const repoDir = 'C:\\deploy\\repo';
const gitDir = 'C:\\deploy\\repo\\.git';
const workDir = 'C:\\deploy\\src';

async function deploy() {
  console.log('🚀 Building project...');

  // Run build
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  // Clean up temp folders
  console.log('🧹 Cleaning temp folders...');
  const dirsToClean = ['C:\\deploy'];
  for (const dir of dirsToClean) {
    if (fs.existsSync(dir)) {
      execSync(`rmdir /s /q "${dir}"`, { stdio: 'ignore' });
    }
  }

  // Create fresh directories
  console.log('📁 Preparing deploy folder...');
  fs.mkdirSync(repoDir, { recursive: true });
  fs.mkdirSync(workDir, { recursive: true });

  // Copy dist contents to work dir
  console.log('📋 Copying files...');
  copyDir(distDir, workDir);

  // Initialize git in temp folder
  console.log('🔧 Initializing git...');
  process.chdir(repoDir);
  execSync('git init -b main', { stdio: 'inherit' });
  execSync(`git remote add origin https://github.com/Bakjah/undangan-teteh.git`, { stdio: 'inherit' });

  // Add files and commit
  console.log('📝 Creating commit...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy - ' + new Date().toISOString() + '"', { stdio: 'inherit' });

  // Fetch and handle gh-pages branch
  console.log('🌐 Syncing with GitHub...');
  try {
    execSync('git fetch origin gh-pages', { stdio: 'inherit' });
    execSync('git checkout gh-pages', { stdio: 'inherit' });
    execSync('git rm -rf . 2>nul || true', { stdio: 'inherit' });

    // Copy files again to gh-pages branch
    copyDir(distDir, repoDir);
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Deploy - ' + new Date().toISOString() + '"', { stdio: 'inherit' });
  } catch {
    console.log('📄 Creating new gh-pages branch...');
    execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
    execSync('git rm -rf . 2>nul || true', { stdio: 'inherit' });

    // Copy files again
    copyDir(distDir, repoDir);
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Deploy - ' + new Date().toISOString() + '"', { stdio: 'inherit' });
  }

  // Push to gh-pages
  console.log('🚀 Pushing to GitHub Pages...');
  execSync('git push origin gh-pages --force', { stdio: 'inherit' });

  console.log('✅ Deploy complete!');
  console.log('🌐 Check your site at: https://Bakjah.github.io/undangan-teteh');

  // Cleanup
  process.chdir(rootDir);
  execSync(`rmdir /s /q "C:\\deploy"`, { stdio: 'ignore' });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

deploy().catch(err => {
  console.error('❌ Deploy failed:', err);
  process.exit(1);
});