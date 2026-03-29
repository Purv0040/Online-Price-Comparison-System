import time
import sys
import os

# Set root path to import other modules
root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(root_path)

from main import run_scraper_cycle

def start_scheduler(interval_minutes=30):
    print(f"⏰ Scheduler started. Interval: {interval_minutes} minutes.")
    print("Press Ctrl+C to stop.")
    
    # Run once at startup
    run_scraper_cycle()
    
    interval_seconds = interval_minutes * 60
    while True:
        print(f"\nNext run scheduled in {interval_minutes} minutes...")
        time.sleep(interval_seconds)
        run_scraper_cycle()

if __name__ == "__main__":
    # For testing, shorter interval
    start_scheduler(interval_minutes=5)
