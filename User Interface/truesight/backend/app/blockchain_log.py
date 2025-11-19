import json
import hashlib
import os
from datetime import datetime
from typing import List, Dict, Any

LOG_FILE = "truesight_log.json"

def get_log_file_path() -> str:
    """Get the path to the log file."""
    # Store in backend directory
    backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(backend_dir, LOG_FILE)

def calculate_hash(data: str) -> str:
    """Calculate SHA-256 hash of data."""
    return hashlib.sha256(data.encode()).hexdigest()

def load_logs() -> List[Dict[str, Any]]:
    """Load logs from file."""
    log_file = get_log_file_path()
    if os.path.exists(log_file):
        try:
            with open(log_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []

def save_logs(logs: List[Dict[str, Any]]) -> None:
    """Save logs to file."""
    log_file = get_log_file_path()
    with open(log_file, 'w') as f:
        json.dump(logs, f, indent=2)

def add_log_entry(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Add a new log entry to the blockchain-style log.
    Each entry contains:
    - timestamp
    - data
    - hash (hash of timestamp + data + previous_hash)
    - previous_hash (hash of previous entry)
    """
    logs = load_logs()
    
    # Get previous hash
    previous_hash = logs[-1]["hash"] if logs else "0" * 64
    
    # Create entry
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    # Calculate hash
    hash_data = f"{timestamp}{json.dumps(data, sort_keys=True)}{previous_hash}"
    entry_hash = calculate_hash(hash_data)
    
    entry = {
        "timestamp": timestamp,
        "data": data,
        "hash": entry_hash,
        "previous_hash": previous_hash
    }
    
    logs.append(entry)
    save_logs(logs)
    
    return entry

def get_logs() -> List[Dict[str, Any]]:
    """Get all logs."""
    return load_logs()

def verify_logs() -> bool:
    """Verify the integrity of the blockchain log."""
    logs = load_logs()
    
    if not logs:
        return True
    
    # Verify genesis block
    if logs[0]["previous_hash"] != "0" * 64:
        return False
    
    # Verify each subsequent block
    for i in range(1, len(logs)):
        prev_entry = logs[i - 1]
        current_entry = logs[i]
        
        # Verify previous_hash matches
        if current_entry["previous_hash"] != prev_entry["hash"]:
            return False
        
        # Verify hash
        hash_data = f"{current_entry['timestamp']}{json.dumps(current_entry['data'], sort_keys=True)}{current_entry['previous_hash']}"
        expected_hash = calculate_hash(hash_data)
        
        if current_entry["hash"] != expected_hash:
            return False
    
    return True

