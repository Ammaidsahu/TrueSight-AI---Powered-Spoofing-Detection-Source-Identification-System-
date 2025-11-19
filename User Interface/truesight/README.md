# TrueSight – Anti-Spoofing & Source Identification System

A full-stack application for detecting spoofed media and identifying source information using blockchain-style logging.

## Features

- **Live Detection**: Real-time webcam-based spoofing detection
- **Media Analysis**: Upload and analyze audio/video files for authenticity
- **Source Identification**: Extract metadata and identify media source
- **Blockchain Logs**: Immutable log system for all analysis operations

## Project Structure

```
truesight/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/    # Home, LiveDetect, UploadAnalyze, SourceIdentification, Logs
│   │   └── ...
│   └── Dockerfile
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── main.py   # FastAPI app
│   │   ├── api.py    # API endpoints
│   │   ├── models_stub.py  # Stub analysis functions
│   │   ├── source_id.py    # Source identification
│   │   └── blockchain_log.py  # Blockchain logging
│   ├── ml_training/  # ML training structure
│   └── Dockerfile
└── docker-compose.yml
```

## Quick Start

### Using Docker (Recommended)

```bash
docker-compose up --build
```

Frontend will be available at: http://localhost:5173
Backend API will be available at: http://localhost:8000

### Manual Setup

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `POST /analyze/audio` - Analyze audio file
- `POST /analyze/video` - Analyze video file
- `POST /source-identification` - Identify media source
- `GET /logs` - Get blockchain logs

## Notes

- The system uses stub scores for immediate functionality
- Blockchain logs are saved in `backend/truesight_log.json`
- ML training folder contains placeholder structure for future implementation
- ffprobe is used for codec metadata extraction (requires ffmpeg)

## Development

The project uses stub implementations for immediate functionality. Replace stub functions in:
- `backend/app/models_stub.py` - Analysis logic
- `backend/app/source_id.py` - Source identification
- `backend/ml_training/` - ML model training

