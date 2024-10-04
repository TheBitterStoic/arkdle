<template>
  <Layout>
    <!-- Button Container -->
    <div class="button-container">
      <!-- Dino Button with router-link to navigate to DinoPage -->
      <router-link to="/dino">
        <button class="custom-button">
          <img src="/DinoButton.png" alt="First Button" class="button-image" />
        </button>
      </router-link>
      <!-- Saddle Button to navigate to SaddlePage -->
      <router-link to="/saddle">
        <button class="custom-button">
          <img src="/SaddleButton.png" alt="Second Button" class="button-image" />
        </button>
      </router-link>
      <router-link to="/sound">
      <button class="custom-button">
        <img src="/SoundButton.png" alt="Third Button" class="button-image" />
      </button>
    </router-link>
    </div>
  </Layout>
</template>

<script>
import Layout from './Layout.vue';

export default {
  components: {
    Layout,
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Ensure the body and html take up the full viewport height */
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; /* Center content horizontally */
  height: 100vh; /* Full viewport height */
  padding-top: 2vh; /* Adds space between the top and logo */
}

.logo {
  height: auto;
  max-width: 100%;
  display: block;
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  justify-content: flex-start;
  align-items: center; /* Center buttons horizontally */
  margin-top: 0.5vh; /* Add space between logo and buttons */
}

.custom-button {
  border: none;
  background: none;
  padding: 1vh;
  cursor: pointer;
  margin: 2vh 0; /* Adds space between buttons */
}

.button-image {
  max-width: 50vh; /* Set a max-width to control the size of the images */
  height: auto; /* Maintain the aspect ratio */
}

.custom-button:hover {
  transform: scale(1.1); /* Slightly increase the size to "pop out" */
}
</style>

