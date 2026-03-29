import random

def scrape_amazon(search_query="iphone"):
    """
    Simulated Amazon Scraper
    In a real scenario, this would use BeautifulSoup or Selenium
    """
    print(f"Scraping Amazon for: {search_query}")
    
    # Mock data for demonstration
    products = [
        {
            "name": f"{search_query} Pro Max 256GB",
            "price": random.randint(120000, 140000),
            "originalPrice": 149900,
            "url": "https://www.amazon.in/dp/example1",
            "rating": 4.5
        },
        {
            "name": f"{search_query} 128GB Blue",
            "price": random.randint(60000, 75000),
            "originalPrice": 79900,
            "url": "https://www.amazon.in/dp/example2",
            "rating": 4.3
        }
    ]
    return products
