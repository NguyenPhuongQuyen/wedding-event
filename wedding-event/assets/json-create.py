import os
import json
import random

# Folder containing the images
IMAGE_FOLDER = "assets/"

# Output JSON file
OUTPUT_FILE = "digital-cards/cards.json"

categories = [
    "Minimalist",
    "Vintage",
    "Floral",
    "Modern",
    "Traditional"
]

tags_pool = [
    "Elegance",
    "Gold Leaf",
    "Modern",
    "Luxury",
    "Nature",
    "Abstract",
    "Classic",
    "Handmade",
    "Art",
    "Premium",
    "Soft Colors",
    "Bold",
    "Minimal",
    "Vintage Style",
    "Botanical"
]

data = []

# Get all files starting with "li_"
image_files = sorted(
    f for f in os.listdir(IMAGE_FOLDER)
    if f.startswith("il_") and os.path.isfile(os.path.join(IMAGE_FOLDER, f))
)

for i, filename in enumerate(image_files, start=1):
    category = random.choice(categories)
    tags = random.sample(tags_pool, 3)  # 3 unique random tags

    item = {
        "id": i,
        "title": category+" "+tags[0]+" "+tags[1]+" Card",
        "image": "../assets/"+filename,  # or os.path.join(IMAGE_FOLDER, filename)
        "category": category,
        "tags": tags
    }

    data.append(item)

# Save JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Created {OUTPUT_FILE} with {len(data)} items.")