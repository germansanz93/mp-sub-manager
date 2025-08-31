#!/bin/bash

# 🏗️ Script de Build Automatizado - Meli Sub Manager
# Este script genera ejecutables para todos los sistemas operativos

set -e  # Salir si hay algún error

echo "🚀 Iniciando build de Meli Sub Manager..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
fi

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    print_status "Instalando dependencias..."
    npm install
fi

# Limpiar builds anteriores
if [ -d "dist" ]; then
    print_status "Limpiando builds anteriores..."
    rm -rf dist
fi

# Función para build de Linux
build_linux() {
    print_status "Generando ejecutables para Linux..."
    npm run build:linux
    if [ $? -eq 0 ]; then
        print_success "Build de Linux completado exitosamente!"
        ls -la dist/*.AppImage 2>/dev/null || print_warning "No se encontraron archivos AppImage"
    else
        print_error "Error en build de Linux"
        return 1
    fi
}

# Función para build de Windows
build_windows() {
    print_status "Generando ejecutables para Windows..."
    
    # Verificar si Wine está disponible
    if command -v wine &> /dev/null; then
        npm run build:win
        if [ $? -eq 0 ]; then
            print_success "Build de Windows completado exitosamente!"
            ls -la dist/*.exe 2>/dev/null || print_warning "No se encontraron archivos .exe"
        else
            print_error "Error en build de Windows"
            return 1
        fi
    else
        print_warning "Wine no está instalado. No se pueden generar ejecutables de Windows desde Linux."
        print_status "Para instalar Wine: sudo apt install wine (Ubuntu/Debian) o sudo pacman -S wine (Arch/Manjaro)"
        return 1
    fi
}

# Función para build de macOS
build_macos() {
    print_status "Generando ejecutables para macOS..."
    
    # Verificar si estamos en macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        npm run build:mac
        if [ $? -eq 0 ]; then
            print_success "Build de macOS completado exitosamente!"
            ls -la dist/*.dmg 2>/dev/null || print_warning "No se encontraron archivos .dmg"
        else
            print_error "Error en build de macOS"
            return 1
        fi
    else
        print_warning "No estamos en macOS. Los builds de macOS solo se pueden generar desde macOS."
        return 1
    fi
}

# Función para build completo
build_all() {
    print_status "Generando ejecutables para todos los sistemas operativos..."
    
    local success_count=0
    local total_count=0
    
    # Linux
    total_count=$((total_count + 1))
    if build_linux; then
        success_count=$((success_count + 1))
    fi
    
    # Windows
    total_count=$((total_count + 1))
    if build_windows; then
        success_count=$((success_count + 1))
    fi
    
    # macOS
    total_count=$((total_count + 1))
    if build_macos; then
        success_count=$((success_count + 1))
    fi
    
    echo ""
    print_status "Resumen del build:"
    print_success "✅ $success_count de $total_count builds completados exitosamente"
    
    if [ $success_count -eq $total_count ]; then
        print_success "🎉 ¡Todos los builds se completaron exitosamente!"
    else
        print_warning "⚠️  Algunos builds fallaron. Revisa los errores arriba."
    fi
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIÓN]"
    echo ""
    echo "Opciones:"
    echo "  linux     Generar solo para Linux"
    echo "  win       Generar solo para Windows (requiere Wine)"
    echo "  mac       Generar solo para macOS (solo desde macOS)"
    echo "  all       Generar para todos los sistemas (por defecto)"
    echo "  help      Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0          # Build completo (por defecto)"
    echo "  $0 linux    # Solo Linux"
    echo "  $0 win      # Solo Windows"
    echo "  $0 mac      # Solo macOS"
}

# Función principal
main() {
    case "${1:-all}" in
        "linux")
            build_linux
            ;;
        "win"|"windows")
            build_windows
            ;;
        "mac"|"macos")
            build_macos
            ;;
        "all")
            build_all
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Opción desconocida: $1"
            show_help
            exit 1
            ;;
    esac
    
    echo ""
    print_status "Build completado. Los archivos están en la carpeta 'dist/'"
    
    if [ -d "dist" ]; then
        echo ""
        print_status "Archivos generados:"
        ls -la dist/
    fi
}

# Ejecutar función principal
main "$@"
