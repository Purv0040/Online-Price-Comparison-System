import requests
import json

def update_backend(source_name, products):
    """
    Sends cleaned + analyzed data to the Node.js backend
    """
    backend_url = "http://localhost:5000/api/scraper/update"
    
    payload = {
        "source": source_name,
        "products": products
    }
    
    try:
        response = requests.post(
            backend_url,
            json=payload,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ [SUCCESS] Backend updated for {source_name}")
            print(f"Message: {result.get('message')}")
            return result
        else:
            print(f"❌ [ERROR] Backend update failed with status: {response.status_code}")
            try:
                print(f"Response: {response.text}")
            except:
                pass
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ [CRITICAL] Connection refused! Is the backend server running?")
        return False
    except Exception as e:
        print(f"❌ [CRITICAL] An unexpected error occurred: {e}")
        return False
