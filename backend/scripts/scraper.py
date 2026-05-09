from playwright.sync_api import sync_playwright
import pandas as pd
import time

all_data = []

# Multiple Sources
sources = [
    {
        "name": "Justdial",
        "base_url": "https://www.justdial.com/{city}/{category}",
        "card_selector": "div.resultbox",
        "name_selector": "h3",
        "address_selector": ".cont_sw_addr",
        "phone_selector": ".callcontent"
    },

    {
        "name": "Sulekha",
        "base_url": "https://www.sulekha.com/{category}/{city}",
        "card_selector": ".listing-card",
        "name_selector": "h3",
        "address_selector": ".address",
        "phone_selector": ""
    }
]

# Cities
cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Bangalore",
    "Hyderabad"
]

# Categories
categories = [
    "Restaurants",
    "Hospitals",
    "Gyms",
    "Hotels",
    "Cafes"
]

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    for source in sources:

        print(f"\n===== SCRAPING {source['name']} =====")

        for city in cities:
            for category in categories:

                try:

                    url = source["base_url"].format(
                        city=city,
                        category=category
                    )

                    print(f"\nOpening: {url}")

                    page.goto(url, timeout=60000)

                    page.wait_for_timeout(5000)

                    # Scroll page
                    for _ in range(10):
                        page.mouse.wheel(0, 5000)
                        page.wait_for_timeout(2000)

                    cards = page.locator(
                        source["card_selector"]
                    ).all()

                    print(f"Found {len(cards)} cards")

                    for card in cards[:30]:

                        try:
                            name = card.locator(
                                source["name_selector"]
                            ).inner_text()
                        except:
                            name = "N/A"

                        try:
                            address = card.locator(
                                source["address_selector"]
                            ).inner_text()
                        except:
                            address = "N/A"

                        # Phone optional
                        phone = "Not Available"

                        if source["phone_selector"] != "":
                            try:
                                phone = card.locator(
                                    source["phone_selector"]
                                ).inner_text()
                            except:
                                pass

                        data = {
                            "business_name": name,
                            "category": category,
                            "city": city,
                            "address": address,
                            "phone": phone,
                            "source": source["name"]
                        }

                        all_data.append(data)

                        print(data)

                except Exception as e:

                    print(f"\nERROR in {url}")
                    print(e)

    browser.close()

# Convert to DataFrame
df = pd.DataFrame(all_data)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Save CSV
df.to_csv(
    "business_listings.csv",
    index=False
)

print("\nCSV SAVED SUCCESSFULLY")
print(f"Total Records: {len(df)}")