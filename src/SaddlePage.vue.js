import Layout from './Layout.vue';
export default (await import('vue')).defineComponent({
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
            isInvertedMode: false, // Inverted mode switch
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
            }
            else {
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
            const isValidSaddle = this.filteredSaddles.length > 0 || this.saddleNames.some(saddle => saddle.toLowerCase() === cleanedInput);
            // Prevent submitting if the input is not a valid saddle name
            if (!isValidSaddle) {
                return;
            }
            // Auto-complete the guess with the first suggestion if available
            if (this.filteredSaddles.length > 0 && cleanedInput !== this.filteredSaddles[0].toLowerCase()) {
                this.userInput = this.filteredSaddles[0];
            }
            // Prevent further guesses after a correct guess
            if (this.isGuessedCorrectly)
                return;
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
            }
            else {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("saddle-text") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("difficulty-settings") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("switch-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("switch-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("bw-mode"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("checkbox"), id: ("bw-mode"), });
    (__VLS_ctx.isBlackWhiteMode);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("switch-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("inverted-mode"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("checkbox"), id: ("inverted-mode"), });
    (__VLS_ctx.isInvertedMode);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("image-container") }, ...{ class: (({ 'bw-mode': __VLS_ctx.isBlackWhiteMode, 'inverted-mode': __VLS_ctx.isInvertedMode })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.saddleImagePath)), alt: ("Saddle Image"), ...{ class: ("saddle-image") }, ...{ style: (({ transform: `scale(${__VLS_ctx.zoomLevel}) ${__VLS_ctx.isInvertedMode ? 'scaleY(-1)' : ''}` })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-container") }, });
    if (!__VLS_ctx.isGuessedCorrectly) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.filterSaddles) }, ...{ onKeyup: (__VLS_ctx.submitGuess) }, type: ("text"), placeholder: ("Enter your guess..."), ...{ class: ("saddle-input") }, value: ((__VLS_ctx.userInput)), });
        if (__VLS_ctx.filteredSaddles.length > 0 && __VLS_ctx.userInput !== '') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("dropdown") }, });
            for (const [saddle] of __VLS_getVForSourceType((__VLS_ctx.filteredSaddles))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                            if (!((!__VLS_ctx.isGuessedCorrectly)))
                                return;
                            if (!((__VLS_ctx.filteredSaddles.length > 0 && __VLS_ctx.userInput !== '')))
                                return;
                            __VLS_ctx.selectSaddle(saddle);
                        } }, key: ((saddle)), });
                (saddle);
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
    __VLS_styleScopedClasses['saddle-text'];
    __VLS_styleScopedClasses['difficulty-settings'];
    __VLS_styleScopedClasses['switch-container'];
    __VLS_styleScopedClasses['switch-item'];
    __VLS_styleScopedClasses['switch-item'];
    __VLS_styleScopedClasses['image-container'];
    __VLS_styleScopedClasses['bw-mode'];
    __VLS_styleScopedClasses['inverted-mode'];
    __VLS_styleScopedClasses['saddle-image'];
    __VLS_styleScopedClasses['input-container'];
    __VLS_styleScopedClasses['saddle-input'];
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
