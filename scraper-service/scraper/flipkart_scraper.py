import random

def scrape_flipkart(search_query="iphone"):
    """
    Simulated Flipkart Scraper
    """
    print(f"Scraping Flipkart for: {search_query}")
    
    # Mock data for demonstration
    products = [
        {
            "name": f"{search_query} Pro Max 256GB Platinum",
            "price": random.randint(115000, 135000),
            "originalPrice": 149900,
            "url": "https://www.flipkart.com/example1",
            "rating": 4.6
        },
        {
            "name": f"{search_query} 128GB Black",
            "price": random.randint(58000, 72000),
            "originalPrice": 79900,
            "url": "https://www.flipkart.com/example2",
            "rating": 4.4
        }
    ]
    return products
