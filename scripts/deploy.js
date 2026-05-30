import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const tempDir = 'C:\\deploy';

async function deploy() {
  // Clean up temp folder
  console.log('🧹 Cleaning...');
  try {
    execSync(`if exist "${tempDir}" rmdir /s /q "${tempDir}"`, { stdio: 'pipe' });
  } catch {}

  // Run build
  console.log('🚀 Building project...');
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  // Check dist folder
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist folder not found!');
    process.exit(1);
  }

  const files = fs.readdirSync(distDir);
  console.log('📁 dist contents:', files);

  if (files.length === 0) {
    console.error('❌ dist folder is empty!');
    process.exit(1);
  }

  // Create temp folder
  console.log('📁 Creating temp folder...');
  fs.mkdirSync(tempDir, { recursive: true });

  // Copy using xcopy for reliability
  console.log('📋 Copying files...');
  execSync(`xcopy /e /i /y "${distDir}\\*" "${tempDir}"`, { stdio: 'inherit' });

  // Verify copy
  const tempFiles = fs.readdirSync(tempDir);
  console.log('📁 temp contents:', tempFiles);

  if (tempFiles.length === 0) {
    console.error('❌ Copy failed!');
    process.exit(1);
  }

  // Initialize git
  console.log('🔧 Initializing git...');
  process.chdir(tempDir);
  execSync('git init', { stdio: 'inherit' });
  execSync('git config user.name "Deploy Bot"', { stdio: 'inherit' });
  execSync('git config user.email "deploy@bot.local"', { stdio: 'inherit' });
  execSync('git remote add origin https://github.com/Bakjah/undangan-teteh.git', { stdio: 'inherit' });

  // Create .nojekyll to prevent Jekyll processing
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

  // Add all files
  console.log('📝 Adding files...');
  execSync('git add -A', { stdio: 'inherit' });

  // Check staged files
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('📋 Git status:', status);

  if (!status.trim()) {
    console.error('❌ No files to commit!');
    process.exit(1);
  }

  // Commit
  console.log('💾 Committing...');
  execSync('git commit -m "Deploy"', { stdio: 'inherit' });

  // Push to gh-pages
  console.log('🚀 Pushing to GitHub Pages...');
  try {
    execSync('git push origin main:gh-pages --force', { stdio: 'inherit' });
  } catch {
    // If gh-pages doesn't exist, create it
    console.log('📄 Creating new gh-pages branch...');
    execSync('git branch gh-pages', { stdio: 'inherit' });
    execSync('git push origin gh-pages --force', { stdio: 'inherit' });
  }

  console.log('✅ Deploy complete!');
  console.log('🌐 Check: https://Bakjah.github.io/undangan-teteh');

  // Cleanup
  process.chdir(rootDir);
  execSync(`if exist "${tempDir}" rmdir /s /q "${tempDir}"`, { stdio: 'ignore' });

} catch (err) {
  console.error('❌ Deploy failed:', err.message);
  process.exit(1);
}

deploy();