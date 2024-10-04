import { readdir } from 'fs/promises';
import path from 'path';

// Directory where your dino images are located
const saddleImagesDirectory = path.join(process.cwd(), 'public', 'saddle_images');

try {
  // Read the directory and filter only .png (or other image formats)
  const files = await readdir(saddleImagesDirectory);

  // Filter out non-image files (optional, depending on your directory structure)
  const imageFiles = files.filter(file => file.endsWith('.png.jpg'));

  // Generate the array of filenames as a string
  const arrayString = JSON.stringify(imageFiles, null, 2);

  // Output the result in the console or write to a file
  console.log(arrayString);
} catch (err) {
  console.error('Unable to scan directory:', err);
}
