# TrueSight - Quick Start Guide

## Method 1: Using Docker (Recommended) 🐳

### Prerequisites
- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

### Steps

1. **Open terminal in the project root directory** (`d:\truesight`)

2. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:5173 (or http://YOUR_IP:5173 for network access)
   - **Backend API**: http://localhost:8000 (or http://YOUR_IP:8000 for network access)
   - **API Docs**: http://localhost:8000/docs
   
   **Note:** Services are configured to accept connections from any network interface (0.0.0.0), so you can access them from other devices on your network using your machine's IP address.

4. **Stop the application:**
   - Press `Ctrl+C` in the terminal, or
   - Run: `docker-compose down`

---

## Method 2: Manual Setup (Development) 💻

### Prerequisites
- Python 3.11+ installed
- Node.js 18+ and npm installed
- ffmpeg installed (for source identification)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **Linux/Mac:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   Backend will run on: http://localhost:8000 (accessible from network too)

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on: http://localhost:5173 (accessible from network too)
   
   **Note:** The frontend is configured to listen on 0.0.0.0, so it's accessible from other devices on your network using your machine's IP address.

---

## Testing the Application

1. **Check backend health:**
   - Visit: http://localhost:8000/health
   - Should return: `{"status": "healthy", "service": "TrueSight API"}`

2. **Check API documentation:**
   - Visit: http://localhost:8000/docs
   - Interactive Swagger UI for testing endpoints

3. **Use the frontend:**
   - Visit: http://localhost:5173
   - Navigate through the pages:
     - **Live Detection**: Test webcam detection
     - **Upload Media**: Upload audio/video files
     - **Source Identification**: Analyze file metadata
     - **Logs**: View blockchain-style logs

---

## Troubleshooting

### Docker Issues
- **Port already in use**: Stop other services using ports 5173 or 8000
- **Build fails**: Make sure Docker Desktop is running
- **Permission errors**: Run Docker with appropriate permissions

### Manual Setup Issues
- **Python not found**: Add Python to PATH or use `python3` instead
- **npm not found**: Install Node.js from nodejs.org
- **ffprobe not found**: Install ffmpeg (required for source identification)
  - Windows: Download from https://ffmpeg.org/download.html
  - Mac: `brew install ffmpeg`
  - Linux: `sudo apt-get install ffmpeg`

### CORS Errors
- Make sure backend is running before frontend
- Check that `VITE_API_BASE` environment variable matches backend URL
- Backend CORS is configured to allow all origins for development

### Network Access Issues
- **Backend not accessible from network**: Make sure you're using `--host 0.0.0.0` when starting manually
- **Frontend not accessible from network**: The vite.config.js is already configured with `host: '0.0.0.0'`
- **Find your IP address** (Windows):
  ```powershell
  ipconfig | findstr IPv4
  ```
  Then access via: `http://YOUR_IP:5173` and `http://YOUR_IP:8000`

---

## Environment Variables

### Frontend
Create `frontend/.env` file (if it doesn't exist):
```
VITE_API_BASE=http://localhost:8000
```

**Note:** After creating/updating `.env`, restart the frontend service.

### Backend
No environment variables required for basic setup.

---

## Project Structure

```
truesight/
├── frontend/          # React + Vite (port 5173)
├── backend/           # FastAPI (port 8000)
├── docker-compose.yml  # Docker orchestration
└── README.md          # Full documentation
```

---

## Next Steps

- Replace stub functions in `backend/app/models_stub.py` with actual ML models
- Implement training scripts in `backend/ml_training/`
- Customize the UI in `frontend/src/pages/`
- Add authentication/authorization if needed

