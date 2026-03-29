import sys
import os

# Add parent directory to path to reach modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scraper.amazon_scraper import scrape_amazon
from scraper.flipkart_scraper import scrape_flipkart
from cleaning.price_cleaner import clean_data
from analytics.price_analysis import analyze_prices
from send_to_backend import update_backend
from alerts.price_alert import process_alerts

def run_scraper_cycle(search_term="iphone"):
    print(f"\n--- Starting Scraper Cycle for: {search_term} ---")
    
    # 1. Scrape
    amazon_raw = scrape_amazon(search_term)
    flipkart_raw = scrape_flipkart(search_term)
    
    all_raw = amazon_raw + flipkart_raw
    print(f"Total raw results fetched: {len(all_raw)}")
    
    # 2. Clean
    cleaned = clean_data(all_raw)
    print(f"Cleaned products: {len(cleaned)}")
    
    # 3. Analyze
    analyzed = analyze_prices(cleaned)
    print(f"Analysis complete for all {len(analyzed)} products.")
    
    # 4. Integrate into Backend
    # Group by source for easier processing by source name
    amazon_batch = [p for p in analyzed if 'amazon.in' in p.get('url', '').lower()]
    flipkart_batch = [p for p in analyzed if 'flipkart.com' in p.get('url', '').lower()]
    
    print("\nAttempting to update backend...")
    if amazon_batch:
        res = update_backend('amazon', amazon_batch)
        if res and isinstance(res, dict):
            process_alerts(res.get('data', []))

    if flipkart_batch:
        res = update_backend('flipkart', flipkart_batch)
        if res and isinstance(res, dict):
            process_alerts(res.get('data', []))
        
    print("--- End of Scraper Cycle ---")

if __name__ == "__main__":
    run_scraper_cycle()
