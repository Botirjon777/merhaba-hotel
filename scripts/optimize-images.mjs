import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TARGET_DIR = 'public/images/hotel/fitnes';
const QUALITY = 80;

async function optimizeImages() {
  try {
    const dirPath = path.resolve(process.cwd(), TARGET_DIR);
    const files = await fs.readdir(dirPath);

    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );

    if (imageFiles.length === 0) {
      console.log('No JPG images found in', TARGET_DIR);
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(dirPath, file);
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      
      const webpPath = path.join(dirPath, `${basename}.webp`);

      console.log(`Processing ${file}...`);

      // 1. Create compressed JPG (temporary name to avoid overwriting immediately if desired, 
      // but usually we want to replace or keep both. Let's keep both for now or overwrite if user wants.
      // The user said "we have JPG format ... we need to convert as well webp".
      // I will overwrite the original JPG with a compressed version and create a webp version.)
      
      const buffer = await fs.readFile(inputPath);
      const originalSize = buffer.length;

      // Compress JPG
      await sharp(buffer)
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(path.join(dirPath, `${basename}_tmp${ext}`));
      
      // Move tmp to original
      await fs.rename(path.join(dirPath, `${basename}_tmp${ext}`), inputPath);
      
      const optimizedJpgSize = (await fs.stat(inputPath)).size;

      // Convert to WebP
      await sharp(buffer)
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      
      const webpSize = (await fs.stat(webpPath)).size;

      console.log(`  - JPG: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(optimizedJpgSize / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  - WebP: ${(webpSize / 1024 / 1024).toFixed(2)}MB created`);
    }

    console.log('Optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
