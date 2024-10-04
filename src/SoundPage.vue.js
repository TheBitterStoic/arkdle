import Layout from './Layout.vue';
export default (await import('vue')).defineComponent({
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
            return this.soundFiles.map(file => file
                .replace('.ogg', '') // Remove .ogg extension
                .replace(/_/g, ' ') // Replace underscores with spaces
                .replace(/sound$/i, '') // Remove the word 'sound' at the end (case-insensitive)
            );
        }
    },
    methods: {
        filterSounds() {
            const input = this.userInput.toLowerCase();
            if (!input || this.isGuessedCorrectly) {
                this.filteredSounds = [];
            }
            else {
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
            const isValidSound = this.filteredSounds.length > 0 || this.soundNames.some(sound => sound.toLowerCase() === cleanedInput);
            // Prevent submitting if the input is not a valid sound name
            if (!isValidSound) {
                return;
            }
            // Auto-complete the guess with the first suggestion if there are filtered suggestions
            if (this.filteredSounds.length > 0) {
                this.userInput = this.filteredSounds[0];
            }
            // Prevent further guesses after a correct guess
            if (this.isGuessedCorrectly)
                return;
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
                }
                else {
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
});
;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            Layout,
        },
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Layout;
    /** @type { [typeof __VLS_components.Layout, typeof __VLS_components.Layout, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("sound-text") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("audio-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.audio, __VLS_intrinsicElements.audio)({ src: ((__VLS_ctx.soundFilePath)), controls: (true), ...{ class: ("sound-audio") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-container") }, });
    if (!__VLS_ctx.isGuessedCorrectly && !__VLS_ctx.hasGuessedToday) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.filterSounds) }, ...{ onKeyup: (__VLS_ctx.submitGuess) }, type: ("text"), placeholder: ("Enter your guess..."), ...{ class: ("sound-input") }, value: ((__VLS_ctx.userInput)), });
        if (__VLS_ctx.filteredSounds.length > 0 && __VLS_ctx.userInput !== '') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("dropdown") }, });
            for (const [sound] of __VLS_getVForSourceType((__VLS_ctx.filteredSounds))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                            if (!((!__VLS_ctx.isGuessedCorrectly && !__VLS_ctx.hasGuessedToday)))
                                return;
                            if (!((__VLS_ctx.filteredSounds.length > 0 && __VLS_ctx.userInput !== '')))
                                return;
                            __VLS_ctx.selectSound(sound);
                        } }, key: ((sound)), });
                (sound);
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("success-message") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("guess-table-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.attempts);
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("guess-table") }, });
    for (const [guess, index] of __VLS_getVForSourceType((__VLS_ctx.previousGuesses))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((index)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: (({ 'correct-guess': guess.correct, 'incorrect-guess': !guess.correct })) }, });
        (guess.name);
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['sound-text'];
    __VLS_styleScopedClasses['audio-container'];
    __VLS_styleScopedClasses['sound-audio'];
    __VLS_styleScopedClasses['input-container'];
    __VLS_styleScopedClasses['sound-input'];
    __VLS_styleScopedClasses['dropdown'];
    __VLS_styleScopedClasses['success-message'];
    __VLS_styleScopedClasses['guess-table-container'];
    __VLS_styleScopedClasses['guess-table'];
    __VLS_styleScopedClasses['correct-guess'];
    __VLS_styleScopedClasses['incorrect-guess'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
let __VLS_self;
