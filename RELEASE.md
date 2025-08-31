# 🚀 Guía de Release - Meli Sub Manager

Esta guía explica cómo crear releases oficiales de la aplicación.

## 📋 Prerrequisitos

- ✅ Código probado y funcionando
- ✅ Tests pasando (si los hay)
- ✅ Documentación actualizada
- ✅ Cambios documentados en CHANGELOG.md

## 🏷️ Proceso de Release

### 1. Preparar el código

```bash
# Asegurarse de estar en la rama main
git checkout main
git pull origin main

# Verificar que no hay cambios pendientes
git status
```

### 2. Actualizar versión

```bash
# Editar package.json y cambiar la versión
# Ejemplo: de "1.0.0" a "1.1.0"

# También actualizar README.md si es necesario
```

### 3. Commit y push de la versión

```bash
git add .
git commit -m "🚀 Release v1.1.0"
git push origin main
```

### 4. Crear tag

```bash
# Crear tag anotado
git tag -a v1.1.0 -m "Release v1.1.0"

# Push del tag
git push origin v1.1.0
```

### 5. GitHub Actions se ejecuta automáticamente

Una vez que se hace push del tag, GitHub Actions:
1. 🏗️ Construye para todas las plataformas
2. 📦 Sube los artifacts
3. 🏷️ Crea el release automáticamente

## 🔄 Release Manual (si es necesario)

Si necesitas crear un release manualmente:

1. Ve a tu repositorio en GitHub
2. Haz clic en "Releases"
3. Haz clic en "Create a new release"
4. Selecciona el tag creado
5. Completa la información del release
6. Sube los archivos de la carpeta `dist/`

## 📁 Archivos a incluir en el Release

### Windows
- `Meli Sub Manager Setup 1.1.0.exe` (Instalador)
- `Meli Sub Manager.exe` (Portable)

### macOS
- `Meli Sub Manager-1.1.0.dmg` (DMG)
- `Meli Sub Manager-1.1.0-mac.zip` (ZIP)

### Linux
- `Meli Sub Manager-1.1.0.AppImage` (AppImage)
- `meli-sub-manager_1.1.0_amd64.deb` (DEB)
- `meli-sub-manager-1.1.0.x86_64.rpm` (RPM)

## 📝 Notas del Release

### Estructura recomendada:

```markdown
🎉 **Meli Sub Manager v1.1.0**

## ✨ Nuevas características
- Funcionalidad de actualización en lote
- Exportación a CSV
- Interfaz mejorada

## 🐛 Correcciones
- Modal que se mostraba automáticamente
- Problemas de paginación

## 🔧 Mejoras técnicas
- Configuración de electron-builder
- Scripts de build automatizados
- GitHub Actions para CI/CD

## 📥 Descargas
[Enlaces automáticos generados por GitHub Actions]

## 🔄 Instrucciones de instalación
1. Descarga el archivo para tu sistema operativo
2. Ejecuta el instalador
3. Configura tu Access Token de Mercado Pago
4. ¡Listo!

---
⭐ **Si te gusta este proyecto, ¡dale una estrella en GitHub!**
```

## 🚨 Solución de Problemas

### Build falla en GitHub Actions
1. Revisa los logs del workflow
2. Verifica que el package.json tenga el email del autor
3. Asegúrate de que todas las dependencias estén en devDependencies

### Release no se crea automáticamente
1. Verifica que el tag esté correctamente pusheado
2. Revisa que el workflow tenga permisos para crear releases
3. Verifica que el GITHUB_TOKEN esté disponible

### Archivos faltantes
1. Verifica que el build se completó exitosamente
2. Revisa que los archivos estén en la carpeta `dist/`
3. Asegúrate de que el workflow esté subiendo los artifacts correctos

## 🔮 Próximos Pasos

- [ ] Configurar auto-updater
- [ ] Firmar ejecutables
- [ ] Notificaciones automáticas
- [ ] Métricas de descargas

## 📞 Soporte

Si tienes problemas con el proceso de release:

1. Revisa los logs de GitHub Actions
2. Verifica la configuración del workflow
3. Abre un issue en el repositorio
4. Consulta la documentación de electron-builder

---

**Nota**: Los releases automáticos solo funcionan cuando se hace push de un tag que comience con `v` (ej: v1.0.0, v2.1.3).
