import ghpages from 'gh-pages';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Use short path to avoid ENAMETOOLONG
const tempDir = 'C:\\.undangan-deploy';

async function deploy() {
  // Clean gh-pages cache first to avoid URL mismatch errors
  const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'gh-pages');
  if (fs.existsSync(cacheDir)) {
    console.log('🧹 Cleaning gh-pages cache...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }

  console.log('🚀 Building project...');

  // Run build
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  // Clean and create temp folder
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  // Copy dist to temp folder (short path)
  console.log('📁 Preparing publish folder...');
  fs.mkdirSync(tempDir, { recursive: true });

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

  copyDir(distDir, tempDir);

  console.log('🚀 Deploying to GitHub Pages...');

  ghpages.publish(tempDir, {
    branch: 'gh-pages',
    repo: 'https://github.com/bakjah/undangan-teteh.git',
    dotfiles: true
  }, (err) => {
    if (err) {
      console.error('❌ Deploy failed:', err);
      process.exit(1);
    }
    console.log('✅ Deploy complete!');

    // Clean up temp folder
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
}

deploy();