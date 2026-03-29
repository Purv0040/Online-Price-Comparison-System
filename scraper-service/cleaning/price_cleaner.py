def clean_data(products):
    """
    Cleans raw price data
    E.g., removing symbols like '₹', converting strings to floats, etc.
    """
    cleaned_products = []
    for product in products:
        try:
            # Basic validation
            if not product.get('name') or not product.get('price'):
                continue
            
            # Ensure price is integer (or float)
            price = product.get('price')
            if isinstance(price, str):
                price = ''.join(filter(str.isdigit, price))
                price = int(price) if price else 0
            
            # Additional logic can be added here
            product['price'] = price
            cleaned_products.append(product)
            
        except Exception as e:
            print(f"Error cleaning product: {e}")
            
    return cleaned_products
