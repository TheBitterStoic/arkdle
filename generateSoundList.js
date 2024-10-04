import { readdir } from 'fs/promises';
import path from 'path';

// Directory where your .ogg sound files are located
const soundFilesDirectory = path.join(process.cwd(), 'public', 'sound_files');

async function listSoundFiles() {
  try {
    // Read the directory and list all files
    const files = await readdir(soundFilesDirectory);

    // Filter for files that end with .ogg
    const soundFiles = files.filter(file => file.endsWith('.ogg'));

    // Generate the array of filenames as a string
    const arrayString = JSON.stringify(soundFiles, null, 2);

    // Output the result in the console or write to a file
    console.log(arrayString);
  } catch (err) {
    console.error('Unable to scan directory:', err);
  }
}

// Call the function
listSoundFiles();
