# Truesight - Troubleshooting Guide

## Network & Localhost Issues

### Issue: Frontend not accessible on localhost:5173

#### Solution 1: Check if services are running

**Using Docker:**
```bash
docker-compose ps
```

If services are not running, start them:
```bash
docker-compose up --build
```

**Using Manual Setup:**
- Check if frontend is running: Look for "Local: http://localhost:5173" in terminal
- Check if backend is running: Visit http://localhost:8000/health

#### Solution 2: Check port conflicts

**Windows PowerShell:**
```powershell
# Check if port 5173 is in use
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue

# Check if port 8000 is in use
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
```

**Kill process using port (if needed):**
```powershell
# Find process ID
$process = Get-NetTCPConnection -LocalPort 5173 | Select-Object -ExpandProperty OwningProcess
# Kill process
Stop-Process -Id $process -Force
```

#### Solution 3: Rebuild Docker containers

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (optional, clears node_modules cache)
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

#### Solution 4: Check Docker Desktop

- Ensure Docker Desktop is running
- Check Docker Desktop settings → Resources → Ensure enough memory allocated (at least 2GB)
- Restart Docker Desktop if needed

### Issue: Backend API not accessible

#### Check backend health:
```bash
# Using curl (if available)
curl http://localhost:8000/health

# Or visit in browser
http://localhost:8000/health
```

#### Check backend logs:
```bash
docker-compose logs backend
```

#### Fix CORS issues:
- Ensure backend is running before frontend
- Check `VITE_API_BASE` environment variable matches backend URL
- Backend CORS is now configured to allow all origins for development (updated in main.py)

### Issue: Frontend can't connect to backend

#### Check environment variable:
Create `frontend/.env` file:
```
VITE_API_BASE=http://localhost:8000
```

**Important:** After creating/updating `.env`, restart the frontend:
```bash
# Docker
docker-compose restart frontend

# Manual
# Stop frontend (Ctrl+C) and restart with npm run dev
```

### Issue: Dependencies not installed

#### Using Docker:
Dependencies should install automatically during build. If not:

```bash
# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up frontend
```

#### Manual Setup:
```bash
cd frontend
npm install
```

### Issue: Build errors

#### Clear cache and reinstall:
```bash
cd frontend

# Remove node_modules and lock file
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Reinstall
npm install
```

#### Check Node.js version:
```bash
node --version  # Should be 18+
npm --version
```

### Issue: Tailwind CSS not working

#### Verify Tailwind is installed:
```bash
cd frontend
npm list tailwindcss
```

#### Rebuild if needed:
```bash
npm install tailwindcss postcss autoprefixer
```

### Issue: Page shows blank/white screen

1. **Check browser console** (F12) for errors
2. **Check terminal** for build errors
3. **Verify all dependencies installed:**
   ```bash
   cd frontend
   npm install
   ```
4. **Clear browser cache** and hard refresh (Ctrl+Shift+R)

### Issue: Matrix background not animating

- Check browser console for JavaScript errors
- Ensure Framer Motion is installed: `npm list framer-motion`
- Verify MatrixBackground component is imported in App.jsx

### Quick Fix Commands

**Complete reset (Docker):**
```bash
docker-compose down -v
docker-compose up --build
```

**Complete reset (Manual):**
```bash
# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
npm run dev

# Backend (in another terminal)
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Network Configuration

**For Docker:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

**For Manual Setup:**
- Same URLs as above
- Ensure both services are running simultaneously

### Still Having Issues?

1. **Check logs:**
   ```bash
   docker-compose logs frontend
   docker-compose logs backend
   ```

2. **Verify file structure:**
   - `frontend/src/components/` should contain all component files
   - `frontend/tailwind.config.js` should exist
   - `frontend/postcss.config.js` should exist

3. **Test individual components:**
   - Visit http://localhost:8000/health (backend test)
   - Check if frontend builds: `cd frontend && npm run build`

4. **Common Windows Issues:**
   - PowerShell execution policy: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
   - Long path issues: Enable long paths in Windows settings
   - Antivirus blocking: Add project folder to exclusions


