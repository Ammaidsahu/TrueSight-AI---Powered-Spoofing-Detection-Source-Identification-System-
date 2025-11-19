from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.models_stub import analyze_audio, analyze_video
from app.source_id import identify_source
from app.blockchain_log import get_logs, add_log_entry

router = APIRouter()

@router.get("/health")
async def health():
    return {"status": "healthy", "service": "TrueSight API"}

@router.post("/analyze/audio")
async def analyze_audio_endpoint(file: UploadFile = File(...)):
    try:
        # Read file content
        contents = await file.read()
        
        # Stub analysis
        result = analyze_audio(contents, file.filename)
        
        # Log the analysis
        add_log_entry({
            "type": "audio_analysis",
            "filename": file.filename,
            "result": result
        })
        
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze/video")
async def analyze_video_endpoint(file: UploadFile = File(...)):
    try:
        # Read file content
        contents = await file.read()
        
        # Stub analysis
        result = analyze_video(contents, file.filename)
        
        # Log the analysis
        add_log_entry({
            "type": "video_analysis",
            "filename": file.filename,
            "result": result
        })
        
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/source-identification")
async def source_identification_endpoint(file: UploadFile = File(...)):
    try:
        # Save file temporarily for ffprobe
        import tempfile
        import os
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp_file:
            contents = await file.read()
            tmp_file.write(contents)
            tmp_file_path = tmp_file.name
        
        try:
            # Analyze source
            result = identify_source(tmp_file_path, file.filename)
            
            # Log the analysis
            add_log_entry({
                "type": "source_identification",
                "filename": file.filename,
                "result": result
            })
            
            return JSONResponse(content=result)
        finally:
            # Clean up temp file
            if os.path.exists(tmp_file_path):
                os.unlink(tmp_file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logs")
async def get_logs_endpoint():
    try:
        logs = get_logs()
        return JSONResponse(content={"logs": logs})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

