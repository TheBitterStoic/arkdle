import Layout from './Layout.vue';
export default (await import('vue')).defineComponent({
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
            isInvertedMode: false, // Inverted mode switch
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
            }
            else {
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
        submitGuess() {
            const cleanedInput = this.userInput.trim().toLowerCase();
            // Prevent submitting if the input is empty or just whitespace
            if (cleanedInput === '') {
                return;
            }
            // Check if the user input is a valid dino name (either from filtered suggestions or typed manually)
            const isValidDino = this.filteredDinos.length > 0 || this.dinoNames.some(dino => dino.toLowerCase() === cleanedInput);
            // Prevent submitting if the input is not a valid dino name
            if (!isValidDino) {
                return;
            }
            // Auto-complete the guess with the first suggestion if available
            if (this.filteredDinos.length > 0 && cleanedInput !== this.filteredDinos[0].toLowerCase()) {
                this.userInput = this.filteredDinos[0];
            }
            // Prevent further guesses after a correct guess
            if (this.isGuessedCorrectly)
                return;
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
            }
            else {
                // If incorrect, zoom out a bit and allow further guesses
                this.zoomOut();
                this.userInput = ''; // Clear input after submission
                this.filteredDinos = []; // Clear suggestions
            }
            this.saveProgress();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("dino-text") }, });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.dinoImagePath)), alt: ("Dino Image"), ...{ class: ("dino-image") }, ...{ style: (({ transform: `scale(${__VLS_ctx.zoomLevel}) ${__VLS_ctx.isInvertedMode ? 'scaleY(-1)' : ''}` })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-container") }, });
    if (!__VLS_ctx.isGuessedCorrectly) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.filterDinos) }, ...{ onKeyup: (__VLS_ctx.submitGuess) }, type: ("text"), placeholder: ("Enter your guess..."), ...{ class: ("dino-input") }, value: ((__VLS_ctx.userInput)), });
        if (__VLS_ctx.filteredDinos.length > 0 && __VLS_ctx.userInput !== '') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("dropdown") }, });
            for (const [dino] of __VLS_getVForSourceType((__VLS_ctx.filteredDinos))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                            if (!((!__VLS_ctx.isGuessedCorrectly)))
                                return;
                            if (!((__VLS_ctx.filteredDinos.length > 0 && __VLS_ctx.userInput !== '')))
                                return;
                            __VLS_ctx.selectDino(dino);
                        } }, key: ((dino)), });
                (dino);
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
    __VLS_styleScopedClasses['dino-text'];
    __VLS_styleScopedClasses['difficulty-settings'];
    __VLS_styleScopedClasses['switch-container'];
    __VLS_styleScopedClasses['switch-item'];
    __VLS_styleScopedClasses['switch-item'];
    __VLS_styleScopedClasses['image-container'];
    __VLS_styleScopedClasses['bw-mode'];
    __VLS_styleScopedClasses['inverted-mode'];
    __VLS_styleScopedClasses['dino-image'];
    __VLS_styleScopedClasses['input-container'];
    __VLS_styleScopedClasses['dino-input'];
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
