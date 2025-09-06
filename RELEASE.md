# 🚀 Guía de Release

Esta guía explica cómo crear releases de manera consistente y automatizada.

## 📋 Comandos Disponibles

### 1. Actualizar Versión (Solo archivos)
```bash
npm run update-version 0.0.4
```
- Actualiza la versión en `package.json`, `README.md` y `scripts/update-readme.js`
- **NO** hace commit ni push
- Útil para revisar cambios antes del release

### 2. Release Completo
```bash
npm run release 0.0.4
```
- Actualiza la versión en todos los archivos
- Hace commit de los cambios
- Crea el tag `v0.0.4`
- Hace push de commits y tags
- **Inicia automáticamente GitHub Actions**

## 🔄 Flujo de Trabajo Recomendado

### Para un Release Normal:
```bash
# 1. Actualizar versión y revisar cambios
npm run update-version 0.0.4

# 2. Revisar los cambios
git diff

# 3. Si todo está bien, hacer el release
npm run release 0.0.4
```

### Para un Release Rápido:
```bash
# Hacer todo de una vez
npm run release 0.0.4
```

## 📁 Archivos que se Actualizan

- `package.json` - Campo `version`
- `README.md` - Todas las referencias a `1.0.0`
- `scripts/update-readme.js` - Versión por defecto

## 🏷️ Tags y Commits

- **Tag**: `v0.0.4` (con mensaje "Release v0.0.4")
- **Commit**: "📝 Update version to 0.0.4"
- **Push**: Commits y tags se suben a `origin/main`

## ⚠️ Requisitos

- Debe estar en la rama `main`
- No debe haber cambios sin commitear (excepto los que modifica el script)
- Debe tener permisos de push al repositorio

## 🔍 Verificación

Después del release, puedes verificar:
- [GitHub Actions](https://github.com/germansanz93/meli-sub-manager/actions)
- [Releases](https://github.com/germansanz93/meli-sub-manager/releases)
- [Tags](https://github.com/germansanz93/meli-sub-manager/tags)

## 🐛 Solución de Problemas

### Error: "Debes especificar una versión"
```bash
# Usar formato semver
npm run release 0.0.4  # ✅ Correcto
npm run release v0.0.4 # ❌ Incorrecto
```

### Error: "La versión debe seguir el formato semver"
```bash
# Usar formato X.Y.Z
npm run release 0.0.4   # ✅ Correcto
npm run release 0.4     # ❌ Incorrecto
npm run release 0.0.4.1 # ❌ Incorrecto
```

### Error de Git
- Verificar que estás en la rama `main`
- Verificar que no hay cambios sin commitear
- Verificar permisos de push