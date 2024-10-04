<template>
  <Layout>
    <h1 class="sound-text">Guess the Sound</h1>

    <!-- Audio Player to play sound -->
    <div class="audio-container">
      <audio :src="soundFilePath" controls class="sound-audio"></audio>
    </div>

    <!-- Input box for guesses with a dropdown, or success message if guessed correctly -->
    <div class="input-container">
      <template v-if="!isGuessedCorrectly && !hasGuessedToday">
        <input 
          type="text" 
          placeholder="Enter your guess..." 
          class="sound-input" 
          v-model="userInput" 
          @input="filterSounds"
          @keyup.enter="submitGuess"
        />
        <!-- Custom dropdown to display filtered sounds, hidden when no input -->
        <ul v-if="filteredSounds.length > 0 && userInput !== ''" class="dropdown">
          <li 
            v-for="sound in filteredSounds" 
            :key="sound" 
            @click="selectSound(sound)">
            {{ sound }}
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
      soundFilePath: '', // Placeholder for the sound file path
      userInput: '', // Holds the user's guess
      filteredSounds: [], // Holds the filtered sound names for dropdown
      correctSound: '', // The correct sound (determined by the day or random selection)
      previousGuesses: [], // Array to store previous guesses
      guessedSounds: [], // Array to store guessed sounds
      attempts: 0, // Track the number of attempts
      isGuessedCorrectly: false, // Flag to disable input after correct guess
      hasGuessedToday: false, // Track if the user has already guessed today
      soundFiles: [
  "Amargasaurussound.ogg",
  "Ammonitessound.ogg",
  "Ankylosaurussound.ogg",
  "Archasound.ogg",
  "Argentavissound.ogg",
  "Arthropluerasound.ogg",
  "Astrocetussound.ogg",
  "Baryonyxsound.ogg",
  "Basilisksound.ogg",
  "Basilosaurussound.ogg",
  "Beaversound.ogg",
  "Bloodstalkersound.ogg",
  "Brontosound.ogg",
  "Bulbdogsound.ogg",
  "Carbonemyssound.ogg",
  "Carnosound.ogg",
  "Chalicotheriumsound.ogg",
  "Cnidariasound.ogg",
  "Coelecanthsound.ogg",
  "Daeodonsound.ogg",
  "Deathwormsound.ogg",
  "Desert_Titan_sound.ogg",
  "Dilosound.ogg",
  "Dimorphodonsound.ogg",
  "Dinopithsound.ogg",
  "Diplocaulussound.ogg",
  "Direwolfsound.ogg",
  "Dungbeetlesound.ogg",
  "Electrophorussound.ogg",
  "Featherlightsound.ogg",
  "Feroxsound.ogg",
  "Forest_Titan_sound.ogg",
  "Gigantopithecussound.ogg",
  "Gigasound.ogg",
  "Glowbugsound.ogg",
  "Glowtailsound.ogg",
  "Hespererornissound.ogg",
  "Hyaenasound.ogg",
  "Ice_Titan_sound.ogg",
  "Icthyornissound.ogg",
  "Jugbugsound.ogg",
  "Kairukusound.ogg",
  "Karkinossound.ogg",
  "Kentrosound.ogg",
  "King_Titan_sound.ogg",
  "Lampreysound.ogg",
  "Leedsichtyssound.ogg",
  "Lioplurodonsound.ogg",
  "Mammothsound.ogg",
  "Mantissound.ogg",
  "Megalaniasound.ogg",
  "Megalosaurussound.ogg",
  "Megatheriumsound.ogg",
  "Microraptorsound.ogg",
  "Namelesssound.ogg",
  "Ottersound.ogg",
  "Pachysound.ogg",
  "Paracersound.ogg",
  "Parasaursound.ogg",
  "Pegomastaxsound.ogg",
  "Pelagornissound.ogg",
  "Phoenixsound.ogg",
  "Procoptodonsound.ogg",
  "Pteranodonsound.ogg",
  "Purloviasound.ogg",
  "Quetzalsound.ogg",
  "Raptorsound.ogg",
  "Ravagersound.ogg",
  "Reapersound.ogg",
  "Rexsound.ogg",
  "Rockdrakesound.ogg",
  "Rockwellsound.ogg",
  "Rollratsound.ogg",
  "Sabersound.ogg",
  "Salmonsound.ogg",
  "Scorpionsound.ogg",
  "Seekersound.ogg",
  "Shinehornsound.ogg",
  "Sinomasound.ogg",
  "Spinosound.ogg",
  "Stegosound.ogg",
  "Tapejarasound.ogg",
  "Therizinosound.ogg",
  "Thylacoleosound.ogg",
  "Titanosaursound.ogg",
  "Troodonsound.ogg",
  "Tropeognathussound.ogg",
  "Tusosound.ogg",
  "Wyvernsound.ogg",
  "Yutyrannussound.ogg"
],
    };
  },
  computed: {
    soundNames() {
      // Remove file extensions, underscores, and the word 'sound' at the end of the sound names
      return this.soundFiles.map(file =>
        file
          .replace('.ogg', '') // Remove .ogg extension
          .replace(/_/g, ' ')  // Replace underscores with spaces
          .replace(/sound$/i, '') // Remove the word 'sound' at the end (case-insensitive)
      );
    }
  },
  methods: {
    filterSounds() {
      const input = this.userInput.toLowerCase();
      if (!input || this.isGuessedCorrectly) {
        this.filteredSounds = [];
      } else {
        this.filteredSounds = this.soundNames
          .filter(sound => sound.toLowerCase().startsWith(input))
          .filter(sound => !this.guessedSounds.includes(sound));
      }
    },
    selectSound(sound) {
      if (!this.isGuessedCorrectly) {
        this.userInput = sound;
        this.filteredSounds = [];
      }
    },
    submitGuess() {
      const cleanedInput = this.userInput.trim().toLowerCase();

      // Prevent submitting if the input is empty or just whitespace
      if (cleanedInput === '') {
        return;
      }

      // Check if the user input is a valid sound name (either from filtered suggestions or typed manually)
      const isValidSound = this.filteredSounds.length > 0 || this.soundNames.some(
        sound => sound.toLowerCase() === cleanedInput
      );

      // Prevent submitting if the input is not a valid sound name
      if (!isValidSound) {
        return;
      }

      // Auto-complete the guess with the first suggestion if there are filtered suggestions
      if (this.filteredSounds.length > 0) {
        this.userInput = this.filteredSounds[0];
      }

      // Prevent further guesses after a correct guess
      if (this.isGuessedCorrectly) return;

      // Increment attempts count
      this.attempts += 1;

      // Check if the guess is correct
      const isCorrect = cleanedInput === this.correctSound.toLowerCase();

      // Store the guess in the previous guesses array (unshift adds to the top)
      this.previousGuesses.unshift({
        name: this.userInput,
        correct: isCorrect
      });

      // Add the guessed sound to guessedSounds array
      this.guessedSounds.push(this.userInput);

      // Clear input and suggestions after submission
      this.userInput = '';
      this.filteredSounds = [];

      // Handle correct guess
      if (isCorrect) {
        this.isGuessedCorrectly = true;
        this.saveProgress();
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
    selectSoundFile() {
      // Randomly pick a sound file for the day or based on other logic
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const soundIndex = dayOfYear % this.soundFiles.length;
      this.correctSound = this.soundNames[soundIndex];
      this.soundFilePath = `/sound_files/${this.soundFiles[soundIndex]}`;
    }
  },
  mounted() {
    this.selectSoundFile();
    this.loadProgress();
  }
};
</script>

<style>
/* Style for the title */
.sound-text {
  font-size: 2.5rem;
  color: #98faff;
  background-color: #18a4ac;
  padding: 1vh 2vh;
  border: 0.5vh solid #bebebe;
  text-align: center;
  margin-top: 0.2vh;
  position: relative;
  width: 60vh;
  z-index: 1000;
}

/* Audio container */
.audio-container {
  width: 60vh;
  margin: 1vh auto;
  text-align: center;
}

.sound-audio {
  width: 100%;
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

.sound-input {
  font-size: 1.5rem;
  color: #98faff;
  width: 100%;
  padding: 1vh;
  font-size: 1.1rem;
  border: 2px solid #bebebe;
  background-color: #18a4ac;
}

.sound-input::placeholder {
  color: #98faff;
  font-size: 1.2rem;
  font-style: italic;
  font-family: 'Arial', sans-serif;
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
  width: 40vh;
  background-color: #18a4ac;
  border: 0.5vh solid #bebebe;
  padding: 1vh;
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
}
</style>
