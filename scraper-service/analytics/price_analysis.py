def analyze_prices(products):
    """
    Performs basic descriptive statistics or comparisons.
    For now, it just calculates savings and labels price drops.
    """
    for product in products:
        price = product.get('price', 0)
        original_price = product.get('originalPrice', price)
        
        if original_price > price:
            savings = original_price - price
            savings_pct = round((savings / original_price) * 100, 2)
            product['savings'] = savings
            product['savingsPct'] = savings_pct
            product['priceDrop'] = True
        else:
            product['savings'] = 0
            product['savingsPct'] = 0
            product['priceDrop'] = False
            
    return products
