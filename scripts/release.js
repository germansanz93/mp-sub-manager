#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script para crear un release completo con versión sincronizada
 * Uso: npm run release 0.0.4
 */

const VERSION = process.argv[2];

if (!VERSION) {
  console.error('❌ Error: Debes especificar una versión');
  console.log('Uso: npm run release 0.0.4');
  process.exit(1);
}

// Validar formato de versión (semver)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(VERSION)) {
  console.error('❌ Error: La versión debe seguir el formato semver (ej: 0.0.4)');
  process.exit(1);
}

console.log(`🚀 Creando release v${VERSION}...`);

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

// 4. Verificar que no hay cambios sin commitear
console.log('🔍 Verificando estado del repositorio...');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.log('📋 Archivos modificados:');
    console.log(gitStatus);
  }
} catch (error) {
  console.error('❌ Error verificando git status:', error.message);
  process.exit(1);
}

// 5. Hacer commit de los cambios
console.log('💾 Haciendo commit de los cambios...');
try {
  execSync(`git add package.json README.md scripts/update-readme.js`, { stdio: 'inherit' });
  execSync(`git commit -m "📝 Update version to ${VERSION}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error haciendo commit:', error.message);
  process.exit(1);
}

// 6. Crear y push del tag
console.log('🏷️ Creando tag...');
try {
  execSync(`git tag -a v${VERSION} -m "Release v${VERSION}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error creando tag:', error.message);
  process.exit(1);
}

// 7. Push de commits y tags
console.log('🚀 Haciendo push...');
try {
  execSync('git push origin main', { stdio: 'inherit' });
  execSync(`git push origin v${VERSION}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error haciendo push:', error.message);
  process.exit(1);
}

console.log(`✅ Release v${VERSION} creado exitosamente!`);
console.log('🔗 GitHub Actions debería iniciar automáticamente el build...');
console.log(`📋 Verifica el progreso en: https://github.com/germansanz93/meli-sub-manager/actions`);
