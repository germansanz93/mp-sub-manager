# 🏗️ Guía de Build - Meli Sub Manager

Esta guía explica cómo generar ejecutables para diferentes sistemas operativos.

## 📋 Prerrequisitos

### Para todos los sistemas:
```bash
npm install
```

### Para Windows (desde Linux/macOS):
- Wine (para generar ejecutables de Windows)
- Instalar: `sudo apt install wine` (Ubuntu/Debian) o `brew install wine` (macOS)

### Para macOS (desde Linux/Windows):
- Solo se puede generar desde macOS debido a restricciones de Apple
- Requiere certificados de desarrollador para distribución

## 🚀 Comandos de Build

### Generar para tu sistema actual:
```bash
npm run build
```

### Generar para sistema específico:
```bash
# Windows
npm run build:win

# macOS (solo desde macOS)
npm run build:mac

# Linux
npm run build:linux

# Todos los sistemas (requiere Wine para Windows)
npm run build:all
```

## 📁 Archivos Generados

### Linux
- **AppImage**: `dist/Meli Sub Manager-1.0.0.AppImage`
- **Carpeta descomprimida**: `dist/linux-unpacked/`

### Windows
- **Instalador**: `dist/Meli Sub Manager Setup 1.0.0.exe`
- **Portable**: `dist/Meli Sub Manager.exe`

### macOS
- **DMG**: `dist/Meli Sub Manager-1.0.0.dmg`
- **ZIP**: `dist/Meli Sub Manager-1.0.0-mac.zip`

## 🔧 Configuración de Build

La configuración está en el campo `"build"` del `package.json`:

```json
{
  "build": {
    "appId": "com.tuempresa.meli-sub-manager",
    "productName": "Meli Sub Manager",
    "directories": {
      "output": "dist"
    },
    "files": [
      "src/**/*",
      "node_modules/**/*",
      "package.json"
    ]
  }
}
```

## 🎨 Personalización de Iconos

### Ubicación de iconos:
- **Windows**: `build/icon.ico` (256x256 px)
- **macOS**: `build/icon.icns` (512x512 px)
- **Linux**: `build/icon.png` (512x512 px)

### Crear iconos:
1. Diseña un icono de alta calidad (512x512 px mínimo)
2. Conviértelo a los formatos requeridos
3. Colócalo en la carpeta `build/`

## 📦 Distribución

### Para GitHub Releases:
1. Genera los ejecutables: `npm run build:all`
2. Ve a tu repositorio en GitHub
3. Crea un nuevo Release
4. Sube los archivos de la carpeta `dist/`
5. Etiqueta la versión (ej: v1.0.0)

### Nombres recomendados para releases:
- `Meli Sub Manager Setup 1.0.0.exe` (Windows)
- `Meli Sub Manager-1.0.0.dmg` (macOS)
- `Meli Sub Manager-1.0.0.AppImage` (Linux)

## 🐛 Solución de Problemas

### Error: "cannot execute fpm"
- **Causa**: Problemas con dependencias de Ruby en Linux
- **Solución**: Usar solo AppImage o instalar dependencias de Ruby

### Error: "author email required"
- **Causa**: Falta email en package.json
- **Solución**: Agregar email en el campo author

### Error: "icon not found"
- **Causa**: Iconos faltantes en build/
- **Solución**: Crear iconos o usar iconos por defecto

### Build lento
- **Causa**: Descarga de Electron
- **Solución**: Usar cache local o mirror de Electron

## 🔄 Actualización de Versión

Para actualizar la versión:

1. Cambia la versión en `package.json`
2. Actualiza el changelog
3. Genera nuevos ejecutables
4. Crea un nuevo release en GitHub

## 📱 Plataformas Soportadas

### Windows
- Windows 7+ (64-bit)
- Windows 10+ (32-bit y 64-bit)

### macOS
- macOS 10.12+ (Intel)
- macOS 11+ (Apple Silicon)

### Linux
- Ubuntu 18.04+
- Fedora 28+
- Manjaro
- Arch Linux
- Debian 9+

## 🎯 Próximos Pasos

- [ ] Crear iconos personalizados de alta calidad
- [ ] Configurar CI/CD para builds automáticos
- [ ] Agregar auto-updater
- [ ] Firmar ejecutables para distribución
- [ ] Crear instaladores personalizados

---

**Nota**: Los builds de Windows desde Linux requieren Wine. Los builds de macOS solo se pueden generar desde macOS.
