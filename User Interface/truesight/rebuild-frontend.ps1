# Quick rebuild script for frontend
Write-Host "=== Rebuilding Frontend Container ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Stopping containers..." -ForegroundColor Yellow
docker-compose stop frontend

Write-Host "Removing old frontend container..." -ForegroundColor Yellow
docker-compose rm -f frontend

Write-Host "Removing old node_modules volume..." -ForegroundColor Yellow
docker volume rm truesight_frontend_node_modules -ErrorAction SilentlyContinue

Write-Host "Rebuilding frontend..." -ForegroundColor Yellow
docker-compose build --no-cache frontend

Write-Host ""
Write-Host "Starting frontend..." -ForegroundColor Yellow
docker-compose up -d frontend

Write-Host ""
Write-Host "=== Rebuild Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "View logs with: docker-compose logs -f frontend" -ForegroundColor Cyan
Write-Host ""


