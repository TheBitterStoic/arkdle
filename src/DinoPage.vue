<template>
  <Layout>
    <!-- Title with customizable background -->
    <h1 class="dino-text">Guess the Dino</h1>

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
      <img :src="dinoImagePath" alt="Dino Image" class="dino-image"
      :style="{ transform: `scale(${zoomLevel}) ${isInvertedMode ? 'scaleY(-1)' : ''}` }" />
    </div>

    <!-- Input box for guesses with a dropdown, or success message if guessed correctly -->
    <div class="input-container">
      <template v-if="!isGuessedCorrectly">
        <input 
          type="text" 
          placeholder="Enter your guess..." 
          class="dino-input" 
          v-model="userInput" 
          @input="filterDinos"
          @keyup.enter="submitGuess"
        />
        <!-- Custom dropdown to display filtered dinosaurs, hidden when no input -->
        <ul v-if="filteredDinos.length > 0 && userInput !== ''" class="dropdown">
          <li 
            v-for="dino in filteredDinos" 
            :key="dino" 
            @click="selectDino(dino)">
            {{ dino }}
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
      dinoImagePath: '', // Placeholder for the image path
      userInput: '', // Holds the user's guess
      filteredDinos: [], // Holds the filtered dinosaur names for dropdown
      correctDino: '', // The correct dinosaur name (determined by the day of the year)
      previousGuesses: [], // Array to store previous guesses
      guessedDinos: [], // Array to store guessed dinosaurs
      attempts: 0, // Track the number of attempts
      isGuessedCorrectly: false, // Flag to disable input after correct guess
      zoomLevel: 4, // Initial zoom level (greater than 1 for zoomed-in)
      minZoomLevel: 1, // Minimum zoom level (normal zoom)
      // State for difficulty switches
      isBlackWhiteMode: false, // B/W mode switch
      isInvertedMode: false,   // Inverted mode switch
      dinoImages: [
        "Achatina.png",
        "Allosaurus.png",
        "Amargasaurus.png",
        "Ammonite.png",
        "Andrewsarchus.png",
        "Angler.png",
        "Ankylosaurus.png",
        "Araneo.png",
        "Archaeopteryx.png",
        "Argentavis.png",
        "Arthropluera.png",
        "Astrocetus.png",
        "Astrodelphis.png",
        "Attack Drone.png",
        "Baryonyx.png",
        "Basilisk.png",
        "Basilosaurus.png",
        "Beelzebufo.png",
        "Bloodstalker.png",
        "Brontosaurus.png",
        "Bulbdog.png",
        "Carbonemys.png",
        "Carcharodontosaurus.png",
        "Carnotaurus.png",
        "Castoroides.png",
        "Chalicotherium.png",
        "Cnidaria.png",
        "Coelacanth.png",
        "Compy.png",
        "Crystal Wyvern.png",
        "Daeodon.png",
        "Deathworm.png",
        "Defense Unit.png",
        "Deinonychus.png",
        "Desert Titan.png",
        "Desmodus.png",
        "Dilophosaur.png",
        "Dimetrodon.png",
        "Dimorphodon.png",
        "Dinopithecus.png",
        "Diplocaulus.png",
        "Diplodocus.png",
        "Direbear.png",
        "Direwolf.png",
        "Dodo.png",
        "Doedicurus.png",
        "Dung Beetle.png",
        "Dunkleosteus.png",
        "Electrophorus.png",
        "Enforcer.png",
        "Equus.png",
        "Eurypterid.png",
        "Fasolasuchus.png",
        "Featherlight.png",
        "Fenrir.png",
        "Ferox.png",
        "Fjordhawk.png",
        "Forest Titan.png",
        "Gacha.png",
        "Gallimimus.png",
        "Gasbags.png",
        "Giant Bee.png",
        "Giganotosaurus.png",
        "Gigantopithecus.png",
        "Gigantoraptor.png",
        "Glowbug.png",
        "Glowtail.png",
        "Griffin.png",
        "Hesperornis.png",
        "Hyaenodon.png",
        "Ice Titan.png",
        "Ichthyornis.png",
        "Ichthyosaurus.png",
        "Iguanodon.png",
        "Insect Swarm.png",
        "Jerboa.png",
        "Jug Bug.png",
        "Kairuku.png",
        "Kaprosuchus.png",
        "Karkinos.png",
        "Kentrosaurus.png",
        "King Titan.png",
        "Lamprey.png",
        "Leech.png",
        "Leedsichthys.png",
        "Liopleurodon.png",
        "Lymantria.png",
        "Lystrosaurus.png",
        "Maewing.png",
        "Magmasaur.png",
        "Mammoth.png",
        "Managarmr.png",
        "Manta.png",
        "Manticore.png",
        "Mantis.png",
        "Megachelon.png",
        "Megalania.png",
        "Megaloceros.png",
        "Megalodon.png",
        "Megalosaurus.png",
        "Meganeura.png",
        "Megatherium.png",
        "Mek.png",
        "Mesopithecus.png",
        "Microraptor.png",
        "Moeder.png",
        "Morellatops.png",
        "Mosasaurus.png",
        "Moschops.png",
        "Nameless.png",
        "Noglin.png",
        "Onyc.png",
        "Otter.png",
        "Oviraptor.png",
        "Ovis.png",
        "Pachy.png",
        "Pachyrhinosaurus.png",
        "Paraceratherium.png",
        "Parakeet Fish School.png",
        "Parasaur.png",
        "Pegomastax.png",
        "Pelagornis.png",
        "Phiomia.png",
        "Phoenix.png",
        "Piranha.png",
        "Plesiosaur.png",
        "Procoptodon.png",
        "Pteranodon.png",
        "Pulmonoscorpius.png",
        "Purlovia.png",
        "Quetzal.png",
        "Raptor.png",
        "Ravager.png",
        "Reaper.png",
        "Rex.png",
        "Rhyniognatha.png",
        "Rock Drake.png",
        "Rock Elemental.png",
        "Roll Rat.png",
        "Sabertooth Salmon.png",
        "Sabertooth.png",
        "Sarco.png",
        "Scout.png",
        "Seeker.png",
        "Shadowmane.png",
        "Shinehorn.png",
        "Sinomacrops.png",
        "Snow Owl.png",
        "Spinosaurus.png",
        "Stegosaurus.png",
        "Summoner.png",
        "Tapejara.png",
        "Tek Stryder.png",
        "Terror Bird.png",
        "Therizinosaurus.png",
        "Thorny Dragon.png",
        "Thylacoleo.png",
        "Titanoboa.png",
        "Titanomyrma.png",
        "Titanosaur.png",
        "Triceratops.png",
        "Trilobite.png",
        "Troodon.png",
        "Tropeognathus.png",
        "Tusoteuthis.png",
        "Unicorn.png",
        "Velonasaur.png",
        "Voidwyrm.png",
        "Vulture.png",
        "Woolly Rhino.png",
        "Wyvern.png",
        "Yeti.png",
        "Yutyrannus.png"
      ],
    };
  },
  computed: {
    dinoNames() {
      // Remove file extensions from image names and return them as possible answers
      return this.dinoImages.map(image => image.replace('.png', '').replace(/_/g, ' '));
    }
  },
  methods: {
    filterDinos() {
      const input = this.userInput.toLowerCase();
      if (!input || this.isGuessedCorrectly) {
        this.filteredDinos = [];
      } else {
        this.filteredDinos = this.dinoNames
          .filter(dino => dino.toLowerCase().startsWith(input))
          .filter(dino => !this.guessedDinos.includes(dino));
      }
    },
    selectDino(dino) {
      if (!this.isGuessedCorrectly) {
        this.userInput = dino;
        this.filteredDinos = [];
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
    submitGuess() {
  const cleanedInput = this.userInput.trim().toLowerCase();

  // Prevent submitting if the input is empty or just whitespace
  if (cleanedInput === '') {
    return;
  }

  // Check if the user input is a valid dino name (either from filtered suggestions or typed manually)
  const isValidDino = this.filteredDinos.length > 0 || this.dinoNames.some(
    dino => dino.toLowerCase() === cleanedInput
  );

  // Prevent submitting if the input is not a valid dino name
  if (!isValidDino) {
    return;
  }

  // Auto-complete the guess with the first suggestion if available
  if (this.filteredDinos.length > 0 && cleanedInput !== this.filteredDinos[0].toLowerCase()) {
    this.userInput = this.filteredDinos[0];
  }

  // Prevent further guesses after a correct guess
  if (this.isGuessedCorrectly) return;

  // Check if the guess is correct
  const isCorrect = this.userInput.trim().toLowerCase() === this.correctDino.toLowerCase();

  // Store the guess in the previous guesses array (unshift adds to the top)
  this.previousGuesses.unshift({
    name: this.userInput,
    correct: isCorrect
  });

  // Increment attempts count
  this.attempts += 1;

  // Add the guessed dinosaur to guessedDinos array
  this.guessedDinos.push(this.userInput);

  // Handle correct guess
  if (isCorrect) {
    this.isGuessedCorrectly = true;
    this.userInput = ''; // Clear input after the correct guess
    this.filteredDinos = []; // Clear suggestions
  } else {
    // If incorrect, zoom out a bit and allow further guesses
    this.zoomOut();
    this.userInput = ''; // Clear input after submission
    this.filteredDinos = []; // Clear suggestions
  }
  this.saveProgress()
},

    zoomOut() {
      if (this.zoomLevel > this.minZoomLevel) {
        this.zoomLevel = Math.max(this.zoomLevel - 0.4, this.minZoomLevel);
      }
    },
    selectDinoImage() {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const imageIndex = dayOfYear % this.dinoImages.length;
      this.correctDino = this.dinoNames[imageIndex];
      this.dinoImagePath = `/dino_images/${this.dinoImages[imageIndex]}`;
    }
  },
  mounted() {
    this.selectDinoImage();
    this.loadProgress(); // Load progress for the current day
  }
};
</script>

<style>
/* Style for the title */
.dino-text {
  font-size: 2.5rem;
  color: #eff5f5;
  background-color: #285c74;
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
/* Style for the Dino image with border and background */
.dino-image {
  width: 100%;
  height: auto;
  transition: transform 0.5s ease; /* Smooth zoom-out effect */
  transform-origin: center; /* Ensure the zoom happens from the center of the image */
}

/* Input box for guesses and dropdown */
.input-container {
  font-size: 1rem;
  color: #285c74;
  width: 62vh;
  margin: 2vh 0;
  z-index: 1000;
  position: relative;
  left: -1.2vh;
}

.dino-input {
  font-size: 1.5rem;
  color: #ecf2f5;
  width: 100%;
  padding: 1vh;
  font-size: 1.1rem;
  border: 2px solid #bebebe;
  background-color: #285c74;
  text-align: left;
  position: relative;
  left: 0;
}

.dino-input::placeholder {
  color: #285c74; /* Change the placeholder text color */
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
  background-color: #285c74;
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
  background-color: #285c74;
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
