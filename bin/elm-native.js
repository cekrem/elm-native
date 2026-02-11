#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Usage: elm-native <project-name>");
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

const packageId = "com.example." + projectName.replace(/[^a-zA-Z0-9]/g, "");
const templateDir = path.join(__dirname, "..", "template");

console.log(`\nCreating elm-native project "${projectName}"...\n`);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    if (destName === "_package.json") destName = "package.json";
    if (destName === "_gitignore") destName = ".gitignore";

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      content = content.replace(/\{\{PACKAGE_ID\}\}/g, packageId);
      fs.writeFileSync(destPath, content);
      console.log(`  ${path.relative(process.cwd(), destPath)}`);
    }
  }
}

copyDir(templateDir, projectDir);

// Write capacitor.config.json directly (avoids needing interactive `npx cap init`)
const capacitorConfig = {
  appId: packageId,
  appName: projectName,
  webDir: "dist",
};
const capConfigPath = path.join(projectDir, "capacitor.config.json");
fs.writeFileSync(capConfigPath, JSON.stringify(capacitorConfig, null, 2) + "\n");
console.log(`  ${path.relative(process.cwd(), capConfigPath)}`);

console.log(`\nInstalling dependencies...\n`);
execSync("npm install", { cwd: projectDir, stdio: "inherit" });

console.log(`\nAdding Android platform...\n`);
execSync("npx cap add android", { cwd: projectDir, stdio: "inherit" });

console.log(`\nAdding iOS platform...\n`);
execSync("npx cap add ios", { cwd: projectDir, stdio: "inherit" });

console.log(`
Done! Next steps:

  cd ${projectName}

  # Development
  npm run dev        # Start dev server
  npm run sync       # Build + sync to native projects
  npm run open:android  # Open in Android Studio
  npm run open:ios      # Open in Xcode
`);
