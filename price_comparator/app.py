import streamlit as st
import requests
from bs4 import BeautifulSoup
import html as html_lib
import json
import re
import pandas as pd
from urllib.parse import quote_plus, urlparse, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────

API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "openai/gpt-4.1"

PLATFORMS = {
    "Amazon":   {"domain": "amazon.in",   "color": "#FF9900", "emoji": "📦"},
    "Flipkart": {"domain": "flipkart.com","color": "#2874F0", "emoji": "🛒"},
    "Myntra":   {"domain": "myntra.com",  "color": "#FF3F6C", "emoji": "👗"},
    "Meesho":   {"domain": "meesho.com",  "color": "#570A57", "emoji": "🏪"},
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
}

st.set_page_config(page_title="PriceWise", page_icon="🔍", layout="wide", initial_sidebar_state="collapsed")


# ──────────────────────────────────────────────
# CSS
# ──────────────────────────────────────────────
def inject_css():
    st.markdown("""<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    html,body,.stApp{font-family:'Inter',sans-serif}
    /* ── Navbar fixed at top ── */
    .pw-navbar{
        position:fixed;top:0;left:0;right:0;z-index:99999;
        display:flex;align-items:center;justify-content:space-between;
        padding:.75rem 2rem;background:#fff;
        border-bottom:1px solid #e7ebf3;
        box-shadow:0 1px 8px rgba(0,0,0,.08);
    }
    .pw-brand{display:flex;align-items:center;gap:.55rem;text-decoration:none}
    .pw-logo{
        width:34px;height:34px;border-radius:8px;
        background:#2563eb;display:flex;align-items:center;justify-content:center;
        color:#fff;
        box-shadow:0 2px 8px rgba(37,99,235,.35);
    }
    .pw-logo .material-symbols-outlined{
        font-size:1.15rem;color:#fff;
        font-variation-settings:'FILL' 0,'wght' 500,'GRAD' 0,'opsz' 24;
    }
    .pw-name{font-size:1.1rem;font-weight:800;color:#0e121b;letter-spacing:-.3px}
    .pw-home-btn{
        display:inline-flex;align-items:center;gap:.35rem;
        padding:.42rem 1rem;border-radius:9px;
        background:#f1f5ff;color:#2563eb;
        font-weight:700;font-size:.86rem;
        text-decoration:none;border:1.5px solid #dbeafe;
        transition:background .18s,box-shadow .18s;
    }
    .pw-home-btn:hover{background:#dbeafe;box-shadow:0 2px 8px rgba(37,99,235,.15);color:#1d4ed8}
    /* push content below fixed navbar */
    .block-container{padding-top:4.5rem !important}
    /* ── Hero ── */
    .hero{text-align:center;padding:2.5rem 1rem 1.5rem}
    .hero h1{font-size:3.2rem;font-weight:900;background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0}
    .hero p{color:#6b7280;font-size:1.05rem;margin-top:.4rem}
    .pcard{background:#fff;border-radius:18px;padding:1.6rem;box-shadow:0 4px 24px rgba(0,0,0,.06);border-top:5px solid var(--accent);transition:transform .2s,box-shadow .2s;position:relative;min-height:290px}
    .pcard:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.10)}
    .best-badge{position:absolute;top:-14px;right:16px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:800;letter-spacing:.6px;box-shadow:0 2px 8px rgba(16,185,129,.35)}
    .pcard .platform-name{font-size:1.15rem;font-weight:700;margin-bottom:.15rem}
    .pcard .product-title{font-size:.85rem;color:#4b5563;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.5rem;margin:.35rem 0}
    .pcard .price-tag{font-size:2rem;font-weight:800;color:#111827;margin:.25rem 0}
    .pcard .rating{display:inline-block;background:#f0fdf4;color:#166534;padding:3px 10px;border-radius:8px;font-size:.8rem;font-weight:600}
    .pcard .visit-btn{display:inline-block;margin-top:.7rem;padding:9px 22px;border-radius:10px;color:#fff!important;text-decoration:none;font-weight:600;font-size:.82rem;transition:opacity .2s}
    .pcard .visit-btn:hover{opacity:.82;color:#fff!important}
    .empty-card{background:#f9fafb;border-radius:18px;padding:2rem;text-align:center;border:2px dashed #e5e7eb;min-height:290px;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .empty-card .ec-icon{font-size:2.2rem;margin-bottom:.5rem}
    .empty-card .ec-name{font-weight:700;margin-bottom:.2rem}
    .empty-card .ec-sub{font-size:.82rem;color:#9ca3af}
    .savings{background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:1rem 1.5rem;border-radius:14px;text-align:center;font-weight:600;font-size:1.05rem;margin:1rem 0 1.5rem;box-shadow:0 4px 16px rgba(16,185,129,.25)}
    .chart-title{font-size:1.3rem;font-weight:700;margin:1rem 0 .5rem}
    .footer{text-align:center;color:#9ca3af;font-size:.78rem;padding:2rem 0 1rem;line-height:1.6}
    #MainMenu,footer,header{visibility:hidden}
    /* ── Match Search button blue ── */
    div.stButton > button[kind="primary"],
    div.stButton > button[data-testid="baseButton-primary"]{
        background:#3461FF !important;
        border-color:#3461FF !important;
        color:#fff !important;
        font-weight:700 !important;
        border-radius:10px !important;
        box-shadow:0 2px 12px rgba(52,97,255,.35) !important;
        transition:background .18s,box-shadow .18s,transform .12s !important;
    }
    div.stButton > button[kind="primary"]:hover,
    div.stButton > button[data-testid="baseButton-primary"]:hover{
        background:#2248e0 !important;
        border-color:#2248e0 !important;
        box-shadow:0 4px 18px rgba(52,97,255,.50) !important;
        transform:translateY(-1px) !important;
    }
    div.stButton > button[kind="primary"]:active,
    div.stButton > button[data-testid="baseButton-primary"]:active{
        transform:translateY(0) !important;
    }
    </style>""", unsafe_allow_html=True)
    # Load Material Symbols font for the logo icon
    st.markdown('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />', unsafe_allow_html=True)


# ──────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────
esc = lambda t: html_lib.escape(str(t)) if t else ""


def is_url(text):
    return any(p in text.lower() for p in ("http://", "https://", "www.", "amazon.", "flipkart.", "myntra.", "meesho."))


def detect_source_platform(text):
    low = text.lower()
    for name, info in PLATFORMS.items():
        if info["domain"] in low:
            return name
    return None


def call_llm(prompt, temperature=0.1, max_tokens=4096):
    try:
        r = requests.post(
            API_URL,
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
            json={"model": MODEL, "messages": [{"role": "user", "content": prompt}], "temperature": temperature, "max_tokens": max_tokens},
            timeout=60,
        )
        if r.status_code == 200:
            return r.json()["choices"][0]["message"]["content"]
    except Exception:
        pass
    return None


def parse_platform_json(raw):
    """Extract platform→products JSON from LLM response."""
    if not raw:
        return {}
    try:
        # Strip markdown fences
        clean = re.sub(r"```json\s*", "", raw)
        clean = re.sub(r"```\s*$", "", clean)
        m = re.search(r"\{.*\}", clean, re.DOTALL)
        if not m:
            return {}
        data = json.loads(m.group())
        out = {}
        for plat, products in data.items():
            if not isinstance(products, list):
                continue
            valid = []
            for p in products:
                if isinstance(p.get("price"), (int, float)) and p.get("title"):
                    p["price"] = int(p["price"])
                    p.setdefault("image", "")
                    p.setdefault("rating", "N/A")
                    p.setdefault("url", "")
                    valid.append(p)
            if valid:
                out[plat] = valid
        return out
    except Exception:
        return {}


# ──────────────────────────────────────────────
# SEARCH – LLM (single call, finds all platforms)
# ──────────────────────────────────────────────
def llm_search(product_input):
    """One LLM call to find the product on all platforms."""
    if is_url(product_input):
        context = f'Here is a product link: {product_input}\nIdentify this product and find it on all the platforms below.'
    else:
        context = f'Product: "{product_input}"'

    prompt = f"""You are a product price comparison assistant for Indian e-commerce.

{context}

Find this EXACT product (or the closest matching variant) on ALL of these platforms:
1. Amazon India (amazon.in)
2. Flipkart (flipkart.com)
3. Myntra (myntra.com)
4. Meesho (meesho.com)

IMPORTANT: You MUST try to find the product on EVERY platform. Most popular products are available on at least Amazon and Flipkart. Fashion/clothing items are often on Myntra. Budget items are often on Meesho.

For URLs, construct proper working links:
- Amazon: https://www.amazon.in/s?k=product+name+encoded
- Flipkart: https://www.flipkart.com/search?q=product+name+encoded
- Myntra: https://www.myntra.com/product-name
- Meesho: https://www.meesho.com/search?q=product+name+encoded

Return ONLY a JSON object, no other text, no markdown fences:
{{
  "product_name": "short clean product name",
  "Amazon": [{{"title": "full product name on Amazon", "price": 1299, "rating": "4.1", "url": "https://www.amazon.in/s?k=product+name"}}],
  "Flipkart": [{{"title": "full product name on Flipkart", "price": 1299, "rating": "4.2", "url": "https://www.flipkart.com/search?q=product+name"}}],
  "Myntra": [{{"title": "full product name on Myntra", "price": 1399, "rating": "4.0", "url": "https://www.myntra.com/product-name"}}],
  "Meesho": [{{"title": "full product name on Meesho", "price": 999, "rating": "3.9", "url": "https://www.meesho.com/search?q=product+name"}}]
}}

Rules:
- price = integer in INR (no currency symbol)
- rating = string like "4.1" or "N/A"
- url = working search URL for that platform so user can click and find the product
- Only use empty array [] if the product category genuinely does NOT exist on that platform
- Max 2 results per platform
- Be accurate with prices based on your knowledge
- "product_name" = clean short name like "iPhone 15" or "Nike Air Max 90"
"""

    resp = call_llm(prompt, temperature=0.1)
    return resp


# ──────────────────────────────────────────────
# SEARCH – Amazon scraping (real-time bonus)
# ──────────────────────────────────────────────
def scrape_amazon(query):
    url = f"https://www.amazon.in/s?k={quote_plus(query)}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code != 200:
            return []
        soup = BeautifulSoup(r.text, "lxml")
        out = []
        for item in soup.select('[data-component-type="s-search-result"]')[:8]:
            try:
                if item.select_one(".puis-label-popover-default"):
                    continue
                title = ""
                for sel in (".s-title-instructions-style", "h2 a span.a-text-normal", "h2 a span", "h2"):
                    el = item.select_one(sel)
                    if el:
                        t = el.get_text(separator=" ", strip=True)
                        t = re.sub(r"^(Sponsored\s*)+You are seeing.*?relevance to your search query\.?\s*", "", t, flags=re.IGNORECASE).strip()
                        if len(t) > 10:
                            title = t
                            break
                pw = item.select_one(".a-price-whole")
                raw = pw.text.strip().replace(",", "").replace(".", "") if pw else ""
                if not (title and raw.isdigit()):
                    continue
                ra = item.select_one(".a-icon-alt")
                lnk = item.select_one('a.a-link-normal[href*="/dp/"], h2 a')
                href = ""
                if lnk:
                    h = lnk.get("href", "")
                    href = h if h.startswith("http") else "https://www.amazon.in" + h
                out.append({"title": title, "price": int(raw), "rating": ra.text.strip() if ra else "N/A", "url": href, "image": ""})
                if len(out) >= 3:
                    break
            except Exception:
                continue
        return out
    except Exception:
        return []


# ──────────────────────────────────────────────
# ORCHESTRATOR
# ──────────────────────────────────────────────
def search_all(product_input, progress_cb=None):
    results = {}
    product_name = product_input

    if progress_cb:
        progress_cb("Asking AI to find prices on all platforms…", 0.10)

    # Run LLM search + Amazon scraping in parallel
    with ThreadPoolExecutor(max_workers=2) as pool:
        llm_future = pool.submit(llm_search, product_input)
        # For Amazon scraping, extract a search query from the input
        search_query = product_input
        if is_url(product_input):
            # extract slug from URL for scraping
            try:
                path = unquote(urlparse(product_input if product_input.startswith("http") else "https://" + product_input).path)
                parts = [p for p in path.strip("/").split("/") if p]
                if parts:
                    search_query = re.sub(r"[-_]+", " ", max(parts, key=len)).strip()
            except Exception:
                pass
        amz_future = pool.submit(scrape_amazon, search_query)

        llm_resp = None
        amazon_scraped = []
        for fut in as_completed([llm_future, amz_future]):
            if fut == llm_future:
                try:
                    llm_resp = fut.result()
                except Exception:
                    pass
            else:
                try:
                    amazon_scraped = fut.result() or []
                except Exception:
                    pass

    if progress_cb:
        progress_cb("Processing results…", 0.70)

    # Parse LLM results
    llm_data = parse_platform_json(llm_resp) if llm_resp else {}

    # Extract product name from LLM response
    if llm_resp:
        try:
            clean = re.sub(r"```json\s*", "", llm_resp)
            clean = re.sub(r"```\s*$", "", clean)
            m = re.search(r"\{.*\}", clean, re.DOTALL)
            if m:
                d = json.loads(m.group())
                if d.get("product_name"):
                    product_name = d["product_name"]
        except Exception:
            pass

    # Merge: Amazon scraping takes priority (real-time), LLM for rest
    for plat in PLATFORMS:
        if plat == "Amazon" and amazon_scraped:
            results["Amazon"] = amazon_scraped
        elif plat in llm_data and llm_data[plat]:
            results[plat] = llm_data[plat]

    # If Amazon scraping missed, use LLM data
    if "Amazon" not in results and "Amazon" in llm_data:
        results["Amazon"] = llm_data["Amazon"]

    if progress_cb:
        progress_cb("Done!", 1.0)

    return results, product_name


# ──────────────────────────────────────────────
# UI
# ──────────────────────────────────────────────
def render_results(results, product_name):
    if not results:
        st.error("Could not find this product on any platform. Try a different name.")
        return

    best_price, best_plat, worst_price = float("inf"), None, 0
    for plat, prods in results.items():
        prices = [p["price"] for p in prods if p.get("price", 0) > 0]
        if prices:
            mn = min(prices)
            if mn < best_price:
                best_price, best_plat = mn, plat
            worst_price = max(worst_price, max(prices))

    savings = worst_price - best_price if best_plat else 0
    if savings > 0 and best_plat:
        st.markdown(
            f'<div class="savings">💰 Best price on <b>{esc(best_plat)}</b> at <b>₹{best_price:,}</b> — You save up to <b>₹{savings:,}</b>!</div>',
            unsafe_allow_html=True)

    cols = st.columns(len(PLATFORMS), gap="medium")
    for idx, (plat, info) in enumerate(PLATFORMS.items()):
        with cols[idx]:
            prods = results.get(plat, [])
            if prods:
                p = prods[0]
                badge = '<div class="best-badge">BEST DEAL</div>' if plat == best_plat else ""
                # Clean URL: shorten Amazon tracking URLs
                raw_url = p.get("url", "#")
                dp = re.search(r"(/dp/[A-Z0-9]+)", raw_url)
                clean_url = ("https://www.amazon.in" + dp.group(1)) if dp else raw_url
                card_html = (
                    f'<div class="pcard" style="--accent:{info["color"]};">'
                    f'{badge}'
                    f'<div class="platform-name" style="color:{info["color"]};">{info["emoji"]} {plat}</div>'
                    f'<div class="product-title">{esc(p.get("title","N/A"))}</div>'
                    f'<div class="price-tag">₹{p.get("price",0):,}</div>'
                    f'<div style="margin:.4rem 0;"><span class="rating">⭐ {esc(p.get("rating","N/A"))}</span></div>'
                    f'<a class="visit-btn" style="background:{info["color"]};" href="{esc(clean_url)}" target="_blank">Visit Store →</a>'
                    f'</div>'
                )
                st.markdown(card_html, unsafe_allow_html=True)
                if len(prods) > 1:
                    with st.expander(f"{len(prods)-1} more"):
                        for x in prods[1:]:
                            st.markdown(f"**{esc(x.get('title',''))}**")
                            st.markdown(f"₹{x.get('price',0):,} | ⭐ {esc(x.get('rating','N/A'))}")
                            if x.get("url"):
                                st.link_button("View", x["url"], use_container_width=True)
                            st.divider()
            else:
                st.markdown(f"""<div class="empty-card">
    <div class="ec-icon">{info['emoji']}</div>
    <div class="ec-name" style="color:{info['color']};">{plat}</div>
    <div class="ec-sub">Not available</div>
</div>""", unsafe_allow_html=True)

    # Chart
    chart = {}
    for plat, prods in results.items():
        prices = [p["price"] for p in prods if p.get("price", 0) > 0]
        if prices:
            chart[f"{PLATFORMS[plat]['emoji']} {plat}"] = min(prices)
    if len(chart) >= 2:
        st.markdown("---")
        st.markdown('<div class="chart-title">📊 Price Comparison</div>', unsafe_allow_html=True)
        df = pd.DataFrame({"Platform": list(chart.keys()), "Price (₹)": list(chart.values())})
        st.bar_chart(df, x="Platform", y="Price (₹)", color="Platform", horizontal=True)

    # Table
    st.markdown("---")
    st.markdown('<div class="chart-title">📋 Detailed Comparison</div>', unsafe_allow_html=True)
    rows = []
    for plat, prods in results.items():
        if prods:
            p = prods[0]
            t = p.get("title", "")
            rows.append({
                "Platform": f"{PLATFORMS[plat]['emoji']} {plat}",
                "Product": (t[:70] + "…") if len(t) > 70 else t,
                "Price": f"₹{p.get('price',0):,}",
                "Rating": p.get("rating", "N/A"),
            })
    if rows:
        st.dataframe(pd.DataFrame(rows), use_container_width=True, hide_index=True)


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    inject_css()

    # ── Navbar ──
    st.markdown("""
    <nav class="pw-navbar">
        <a class="pw-brand" href="http://localhost:5173" target="_self">
            <div class="pw-logo">
                <span class="material-symbols-outlined">payments</span>
            </div>
            <span class="pw-name">PriceWise</span>
        </a>
        <a class="pw-home-btn" href="http://localhost:5173" target="_self">Home</a>
    </nav>
    """, unsafe_allow_html=True)

    st.markdown("""<div class="hero">
    <h1>🔍 PriceWise</h1>
    <p>Compare prices across Amazon · Flipkart · Myntra · Meesho in one click</p>
</div>""", unsafe_allow_html=True)

    # ── Read URL query param (passed from PriceWise homepage) ──
    params = st.query_params
    url_query = params.get("q", "").strip()

    _, center, _ = st.columns([1, 3, 1])
    with center:
        product_input = st.text_input(
            "search",
            value=url_query,          # pre-fill from URL param
            placeholder="Paste a product link or type a name — e.g. iPhone 15, Nike Air Max…",
            label_visibility="collapsed"
        )
        search_clicked = st.button("🔍  Compare Prices", use_container_width=True, type="primary")

    # Auto-trigger search if query came from the homepage URL
    auto_search = bool(url_query) and not search_clicked
    should_search = (search_clicked or auto_search) and product_input.strip()

    if should_search:
        raw = product_input.strip()

        if is_url(raw):
            plat = detect_source_platform(raw)
            st.info(f"🔗 Detected **{plat or 'product'}** link — finding on all platforms…")

        bar = st.progress(0)
        status = st.empty()
        def on_progress(msg, frac):
            status.caption(msg)
            bar.progress(min(frac, 1.0))

        results, product_name = search_all(raw, on_progress)
        bar.empty()
        status.empty()

        if is_url(raw):
            st.success(f"🔎 Product: **{product_name}**")

        st.markdown("---")
        render_results(results, product_name)

    elif search_clicked:
        st.warning("Please enter a product name or paste a URL.")

    st.markdown("""<div class="footer">
    ⚡ <b>PriceHunt</b> — Powered by AI + live Amazon scraping<br>
    Built with Streamlit &amp; OpenRouter
</div>""", unsafe_allow_html=True)


if __name__ == "__main__":
    main()
