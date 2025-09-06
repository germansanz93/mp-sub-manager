#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para actualizar la versión en todos los archivos sin hacer release
 * Uso: npm run update-version 0.0.4
 */

const VERSION = process.argv[2];

if (!VERSION) {
  console.error('❌ Error: Debes especificar una versión');
  console.log('Uso: npm run update-version 0.0.4');
  process.exit(1);
}

// Validar formato de versión (semver)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(VERSION)) {
  console.error('❌ Error: La versión debe seguir el formato semver (ej: 0.0.4)');
  process.exit(1);
}

console.log(`📝 Actualizando versión a ${VERSION}...`);

// 1. Actualizar package.json
console.log('📦 Actualizando package.json...');
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.version = VERSION;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

// 2. Actualizar README.md
console.log('📝 Actualizando README.md...');
const readmePath = path.join(__dirname, '..', 'README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Reemplazar todas las versiones en el README
readmeContent = readmeContent.replace(/1\.0\.0/g, VERSION);
fs.writeFileSync(readmePath, readmeContent);

// 3. Actualizar script de actualización del README
console.log('🔧 Actualizando script de actualización...');
const updateScriptPath = path.join(__dirname, 'update-readme.js');
let updateScriptContent = fs.readFileSync(updateScriptPath, 'utf8');

// Reemplazar la versión por defecto en el script
updateScriptContent = updateScriptContent.replace(
  /const VERSION = process\.env\.VERSION \|\| '1\.0\.0';/,
  `const VERSION = process.env.VERSION || '${VERSION}';`
);
fs.writeFileSync(updateScriptPath, updateScriptContent);

console.log(`✅ Versión actualizada a ${VERSION} en todos los archivos`);
console.log('💡 Para hacer el release completo, ejecuta: npm run release ' + VERSION);
