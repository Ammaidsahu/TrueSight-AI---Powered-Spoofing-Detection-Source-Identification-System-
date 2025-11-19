import random

def analyze_audio(audio_data: bytes, filename: str) -> dict:
    """
    Stub function for audio analysis.
    Returns mock scores for liveness, spoofing detection, etc.
    """
    # Generate realistic-looking stub scores
    liveness_score = round(random.uniform(0.7, 0.95), 3)
    spoofing_score = round(random.uniform(0.05, 0.3), 3)
    quality_score = round(random.uniform(0.8, 0.98), 3)
    
    verdict = "authentic" if spoofing_score < 0.3 else "spoofed"
    
    return {
        "filename": filename,
        "scores": {
            "liveness": liveness_score,
            "spoofing_risk": spoofing_score,
            "quality": quality_score
        },
        "verdict": verdict
    }

def analyze_video(video_data: bytes, filename: str) -> dict:
    """
    Stub function for video analysis.
    Returns mock scores for liveness, lip sync, spoofing detection, etc.
    """
    # Generate realistic-looking stub scores
    liveness_score = round(random.uniform(0.75, 0.95), 3)
    lipsync_score = round(random.uniform(0.8, 0.98), 3)
    spoofing_score = round(random.uniform(0.05, 0.25), 3)
    face_quality = round(random.uniform(0.85, 0.98), 3)
    
    verdict = "authentic" if spoofing_score < 0.3 else "spoofed"
    
    return {
        "filename": filename,
        "scores": {
            "liveness": liveness_score,
            "lipsync": lipsync_score,
            "spoofing_risk": spoofing_score,
            "face_quality": face_quality
        },
        "verdict": verdict
    }

