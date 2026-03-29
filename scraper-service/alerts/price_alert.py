def trigger_price_alert(product_name, old_price, new_price):
    """
    Console/log output for price drops
    """
    if old_price and new_price < old_price:
        print(f"🔥 Price dropped for {product_name}: ₹{old_price:,} → ₹{new_price:,} (Saved: ₹{old_price - new_price:,})")
    elif old_price is None:
        print(f"🆕 New product tracked: {product_name} at ₹{new_price:,}")
    else:
        print(f"➖ No price drop for {product_name} (Current: ₹{new_price:,})")

def process_alerts(updated_data):
    """
    Iterates through updated data and triggers alerts
    """
    for item in updated_data:
        trigger_price_alert(
            item.get('name'),
            item.get('oldPrice'),
            item.get('newPrice')
        )
