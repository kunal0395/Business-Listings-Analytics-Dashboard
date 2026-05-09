import pandas as pd
import random

business_prefix = [
    "Royal",
    "Star",
    "Prime",
    "Smart",
    "Elite",
    "Metro",
    "Urban",
    "Modern",
    "Shree",
    "Sai"
]

business_suffix = [
    "Restaurant",
    "Hospital",
    "Gym",
    "Cafe",
    "Hotel",
    "Salon",
    "Dental Clinic",
    "Fitness Center"
]

cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Nashik"
]

categories = [
    "Restaurant",
    "Hospital",
    "Gym",
    "Cafe",
    "Hotel",
    "Salon",
    "Dental"
]

sources = [
    "Justdial",
    "Sulekha",
    "Google"
]

areas = [
    "Andheri",
    "Bandra",
    "Baner",
    "CP",
    "MG Road",
    "Hinjewadi",
    "Powai",
    "Kharadi"
]

data = []

for i in range(700):

    business_name = (
        random.choice(business_prefix)
        + " "
        + random.choice(business_suffix)
    )

    city = random.choice(cities)

    category = random.choice(categories)

    address = (
        random.choice(areas)
        + ", "
        + city
    )

    phone = str(random.randint(6000000000, 9999999999))

    source = random.choice(sources)

    data.append({
        "business_name": business_name,
        "category": category,
        "city": city,
        "address": address,
        "phone": phone,
        "source": source
    })

df = pd.DataFrame(data)

df.to_csv(
    "result/mock_data1.csv",
    index=False
)

print("CSV GENERATED SUCCESSFULLY")
print(f"Total Records: {len(df)}")