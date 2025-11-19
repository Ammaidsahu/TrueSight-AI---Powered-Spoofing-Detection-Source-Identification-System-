import subprocess
import json
import os
import random
import hashlib

def get_ffprobe_metadata(file_path: str) -> dict:
    """
    Extract codec and metadata information using ffprobe.
    """
    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            file_path
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return json.loads(result.stdout)
    except (subprocess.CalledProcessError, FileNotFoundError, json.JSONDecodeError) as e:
        # Fallback if ffprobe is not available
        return {
            "error": "ffprobe not available",
            "message": str(e),
            "format": {},
            "streams": []
        }

def identify_source(file_path: str, filename: str) -> dict:
    """
    Identify source of media file using metadata and stub analysis.
    """
    # Get metadata using ffprobe
    metadata = get_ffprobe_metadata(file_path)
    
    # Extract codec information
    codec_info = {}
    if metadata.get("streams"):
        for stream in metadata["streams"]:
            codec_type = stream.get("codec_type", "unknown")
            codec_info[codec_type] = {
                "codec_name": stream.get("codec_name", "unknown"),
                "codec_long_name": stream.get("codec_long_name", "unknown"),
                "bit_rate": stream.get("bit_rate", "unknown"),
                "duration": stream.get("duration", "unknown")
            }
    
    # Stub scores (these would be calculated by actual ML models)
    exif_score = round(random.uniform(0.6, 0.95), 3)
    artifact_score = round(random.uniform(0.7, 0.98), 3)
    fingerprint_score = round(random.uniform(0.65, 0.92), 3)
    device_match = round(random.uniform(0.5, 0.9), 3)
    
    # Calculate final score (weighted average)
    final_score = round(
        (exif_score * 0.2 + artifact_score * 0.3 + 
         fingerprint_score * 0.3 + device_match * 0.2), 3
    )
    
    verdict = "authentic" if final_score > 0.7 else "spoofed"
    
    return {
        "filename": filename,
        "metadata": {
            "format": metadata.get("format", {}),
            "codecs": codec_info,
            "streams_count": len(metadata.get("streams", []))
        },
        "exif_score": exif_score,
        "artifact_score": artifact_score,
        "fingerprint_score": fingerprint_score,
        "device_match": device_match,
        "final_score": final_score,
        "verdict": verdict
    }

