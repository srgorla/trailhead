import os
import json
from datetime import datetime
import subprocess
import requests
import time
import random
import threading
import sys

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

def upload_file_with_curl_progress(instance_url, access_token, file_path, timeout_minutes=120):
    """
    Use curl subprocess for upload with real-time progress displayed in terminal.
    Progress is shown directly without being captured.
    """
    
    file_name = os.path.basename(file_path)
    file_size = os.path.getsize(file_path)
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting upload")
    print(f"File: {file_name}")
    print(f"Size: {file_size / (1024**2):.2f} MB ({file_size:,} bytes)")
    print(f"Timeout: {timeout_minutes} minutes")
    print(f"Method: Single multipart upload via curl (with progress)")
    print("=" * 70)
    print()
    
    try:
        # Create a temporary file for the response
        import tempfile
        response_file = tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix='.json')
        response_file_path = response_file.name
        response_file.close()
        
        url = f"{instance_url}/services/data/v59.0/sobjects/ContentVersion"
        
        metadata_json = json.dumps({
            'Title': file_name,
            'PathOnClient': file_name
        })
        
        # Build curl command - output response to file, progress to stderr (terminal)
        curl_cmd = [
            'curl',
            '-X', 'POST',
            url,
            '-H', f'Authorization: Bearer {access_token}',
            '-H', 'Content-Type: multipart/form-data',
            '-F', f'entity_content={metadata_json};type=application/json',
            '-F', f'VersionData=@{file_path}',
            '--max-time', str(timeout_minutes * 60),
            '-w', '\n%{http_code}',
            '--progress-bar',  # Show progress bar on stderr
            '-o', response_file_path  # Output response to file instead of stdout
        ]
        
        print("Uploading file...\n")
        start_time = time.time()
        
        # Run curl without capturing stderr so progress bar shows in terminal
        result = subprocess.run(
            curl_cmd,
            stderr=sys.stderr,  # Let stderr (progress) go directly to terminal
            stdout=subprocess.PIPE,
            text=True,
            check=False
        )
        
        elapsed = time.time() - start_time
        
        # Read response from file
        with open(response_file_path, 'r') as f:
            output = f.read()
        
        # Clean up temp file
        os.unlink(response_file_path)
        
        # Parse response
        lines = output.strip().split('\n')
        http_code = lines[-1] if lines else '000'
        response_body = '\n'.join(lines[:-1]) if len(lines) > 1 else ''
        
        print()
        print("=" * 70)
        print(f"Upload completed in {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
        print(f"HTTP Status: {http_code}")
        
        if http_code == '201':
            try:
                response_data = json.loads(response_body)
                content_version_id = response_data.get('id')
                
                print(f"✓ Upload successful!")
                print(f"ContentVersion ID: {content_version_id}")
                print(f"Average speed: {(file_size / (1024**2)) / elapsed:.2f} MB/s")
                
                # Verify
                print("\nVerifying upload...")
                verify_cmd = [
                    'curl',
                    '-X', 'GET',
                    f"{instance_url}/services/data/v59.0/sobjects/ContentVersion/{content_version_id}",
                    '-H', f'Authorization: Bearer {access_token}',
                    '-H', 'Content-Type: application/json',
                    '-s'
                ]
                
                verify_result = subprocess.run(verify_cmd, capture_output=True, text=True)
                
                if verify_result.returncode == 0:
                    verify_data = json.loads(verify_result.stdout)
                    uploaded_size = verify_data.get('ContentSize', 0)
                    print(f"✓ Salesforce file size: {uploaded_size / (1024**2):.2f} MB ({uploaded_size:,} bytes)")
                    
                    if uploaded_size == file_size:
                        print("✓ Size matches perfectly!")
                    else:
                        print(f"⚠ Size mismatch: Local={file_size:,}, Uploaded={uploaded_size:,}")
                
                return content_version_id
                
            except json.JSONDecodeError:
                print(f"Response: {response_body}")
                return None
        else:
            print(f"✗ Upload failed")
            print(f"Response: {response_body}")
            return None
            
    except Exception as e:
        print(f"\n✗ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

class ProgressMonitor:
    """Monitor upload progress in a separate thread"""
    def __init__(self, file_path):
        self.file_path = file_path
        self.file_size = os.path.getsize(file_path)
        self.start_time = time.time()
        self.stop_flag = threading.Event()
        
    def monitor_progress(self):
        """Run in separate thread to show heartbeat"""
        while not self.stop_flag.is_set():
            try:
                elapsed = time.time() - self.start_time
                # Show elapsed time and estimated progress
                print(f"  Upload in progress... Elapsed: {elapsed:.0f}s ({elapsed/60:.1f} min)")
                time.sleep(5)  # Update every 5 seconds
                
            except Exception:
                break
    
    def start(self):
        """Start monitoring thread"""
        self.thread = threading.Thread(target=self.monitor_progress, daemon=True)
        self.thread.start()
    
    def stop(self):
        """Stop monitoring thread"""
        self.stop_flag.set()
        if hasattr(self, 'thread'):
            self.thread.join(timeout=1)

def upload_file_requests_with_heartbeat(access_token, instance_url, file_path, timeout_minutes=120):
    """
    Upload using requests library with heartbeat monitoring.
    Maximum speed, shows time elapsed.
    """
    
    file_name = os.path.basename(file_path)
    file_size = os.path.getsize(file_path)
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting upload")
    print(f"File: {file_name}")
    print(f"Size: {file_size / (1024**2):.2f} MB ({file_size:,} bytes)")
    print(f"Timeout: {timeout_minutes} minutes")
    print(f"Method: Single multipart upload (optimized for speed)")
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
    
    try:
        print("Uploading file (progress updates every 5 seconds)...\n")
        
        # Start progress monitor
        monitor = ProgressMonitor(file_path)
        monitor.start()
        
        start_time = time.time()
        
        with open(file_path, 'rb') as f:
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
        
        # Stop monitor
        monitor.stop()
        
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
        monitor.stop()
        print(f"\n✗ Upload timed out after {timeout_minutes} minutes")
        return None
    except requests.exceptions.ConnectionError as e:
        monitor.stop()
        print(f"\n✗ Connection error: {e}")
        return None
    except Exception as e:
        monitor.stop()
        print(f"\n✗ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    # Configuration
    FILE_PATH = "/Users/sreekanthgorla/Projects/SGDemos/scripts/test_file.tsv"
    FILE_SIZE_MB = 1000
    TIMEOUT_MINUTES = 120
    USE_CURL = True  # Set to False to use requests library
    
    print("=" * 70)
    print("SALESFORCE FILE UPLOADER (OPTIMIZED FOR SPEED)")
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
        print(f"Size: {file_size / (1024**2):.2f} MB\n")
        
        user_input = input("Use this file? (y/n): ")
        if user_input.lower() != 'y':
            print("Generating new file...\n")
            os.remove(FILE_PATH)
            generate_file(FILE_PATH, size_mb=FILE_SIZE_MB)
    
    # Upload
    if USE_CURL:
        print("Using curl (with progress bar displayed in terminal)\n")
        result = upload_file_with_curl_progress(INSTANCE_URL, ACCESS_TOKEN, FILE_PATH, TIMEOUT_MINUTES)
    else:
        print("Using requests library (heartbeat every 5 seconds, maximum speed)\n")
        result = upload_file_requests_with_heartbeat(ACCESS_TOKEN, INSTANCE_URL, FILE_PATH, TIMEOUT_MINUTES)
    
    if result:
        print(f"\n{'='*70}")
        print("✓ SUCCESS!")
        print(f"{'='*70}")
        print(f"View in Salesforce:")
        print(f"{INSTANCE_URL}/lightning/r/ContentVersion/{result}/view")
        print(f"{'='*70}")