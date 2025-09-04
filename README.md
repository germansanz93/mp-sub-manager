# Meli Sub Manager 🚀

Una aplicación de escritorio para gestionar suscripciones de Mercado Pago de manera eficiente y visual.

## ✨ Características

- 🔐 **Gestión segura de tokens** con almacenamiento encriptado
- 📊 **Vista de suscripciones** con filtros avanzados
- 🔄 **Actualización individual** de montos de suscripciones
- 📈 **Actualización en lote** con vista previa y confirmación
- 📋 **Exportación a CSV** de suscripciones seleccionadas
- 🎨 **Interfaz moderna** y fácil de usar
- 🔍 **Búsqueda y filtros** por email, monto y estado
- 📱 **Multiplataforma** (Windows, macOS, Linux)

## 🚀 Descargas

### Windows
- **Instalador**: [Meli Sub Manager Setup.exe](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/Meli%20Sub%20Manager%20Setup%201.0.0.exe)
- **Portable**: [Meli Sub Manager.exe](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/Meli%20Sub%20Manager%201.0.0.exe)

### macOS
- **DMG x64**: [Meli Sub Manager-1.0.0.dmg](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/Meli%20Sub%20Manager-1.0.0.dmg)
- **DMG ARM64**: [Meli Sub Manager-1.0.0-arm64.dmg](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/Meli%20Sub%20Manager-1.0.0-arm64.dmg)

### Linux
- **AppImage**: [Meli Sub Manager-1.0.0.AppImage](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/Meli%20Sub%20Manager-1.0.0.AppImage)
- **DEB**: [meli-sub-manager_1.0.0_amd64.deb](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/meli-sub-manager_1.0.0_amd64.deb)
- **RPM**: [meli-sub-manager-1.0.0.x86_64.rpm](https://github.com/germansanz93/meli-sub-manager/releases/latest/download/meli-sub-manager-1.0.0.x86_64.rpm)

## 🛠️ Instalación

### Opción 1: Descargar ejecutable (Recomendado)
1. Descarga el archivo correspondiente a tu sistema operativo desde la sección [Descargas](#-descargas)
2. Ejecuta el instalador o archivo descargado
3. ¡Listo! La aplicación se instalará automáticamente

### Opción 2: Desde código fuente
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/meli-sub-manager.git
cd meli-sub-manager

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Generar ejecutables
npm run build
```

## 📖 Uso

### 1. Configuración inicial
- Al abrir la aplicación por primera vez, se te pedirá tu Access Token de Mercado Pago
- El token se almacena de forma segura en tu sistema

### 2. Ver suscripciones
- La aplicación mostrará automáticamente todas tus suscripciones
- Usa los filtros para buscar por email, monto o estado
- Navega entre páginas si tienes muchas suscripciones

### 3. Actualizar suscripciones individuales
- Haz clic en "Actualizar" en cualquier fila
- Ingresa el nuevo monto
- Confirma los cambios

### 4. Actualización en lote
- Haz clic en "🔄 Actualización en Lote"
- Aplica filtros si quieres actualizar solo ciertas suscripciones
- Ingresa el nuevo monto
- Revisa la vista previa y confirma

### 5. Exportar datos
- Durante la actualización en lote, usa "📊 Exportar CSV"
- El archivo incluirá todas las suscripciones a modificar

## 🔧 Requisitos del Sistema

- **Windows**: Windows 7 o superior (64-bit)
- **macOS**: macOS 10.12 o superior (Intel/Apple Silicon)
- **Linux**: Ubuntu 18.04+, Fedora 28+, o distribuciones similares
- **RAM**: Mínimo 2GB, recomendado 4GB
- **Espacio**: 100MB de espacio libre

## 🚨 Requisitos de Mercado Pago

- **Access Token válido** de Mercado Pago
- **Permisos de lectura y escritura** en suscripciones
- **Cuenta activa** de Mercado Pago

## 🛡️ Seguridad

- Los tokens se almacenan usando el sistema de credenciales del sistema operativo
- No se envían datos sensibles a servidores externos
- Todas las comunicaciones con Mercado Pago usan HTTPS

## 🐛 Reportar Problemas

Si encuentras algún problema:

1. Verifica que tu Access Token sea válido
2. Revisa que tengas permisos suficientes en Mercado Pago
3. Abre un [Issue](https://github.com/tu-usuario/meli-sub-manager/issues) en GitHub
4. Incluye detalles de tu sistema operativo y versión

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Electron](https://www.electronjs.org/) por el framework de aplicaciones de escritorio
- [Mercado Pago](https://www.mercadopago.com/) por la API de suscripciones
- [Keytar](https://github.com/atom/node-keytar) por el almacenamiento seguro de credenciales

## 📞 Soporte

- **GitHub Issues**: [Reportar problemas](https://github.com/tu-usuario/meli-sub-manager/issues)
- **Discussions**: [Preguntas y respuestas](https://github.com/tu-usuario/meli-sub-manager/discussions)
- **Wiki**: [Documentación detallada](https://github.com/tu-usuario/meli-sub-manager/wiki)

---

⭐ **Si te gusta este proyecto, ¡dale una estrella en GitHub!**
