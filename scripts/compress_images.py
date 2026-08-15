import os
import sys
from PIL import Image

public_dir = r"c:\Users\Gauta\OneDrive\Desktop\site\Gautam-buddha\public"

print("Starting image optimization...", flush=True)
files = [f for f in os.listdir(public_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

total_orig_size = 0
total_new_size = 0

for filename in files:
    filepath = os.path.join(public_dir, filename)
    orig_size = os.path.getsize(filepath)
    total_orig_size += orig_size
    
    try:
        with Image.open(filepath) as img:
            max_dim = 1600
            img_copy = img.copy()
            if img_copy.width > max_dim or img_copy.height > max_dim:
                img_copy.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
            webp_path = os.path.splitext(filepath)[0] + '.webp'
            img_copy.convert('RGB').save(webp_path, 'WEBP', quality=82, method=4)
            
            if filename.lower().endswith('.png'):
                # Also save a smaller JPG version or compressed PNG
                rgb_img = img_copy.convert('RGB')
                # Save as jpg if not having transparency or save optimized png
                jpg_fallback = os.path.splitext(filepath)[0] + '.jpg'
                rgb_img.save(jpg_fallback, 'JPEG', quality=82, optimize=True)
                # Overwrite PNG with reasonable size
                rgb_img.save(filepath, 'PNG', optimize=True)
            elif filename.lower().endswith(('.jpg', '.jpeg')):
                rgb_img = img_copy.convert('RGB')
                rgb_img.save(filepath, 'JPEG', quality=82, optimize=True, progressive=True)

            new_size = os.path.getsize(filepath)
            webp_size = os.path.getsize(webp_path)
            total_new_size += webp_size
            print(f"Optimized {filename} ({orig_size / (1024*1024):.2f}MB) -> WebP: {webp_size / 1024:.1f}KB, Fallback: {new_size / 1024:.1f}KB", flush=True)
    except Exception as e:
        print(f"Error optimizing {filename}: {e}", flush=True)

print(f"\nOptimization complete! Original: {total_orig_size / (1024*1024):.2f}MB, WebP total: {total_new_size / (1024*1024):.2f}MB", flush=True)
