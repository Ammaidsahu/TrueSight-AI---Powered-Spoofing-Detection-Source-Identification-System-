# Truesight Service Check Script
Write-Host "=== Truesight Service Check ===" -ForegroundColor Cyan
Write-Host ""

# Check Docker
Write-Host "Checking Docker..." -ForegroundColor Yellow
$dockerRunning = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue
if ($dockerRunning) {
    Write-Host "✓ Docker Desktop is running" -ForegroundColor Green
} else {
    Write-Host "✗ Docker Desktop is NOT running" -ForegroundColor Red
    Write-Host "  Please start Docker Desktop first" -ForegroundColor Yellow
}

Write-Host ""

# Check Ports
Write-Host "Checking Ports..." -ForegroundColor Yellow
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
$port8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue

if ($port5173) {
    Write-Host "✓ Port 5173 is in use (Frontend may be running)" -ForegroundColor Green
} else {
    Write-Host "✗ Port 5173 is available (Frontend not running)" -ForegroundColor Red
}

if ($port8000) {
    Write-Host "✓ Port 8000 is in use (Backend may be running)" -ForegroundColor Green
} else {
    Write-Host "✗ Port 8000 is available (Backend not running)" -ForegroundColor Red
}

Write-Host ""

# Check Docker Containers
Write-Host "Checking Docker Containers..." -ForegroundColor Yellow
try {
    $containers = docker ps --format "{{.Names}} {{.Status}}" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $frontendContainer = $containers | Select-String "frontend"
        $backendContainer = $containers | Select-String "backend"
        
        if ($frontendContainer) {
            Write-Host "✓ Frontend container: $frontendContainer" -ForegroundColor Green
        } else {
            Write-Host "✗ Frontend container not running" -ForegroundColor Red
        }
        
        if ($backendContainer) {
            Write-Host "✓ Backend container: $backendContainer" -ForegroundColor Green
        } else {
            Write-Host "✗ Backend container not running" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "  Could not check Docker containers" -ForegroundColor Yellow
}

Write-Host ""

# Check Environment File
Write-Host "Checking Configuration..." -ForegroundColor Yellow
if (Test-Path "frontend\.env") {
    Write-Host "✓ frontend/.env file exists" -ForegroundColor Green
    Get-Content "frontend\.env" | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "✗ frontend/.env file NOT found" -ForegroundColor Red
    Write-Host "  Creating frontend/.env file..." -ForegroundColor Yellow
    "VITE_API_BASE=http://localhost:8000" | Out-File -FilePath "frontend\.env" -Encoding utf8
    Write-Host "  ✓ Created frontend/.env" -ForegroundColor Green
}

Write-Host ""

# Test Backend
Write-Host "Testing Backend Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Backend is responding: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Backend is not responding" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test Frontend
Write-Host "Testing Frontend Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Frontend is responding: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "✗ Frontend is not responding" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Check Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start services:" -ForegroundColor Yellow
Write-Host "  docker-compose up --build" -ForegroundColor White
Write-Host ""


