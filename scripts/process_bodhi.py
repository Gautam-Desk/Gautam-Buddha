import os
from PIL import Image

src_img = r"C:\Users\Gauta\.gemini\antigravity\brain\d5a872c6-e492-46a0-b7b2-2ea3bd8ef3ec\bodhi_tree_enlightenment_1786822471917.jpg"
public_dir = r"c:\Users\Gauta\OneDrive\Desktop\site\Gautam-buddha\public"

if os.path.exists(src_img):
    with Image.open(src_img) as img:
        img_rgb = img.convert('RGB')
        img_rgb.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        
        webp_dest = os.path.join(public_dir, "bodhi_tree.webp")
        jpg_dest = os.path.join(public_dir, "bodhi_tree.jpg")
        
        img_rgb.save(webp_dest, 'WEBP', quality=82)
        img_rgb.save(jpg_dest, 'JPEG', quality=82, optimize=True)
        print(f"Saved {webp_dest} ({os.path.getsize(webp_dest)/1024:.1f}KB)")
else:
    print("Source image not found.")
