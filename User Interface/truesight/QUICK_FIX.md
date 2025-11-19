# Quick Fix for Network Issues

## Step-by-Step Fix

### 1. Stop Everything First
```powershell
# If using Docker
docker-compose down

# If running manually, stop all terminals (Ctrl+C)
```

### 2. Check Port Availability
```powershell
# Check port 5173
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue

# Check port 8000  
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
```

If ports are in use, kill the processes or use different ports.

### 3. Create Environment File
Create `frontend/.env` file with this content:
```
VITE_API_BASE=http://localhost:8000
```

### 4. Rebuild and Start (Docker)
```powershell
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### 5. Or Start Manually

**Terminal 1 - Backend:**
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

### 6. Verify Services

- Backend: http://localhost:8000/health (should return JSON)
- Frontend: http://localhost:5173 (should show Truesight UI)

### 7. If Still Not Working

**Check Docker Desktop:**
- Is Docker Desktop running?
- Are containers running? (`docker ps`)

**Check Dependencies:**
```powershell
cd frontend
npm install
```

**Check Logs:**
```powershell
docker-compose logs frontend
docker-compose logs backend
```


