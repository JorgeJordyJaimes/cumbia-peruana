# ==============================================================================
# INSTALADOR DE SKILLS GLOBALES PARA ANTIGRAVITY (WINDOWS)
# ==============================================================================
# Ejecuta este script en tu Laptop o cualquier PC para registrar todas las skills
# en la carpeta global (~/.gemini/config/skills) y tenerlas disponibles en todos
# tus proyectos con el selector '/'.
# ==============================================================================

$GlobalSkillsDir = Join-Path $env:USERPROFILE ".gemini\config\skills"
$ProjectSkillsDir = Join-Path $PSScriptRoot "..\.agents\skills\*"
$LockSource = Join-Path $PSScriptRoot "..\skills-lock.json"
$LockDest = Join-Path $env:USERPROFILE ".gemini\config\skills-lock.json"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   CONFIGURANDO SKILLS GLOBALES DE ANTIGRAVITY" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Asegurar directorio global
if (-not (Test-Path $GlobalSkillsDir)) {
    Write-Host "[1/3] Creando carpeta global: $GlobalSkillsDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $GlobalSkillsDir -Force | Out-Null
} else {
    Write-Host "[1/3] Carpeta global detectada en: $GlobalSkillsDir" -ForegroundColor Green
}

# 2. Copiar todas las skills del repositorio a la carpeta global
Write-Host "[2/3] Copiando skills hacia el entorno global..." -ForegroundColor Yellow
Copy-Item -Path $ProjectSkillsDir -Destination $GlobalSkillsDir -Recurse -Force

# 3. Copiar registro skills-lock.json
if (Test-Path $LockSource) {
    Write-Host "[3/3] Registrando manifiesto skills-lock.json..." -ForegroundColor Yellow
    Copy-Item -Path $LockSource -Destination $LockDest -Force
}

$Count = (Get-ChildItem -Path $GlobalSkillsDir -Directory).Count
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " ¡COMPLETADO CON ÉXITO!" -ForegroundColor Green
Write-Host " Total de skills globales activas en esta máquina: $Count" -ForegroundColor Green
Write-Host " Ahora podrás usar '/' y citarlas en cualquier proyecto." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
