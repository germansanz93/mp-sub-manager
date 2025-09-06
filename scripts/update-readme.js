#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para actualizar automáticamente los enlaces de descarga en README.md
 * con los nombres reales de los archivos generados por electron-builder
 */

const VERSION = process.env.VERSION || '1.0.0';
const REPO_OWNER = 'germansanz93';
const REPO_NAME = 'meli-sub-manager';

// Nombres de archivos generados por electron-builder
const FILES = {
  windows: {
    portable_x64: `Meli Sub Manager ${VERSION}.exe`,
    portable_x86: `Meli Sub Manager ${VERSION}.exe` // 32-bit version
  },
  macos: {
    portable_x64: `Meli Sub Manager-${VERSION}.zip`,
    portable_arm64: `Meli Sub Manager-${VERSION}-arm64.zip`
  },
  linux: {
    appimage: `Meli Sub Manager-${VERSION}.AppImage`,
    deb: `meli-sub-manager_${VERSION}_amd64.deb`,
    rpm: `meli-sub-manager-${VERSION}.x86_64.rpm`
  }
};

function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.error('❌ README.md no encontrado');
    process.exit(1);
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Actualizar enlaces de Windows
  readmeContent = readmeContent.replace(
    /\[Meli Sub Manager\.exe\]\([^)]+\)/g,
    `[Meli Sub Manager.exe](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.windows.portable_x64)})`
  );

  // Actualizar enlaces de macOS
  readmeContent = readmeContent.replace(
    /\[Meli Sub Manager-1\.0\.0\.zip\]\([^)]+\)/g,
    `[Meli Sub Manager-${VERSION}.zip](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.macos.portable_x64)})`
  );

  readmeContent = readmeContent.replace(
    /\[Meli Sub Manager-1\.0\.0-arm64\.zip\]\([^)]+\)/g,
    `[Meli Sub Manager-${VERSION}-arm64.zip](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.macos.portable_arm64)})`
  );

  // Actualizar enlaces de Linux
  readmeContent = readmeContent.replace(
    /\[Meli Sub Manager-1\.0\.0\.AppImage\]\([^)]+\)/g,
    `[Meli Sub Manager-${VERSION}.AppImage](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.linux.appimage)})`
  );

  readmeContent = readmeContent.replace(
    /\[meli-sub-manager_1\.0\.0_amd64\.deb\]\([^)]+\)/g,
    `[meli-sub-manager_${VERSION}_amd64.deb](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.linux.deb)})`
  );

  readmeContent = readmeContent.replace(
    /\[meli-sub-manager-1\.0\.0\.x86_64\.rpm\]\([^)]+\)/g,
    `[meli-sub-manager-${VERSION}.x86_64.rpm](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/${encodeURIComponent(FILES.linux.rpm)})`
  );

  // Escribir el archivo actualizado
  fs.writeFileSync(readmePath, readmeContent);
  
  console.log(`✅ README.md actualizado con versión ${VERSION}`);
  console.log('📁 Archivos configurados:');
  console.log(`   Windows: ${FILES.windows.portable_x64} (x64), ${FILES.windows.portable_x86} (x86)`);
  console.log(`   macOS: ${FILES.macos.portable_x64}, ${FILES.macos.portable_arm64}`);
  console.log(`   Linux: ${FILES.linux.appimage}, ${FILES.linux.deb}, ${FILES.linux.rpm}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  updateReadme();
}

module.exports = { updateReadme, FILES };
