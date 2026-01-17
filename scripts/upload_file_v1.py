import os
import json
from datetime import datetime
import subprocess
import requests
import time
import random

def get_sf_credentials():
    """Get access token and instance URL from Salesforce CLI"""
    print("Getting credentials from Salesforce CLI...")
    
    try:
        result = subprocess.run(
            ['sf', 'org', 'display', '--json'],
            capture_output=True,
            text=True,
            check=True
        )
        
        data = json.loads(result.stdout)
        
        if data.get('status') == 0 and 'result' in data:
            access_token = data['result'].get('accessToken')
            instance_url = data['result'].get('instanceUrl')
            username = data['result'].get('username')
            
            if access_token and instance_url:
                print(f"✓ Authenticated as: {username}")
                print(f"✓ Instance: {instance_url}\n")
                return access_token, instance_url
        
        return None, None
            
    except Exception as e:
        print(f"✗ Error: {e}")
        return None, None

def generate_file(filename, size_mb):
    """Generate test file of specified size"""
    target_size = size_mb * 1024 * 1024
    current_size = 0
    row_count = 0
    
    print(f"Generating {size_mb}MB test file: {filename}")
    
    with open(filename, 'w', buffering=8192*1024) as f:
        header = "ID\tName\tEmail\tAge\tCity\tCountry\tDate\tScore\tStatus\tDescription\n"
        f.write(header)
        current_size += len(header)
        
        cities = ['NYC', 'LA', 'Chicago', 'Houston', 'Phoenix']
        countries = ['USA', 'Canada', 'UK', 'Germany']
        statuses = ['Active', 'Inactive', 'Pending']
        
        while current_size < target_size:
            row_count += 1
            row = f"{row_count}\tUser{row_count}\tuser{row_count}@test.com\t{random.randint(18,80)}\t{cities[row_count%5]}\t{countries[row_count%4]}\t2024-01-{(row_count%28)+1:02d}\t{random.randint(0,100)}\t{statuses[row_count%3]}\tDescription text data here for row {row_count}\n"
            f.write(row)
            current_size += len(row)
            
            if row_count % 500000 == 0:
                print(f"  Progress: {current_size / (1024**2):.2f} MB ({row_count:,} rows)")
    
    actual_size = os.path.getsize(filename)
    print(f"✓ Generated {actual_size / (1024**2):.2f} MB with {row_count:,} rows\n")
    return row_count

class FileWithProgress:
    """Wrapper for file object to track upload progress"""
    def __init__(self, file_path, callback=None):
        self.file = open(file_path, 'rb')
        self.total_size = os.path.getsize(file_path)
        self.bytes_read = 0
        self.callback = callback
        self.start_time = time.time()
        
    def read(self, size=-1):
        data = self.file.read(size)
        self.bytes_read += len(data)
        
        if self.callback:
            elapsed = time.time() - self.start_time
            self.callback(self.bytes_read, self.total_size, elapsed)
        
        return data
    
    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        self.file.close()

def upload_file(access_token, instance_url, file_path, timeout_minutes=60):
    """
    Upload file to Salesforce ContentVersion.
    
    NOTE: This uses a SINGLE multipart upload, NOT chunked upload.
    Salesforce's ContentVersion REST API does NOT support true chunked appending.
    
    For files up to ~2GB, this single upload method is the correct approach.
    For larger files or true chunking, use Salesforce Bulk API 2.0 instead.
    """
    
    file_name = os.path.basename(file_path)
    file_size = os.path.getsize(file_path)
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting upload")
    print(f"File: {file_name}")
    print(f"Size: {file_size / (1024**2):.2f} MB ({file_size:,} bytes)")
    print(f"Timeout: {timeout_minutes} minutes")
    print(f"Method: Single multipart upload (NOT chunked)")
    print("=" * 70)
    print()
    
    url = f"{instance_url}/services/data/v59.0/sobjects/ContentVersion"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    metadata = {
        'Title': file_name,
        'PathOnClient': file_name
    }
    
    last_print_time = [time.time()]
    last_bytes = [0]
    
    def progress_callback(bytes_read, total_size, elapsed):
        # Print progress every 2 seconds (reduced from 5 for better visibility)
        if time.time() - last_print_time[0] > 2:
            progress = (bytes_read / total_size) * 100
            speed = (bytes_read / (1024**2)) / elapsed if elapsed > 0 else 0
            
            # Calculate instantaneous speed
            bytes_since_last = bytes_read - last_bytes[0]
            time_since_last = time.time() - last_print_time[0]
            instant_speed = (bytes_since_last / (1024**2)) / time_since_last if time_since_last > 0 else 0
            
            eta = ((total_size - bytes_read) / (bytes_read / elapsed)) if bytes_read > 0 and elapsed > 0 else 0
            
            print(f"  Progress: {progress:.1f}% | "
                  f"Uploaded: {bytes_read / (1024**2):.1f}/{total_size / (1024**2):.1f} MB | "
                  f"Speed: {instant_speed:.2f} MB/s (avg: {speed:.2f}) | "
                  f"Elapsed: {elapsed:.0f}s | "
                  f"ETA: {eta:.0f}s")
            
            last_print_time[0] = time.time()
            last_bytes[0] = bytes_read
    
    try:
        print("Uploading file...")
        print("(Progress updates every 2 seconds)\n")
        
        start_time = time.time()
        
        with FileWithProgress(file_path, progress_callback) as f:
            files = {
                'entity_content': (None, json.dumps(metadata), 'application/json'),
                'VersionData': (file_name, f, 'application/octet-stream')
            }
            
            response = requests.post(
                url,
                headers=headers,
                files=files,
                timeout=timeout_minutes * 60
            )
        
        elapsed = time.time() - start_time
        
        print()
        print("=" * 70)
        print(f"Upload completed in {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
        
        if response.status_code == 201:
            result = response.json()
            print(f"✓ Upload successful!")
            print(f"ContentVersion ID: {result['id']}")
            print(f"Average speed: {(file_size / (1024**2)) / elapsed:.2f} MB/s")
            
            # Verify
            print("\nVerifying upload...")
            verify_url = f"{instance_url}/services/data/v59.0/sobjects/ContentVersion/{result['id']}"
            verify_response = requests.get(verify_url, headers=headers)
            
            if verify_response.status_code == 200:
                cv_data = verify_response.json()
                uploaded_size = cv_data.get('ContentSize', 0)
                print(f"✓ Salesforce file size: {uploaded_size / (1024**2):.2f} MB ({uploaded_size:,} bytes)")
                
                if uploaded_size == file_size:
                    print("✓ Size matches perfectly!")
                else:
                    print(f"⚠ Size mismatch: Local={file_size:,}, Uploaded={uploaded_size:,}")
            
            return result['id']
        else:
            print(f"✗ Upload failed: {response.status_code}")
            print(f"Error: {response.text}")
            return None
            
    except requests.exceptions.Timeout:
        print(f"\n✗ Upload timed out after {timeout_minutes} minutes")
        print("Try increasing the timeout or using a smaller file.")
        return None
    except requests.exceptions.ConnectionError as e:
        print(f"\n✗ Connection error: {e}")
        return None
    except Exception as e:
        print(f"\n✗ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    # Configuration
    FILE_PATH = "/Users/sreekanthgorla/Projects/SGDemos/scripts/test_file.tsv"
    FILE_SIZE_MB = 1000  # Change this: 100, 500, 1000, or 2000 (2GB)
    TIMEOUT_MINUTES = 120  # 2 hours for large files
    
    print("=" * 70)
    print("SALESFORCE FILE UPLOADER")
    print("=" * 70)
    print()
    print("IMPORTANT NOTES:")
    print("- This script uploads files in a SINGLE request (not chunked)")
    print("- Salesforce ContentVersion API does NOT support chunk appending")
    print("- Maximum tested size: 2GB")
    print("- For true chunking, use Salesforce Bulk API 2.0")
    print("=" * 70)
    print()
    
    # Get credentials
    ACCESS_TOKEN, INSTANCE_URL = get_sf_credentials()
    
    if not ACCESS_TOKEN or not INSTANCE_URL:
        print("\n✗ Failed to get credentials. Exiting.")
        exit(1)
    
    # Generate or use existing file
    if not os.path.exists(FILE_PATH):
        print(f"File not found. Generating {FILE_SIZE_MB}MB file...\n")
        generate_file(FILE_PATH, size_mb=FILE_SIZE_MB)
    else:
        file_size = os.path.getsize(FILE_PATH)
        print(f"Using existing file: {FILE_PATH}")
        print(f"Size: {file_size / (1024**2):.2f} MB ({file_size:,} bytes)\n")
        
        # Ask user to confirm
        user_input = input("Use this file? (y/n): ")
        if user_input.lower() != 'y':
            print("Generating new file...\n")
            os.remove(FILE_PATH)
            generate_file(FILE_PATH, size_mb=FILE_SIZE_MB)
    
    # Upload
    result = upload_file(
        ACCESS_TOKEN, 
        INSTANCE_URL, 
        FILE_PATH,
        timeout_minutes=TIMEOUT_MINUTES
    )
    
    if result:
        print(f"\n{'='*70}")
        print("✓ SUCCESS!")
        print(f"{'='*70}")
        print(f"ContentVersion ID: {result}")
        print(f"View in Salesforce:")
        print(f"{INSTANCE_URL}/lightning/r/ContentVersion/{result}/view")
        print(f"{'='*70}")
    else:
        print(f"\n{'='*70}")
        print("✗ UPLOAD FAILED")
        print(f"{'='*70}")