<template>
    <Layout>
      <!-- Title with customizable background -->
      <h1 class="saddle-text">Guess the Saddle</h1>
  
      <!-- Difficulty Settings -->
      <div class="difficulty-settings">
        <h2>Difficulty Settings</h2>
        <div class="switch-container">
          <div class="switch-item">
            <label for="bw-mode">B/W Mode</label>
            <input type="checkbox" id="bw-mode" v-model="isBlackWhiteMode" />
          </div>
          <div class="switch-item">
            <label for="inverted-mode">Inverted</label>
            <input type="checkbox" id="inverted-mode" v-model="isInvertedMode" />
          </div>
        </div>
      </div>
  
      <!-- Image Container to keep the image within its bounds -->
      <div class="image-container" :class="{ 'bw-mode': isBlackWhiteMode, 'inverted-mode': isInvertedMode }">
        <img :src="saddleImagePath" alt="Saddle Image" class="saddle-image"
        :style="{ transform: `scale(${zoomLevel}) ${isInvertedMode ? 'scaleY(-1)' : ''}` }" />
      </div>
  
      <!-- Input box for guesses with a dropdown, or success message if guessed correctly -->
      <div class="input-container">
        <template v-if="!isGuessedCorrectly">
          <input 
            type="text" 
            placeholder="Enter your guess..." 
            class="saddle-input" 
            v-model="userInput" 
            @input="filterSaddles"
            @keyup.enter="submitGuess"
          />
          <!-- Custom dropdown to display filtered saddles, hidden when no input -->
          <ul v-if="filteredSaddles.length > 0 && userInput !== ''" class="dropdown">
            <li 
              v-for="saddle in filteredSaddles" 
              :key="saddle" 
              @click="selectSaddle(saddle)">
              {{ saddle }}
            </li>
          </ul>
        </template>
        <!-- Success message when the guess is correct -->
        <template v-else>
          <div class="success-message">
            You have guessed correctly! Try again tomorrow.
          </div>
        </template>
      </div>
  
      <!-- Table to display previous guesses and attempts -->
      <div class="guess-table-container">
        <h2>Attempts: {{ attempts }}</h2>
        <table class="guess-table">
          <tr v-for="(guess, index) in previousGuesses" :key="index">
            <td :class="{'correct-guess': guess.correct, 'incorrect-guess': !guess.correct}">
              {{ guess.name }}
            </td>
          </tr>
        </table>
      </div>
    </Layout>
  </template>
  
  <script>
  import Layout from './Layout.vue';
  
  export default {
    components: {
      Layout,
    },
    data() {
      return {
        saddleImagePath: '', // Placeholder for the image path
        userInput: '', // Holds the user's guess
        filteredSaddles: [], // Holds the filtered saddle names for dropdown
        correctSaddle: '', // The correct saddle name (determined by the day of the year)
        previousGuesses: [], // Array to store previous guesses
        guessedSaddles: [], // Array to store guessed saddles
        attempts: 0, // Track the number of attempts
        isGuessedCorrectly: false, // Flag to disable input after correct guess
        zoomLevel: 4, // Initial zoom level (greater than 1 for zoomed-in)
        minZoomLevel: 1, // Minimum zoom level (normal zoom)
        // State for difficulty switches
        isBlackWhiteMode: false, // B/W mode switch
        isInvertedMode: false,   // Inverted mode switch
        saddleImages: [
          "Allosaurus_Saddle.png.jpg",
          "Amargasaurus_Saddle.png.jpg",
          "Andrewsarchus_Saddle.png.jpg",
          "Ankylo_Saddle.png.jpg",
          "Araneo_Saddle.png.jpg",
          "Argentavis_Saddle.png.jpg",
          "Arthropluera_Saddle.png.jpg",
          "Astrocetus_Tek_Saddle.png.jpg",
          "Astrodelphis_Starwing_Saddle.png.jpg",
          "Baryonyx_Saddle.png.jpg",
          "Basilisk_Saddle.png.jpg",
          "Basilosaurus_Saddle.png.jpg",
          "Beelzebufo_Saddle.png.jpg",
          "Bronto_Saddle.png.jpg",
          "Carbonemys_Saddle.png.jpg",
          "Carcharo_Saddle.png.jpg",
          "Carno_Saddle.png.jpg",
          "Castoroides_Saddle.png.jpg",
          "Ceratosaurus_Saddle.png.jpg",
          "Chalicotherium_Saddle.png.jpg",
          "Daeodon_Saddle.png.jpg",
          "Deinonychus_Saddle.png.jpg",
          "Desmodus_Saddle.png.jpg",
          "Diplodocus_Saddle.png.jpg",
          "Dire_Bear_Saddle.png.jpg",
          "Doedicurus_Saddle.png.jpg",
          "Dunkleosteus_Saddle.png.jpg",
          "Equus_Saddle.png.jpg",
          "Fasolasuchus_Saddle.png.jpg",
          "Gacha_Saddle.png.jpg",
          "Gallimimus_Saddle.png.jpg",
          "Gasbags_Saddle.png.jpg",
          "Giganotosaurus_Saddle.png.jpg",
          "Gigantoraptor_Saddle.png.jpg",
          "Ichthyosaurus_Saddle.png.jpg",
          "Iguanodon_Saddle.png.jpg",
          "Kaprosuchus_Saddle.png.jpg",
          "Karkinos_Saddle.png.jpg",
          "Lymantria_Saddle.png.jpg",
          "Maewing_Saddle.png.jpg",
          "Magmasaur_Saddle.png.jpg",
          "Mammoth_Saddle.png.jpg",
          "Managarmr_Saddle.png.jpg",
          "Manta_Saddle.png.jpg",
          "Mantis_Saddle.png.jpg",
          "Megachelon_Platform_Saddle.png.jpg",
          "Megalania_Saddle.png.jpg",
          "Megaloceros_Saddle.png.jpg",
          "Megalodon_Saddle.png.jpg",
          "Megalodon_Tek_Saddle.png.jpg",
          "Megalosaurus_Saddle.png.jpg",
          "Megatherium_Saddle.png.jpg",
          "Morellatops_Saddle.png.jpg",
          "Mosasaur_Saddle.png.jpg",
          "Mosasaur_Tek_Saddle.png.jpg",
          "Pachyrhinosaurus_Saddle.png.jpg",
          "Pachy_Saddle.png.jpg",
          "Paracer_Platform_Saddle.png.jpg",
          "Paracer_Saddle.png.jpg",
          "Parasaur_Saddle.png.jpg",
          "Pelagornis_Saddle.png.jpg",
          "Phiomia_Saddle.png.jpg",
          "Plesiosaur_Saddle.png.jpg",
          "Procoptodon_Saddle.png.jpg",
          "Pteranodon_Saddle.png.jpg",
          "Pulmonoscorpius_Saddle.png.jpg",
          "Quetz_Saddle.png.jpg",
          "Raptor_Saddle.png.jpg",
          "Ravager_Saddle.png.jpg",
          "Rex_Saddle.png.jpg",
          "Rex_Tek_Saddle.png.jpg",
          "Rhyniognatha_Saddle.png.jpg",
          "Rock_Drake_Saddle.png.jpg",
          "Rock_Drake_Tek_Saddle.png.jpg",
          "Rock_Golem_Saddle.png.jpg",
          "Roll_Rat_Saddle.png.jpg",
          "Sabertooth_Saddle.png.jpg",
          "Sarco_Saddle.png.jpg",
          "Snow_Owl_Saddle.png.jpg",
          "Spino_Saddle.png.jpg",
          "Stego_Saddle.png.jpg",
          "Tapejara_Saddle.png.jpg",
          "Tapejara_Tek_Saddle.png.jpg",
          "Terror_Bird_Saddle.png.jpg",
          "Therizinosaurus_Saddle.png.jpg",
          "Thorny_Dragon_Saddle.png.jpg",
          "Thylacoleo_Saddle.png.jpg",
          "Titanosaur_Platform_Saddle.png.jpg",
          "Trike_Saddle.png.jpg",
          "Tropeognathus_Saddle.png.jpg",
          "Tusoteuthis_Saddle.png.jpg",
          "Velonasaur_Saddle.png.jpg",
          "Woolly_Rhino_Saddle.png.jpg",
          "Xiphactinus_Saddle.png.jpg",
          "Yutyrannus_Saddle.png.jpg"
        ],
      };
    },
    computed: {
      saddleNames() {
        // Remove file extensions from image names and return them as possible answers
        return this.saddleImages.map(image => image.replace('.png.jpg', '').replace(/_/g, ' '));
      }
    },
    methods: {
      filterSaddles() {
        const input = this.userInput.toLowerCase();
        if (!input || this.isGuessedCorrectly) {
          this.filteredSaddles = [];
        } else {
          this.filteredSaddles = this.saddleNames
            .filter(saddle => saddle.toLowerCase().startsWith(input))
            .filter(saddle => !this.guessedSaddles.includes(saddle));
        }
      },
      saveProgress() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date as a string
      const progress = {
        date: today,
        previousGuesses: this.previousGuesses,
        isGuessedCorrectly: this.isGuessedCorrectly,
        attempts: this.attempts,
      };
      localStorage.setItem('gameProgress', JSON.stringify(progress));
    },
    loadProgress() {
      const savedProgress = localStorage.getItem('gameProgress');
      const today = new Date().toISOString().split('T')[0]; // Get today's date as a string

      if (savedProgress) {
        const progress = JSON.parse(savedProgress);

        // Load saved progress if it's for today
        if (progress.date === today) {
          this.previousGuesses = progress.previousGuesses || [];
          this.isGuessedCorrectly = progress.isGuessedCorrectly || false;
          this.attempts = progress.attempts || 0;
          this.hasGuessedToday = this.isGuessedCorrectly;
        } else {
          // Reset progress for a new day
          this.resetProgress();
        }
      }
    },
    resetProgress() {
      this.previousGuesses = [];
      this.isGuessedCorrectly = false;
      this.hasGuessedToday = false;
      this.attempts = 0;
    },
    saveProgress() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date as a string
  const progress = {
    date: today,
    previousGuesses: this.previousGuesses,
    isGuessedCorrectly: this.isGuessedCorrectly,
    attempts: this.attempts,
  };
  localStorage.setItem('dinoGameProgress', JSON.stringify(progress));
},
loadProgress() {
  const savedProgress = localStorage.getItem('dinoGameProgress');
  const today = new Date().toISOString().split('T')[0]; // Get today's date as a string

  if (savedProgress) {
    const progress = JSON.parse(savedProgress);

    // Load saved progress if it's for today
    if (progress.date === today) {
      this.previousGuesses = progress.previousGuesses || [];
      this.isGuessedCorrectly = progress.isGuessedCorrectly || false;
      this.attempts = progress.attempts || 0;
    } else {
      // Reset progress for a new day
      this.resetProgress();
    }
  }
},
resetProgress() {
  this.previousGuesses = [];
  this.isGuessedCorrectly = false;
  this.attempts = 0;
},
      selectSaddle(saddle) {
        if (!this.isGuessedCorrectly) {
          this.userInput = saddle;
          this.filteredSaddles = [];
        }
      },
      submitGuess() {
  const cleanedInput = this.userInput.trim().toLowerCase();

  // Prevent submitting if the input is empty or just whitespace
  if (cleanedInput === '') {
    return;
  }

  // Check if the user input is a valid saddle name (either from filtered suggestions or typed manually)
  const isValidSaddle = this.filteredSaddles.length > 0 || this.saddleNames.some(
    saddle => saddle.toLowerCase() === cleanedInput
  );

  // Prevent submitting if the input is not a valid saddle name
  if (!isValidSaddle) {
    return;
  }

  // Auto-complete the guess with the first suggestion if available
  if (this.filteredSaddles.length > 0 && cleanedInput !== this.filteredSaddles[0].toLowerCase()) {
    this.userInput = this.filteredSaddles[0];
  }

  // Prevent further guesses after a correct guess
  if (this.isGuessedCorrectly) return;

  // Check if the guess is correct
  const isCorrect = this.userInput.trim().toLowerCase() === this.correctSaddle.toLowerCase();

  // Store the guess in the previous guesses array (unshift adds to the top)
  this.previousGuesses.unshift({
    name: this.userInput,
    correct: isCorrect
  });

  // Increment attempts count
  this.attempts += 1;

  // Add the guessed saddle to guessedSaddles array
  this.guessedSaddles.push(this.userInput);

  // Handle correct guess
  if (isCorrect) {
    this.isGuessedCorrectly = true;
    this.userInput = ''; // Clear input after the correct guess
    this.filteredSaddles = []; // Clear suggestions
  } else {
    // If incorrect, zoom out a bit and allow further guesses
    this.zoomOut();
    this.userInput = ''; // Clear input after submission
    this.filteredSaddles = []; // Clear suggestions
  }
  this.saveProgress();
},
  
      zoomOut() {
        if (this.zoomLevel > this.minZoomLevel) {
          this.zoomLevel = Math.max(this.zoomLevel - 0.4, this.minZoomLevel);
        }
      },
      selectSaddleImage() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
  
        const imageIndex = dayOfYear % this.saddleImages.length;
        this.correctSaddle = this.saddleNames[imageIndex];
        this.saddleImagePath = `/saddle_images/${this.saddleImages[imageIndex]}`;
      }
    },
    mounted() {
      this.selectSaddleImage();
      this.loadProgress(); // Load progress for the current day
    }
  };
  </script>
  
  <style>
  /* Style for the title */
  .saddle-text {
    font-size: 2.5rem;
    color: #98faff;
    background-color: #18a4ac;
    padding: 1vh 2vh;
    border: 0.5vh solid #bebebe;
    text-align: center;
    margin-top: 0.2vh;
    position: relative; /* Allow the content to scroll */
    width: 60vh;
    z-index: 1000;
  }
  
  /* Image container to control image boundaries */
  .image-container {
    width: 42vh;
    height: auto;
    border: 5px solid #bebebe;
    background-image: url('/image_back.jpg');
    background-size: cover;
    background-position: center;
    padding: 1vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: block;
    margin-top: -17vh;
    margin-bottom: -1vh ;
    overflow: hidden; /* Prevent image overflow */
  }
  /* Style for the Saddle image with border and background */
  .saddle-image {
    width: 100%;
    height: auto;
    transition: transform 0.5s ease; /* Smooth zoom-out effect */
    transform-origin: center; /* Ensure the zoom happens from the center of the image */
  }
  
  /* Input box for guesses and dropdown */
  .input-container {
    font-size: 1rem;
    color: #98faff;
    width: 62vh;
    margin: 2vh 0;
    z-index: 1000;
    position: relative;
    left: -1.2vh;
  }
  
  .saddle-input {
    font-size: 1.5rem;
    color: #98faff;
    width: 100%;
    padding: 1vh;
    font-size: 1.1rem;
    border: 2px solid #bebebe;
    background-color: #18a4ac;
    text-align: left;
    position: relative;
    left: 0;
  }
  
  .saddle-input::placeholder {
    color: #98faff; /* Change the placeholder text color */
    font-size: 1.2rem; /* Change the placeholder text size */
    font-style: italic; /* Optional: italicize the text */
    font-family: 'Arial', sans-serif; /* Change the font family */
  }
  
  .dropdown {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0.5vh solid #bebebe;
    background-color: #18a4ac;
    z-index: 1000;
    overflow-y: auto;
  }
  
  .dropdown li {
    padding: 8px;
    cursor: pointer;
  }
  
  .dropdown li:hover {
    background-color: #1f6a6e;
  }
  
  /* Table to display the user's guesses */
  .guess-table-container {
    position: relative;
    width: 40vh;
    background-color: #18a4ac;
    border: 0.5vh solid #bebebe;
    padding: 1vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .guess-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .guess-table td {
    padding: 1vh;
    border: 1px solid #333;
    text-align: center;
  }
  
  .correct-guess {
    background-color: #98fb98;
    color: green;
  }
  
  .incorrect-guess {
    background-color: #ffcccb;
    color: red;
  }
  
  .success-message {
    font-size: 1.5rem;
    color: #18a4ac;
    background-color: #f0f0f0;
    padding: 1.5vh;
    border: 2px solid #bebebe;
    text-align: center;
    width: 100%;
    left: -2.5vh;
  }
  
  /* Style for Difficulty Settings */
  .difficulty-settings {
    position: relative;
    left: 45vh;
    top: -1.5vh;
    text-align: center;
    margin: -0.5vh auto;
    width: 20vh;
    padding: 1vh;
    background-color: #f0f0f0;
    border: 0.5vh solid #bebebe;
  }
  
  .switch-container {
    display: flex;
    flex-direction: column;
    margin-top: -1vh;
  }
  
  .switch-item {
    display: flex;
    justify-content: space-between;
  }
  
  /* B/W mode and Inverted mode effects */
  .bw-mode img {
    filter: grayscale(100%);
  }
  </style>
  