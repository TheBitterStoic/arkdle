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
import Layout from './Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Ensure the body and html take up the full viewport height */
  font-family: Arial, sans-serif; /* Optional global font */
  background-color: #b92c2c; /* Fallback background color */
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 10%, rgba(0, 0, 0, 0.5) 60%),
    url('/ArkBackground.jpg'); /* Use your background image */
  background-size: cover; /* Ensure the background image covers the whole screen */
  background-position: center;
  background-attachment: fixed; /* Keep the background fixed during scroll */
  background-repeat: no-repeat; /* Prevent the background from repeating */
  box-sizing: border-box;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; /* Center content horizontally */
  width: 100%;
  max-width: 600px; /* Control the maximum width of the content */
  padding: 20px;
  min-height: 100vh; /* Ensure the container takes up at least the full viewport height */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Optional box shadow */
  background-color: rgba(255, 255, 255, 0.9); /* Optional background with transparency */
  border-radius: 10px; /* Optional border radius for rounded corners */
}

.logo {
  height: auto;
  max-width: 100%;
  display: block;
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  justify-content: center;
  align-items: center; /* Center buttons horizontally */
  margin-top: 20px; /* Use consistent spacing instead of vh units */
  width: 100%;
}

.custom-button {
  border: none;
  background: none;
  padding: 10px; /* Set a fixed padding for consistency */
  cursor: pointer;
  margin: 20px 0; /* Set a fixed margin between buttons to avoid large spacing on zoom */
  transition: transform 0.2s ease; /* Smooth transition for hover effect */
}

.button-image {
  max-width: 100%; /* Ensure the image scales within the button */
  height: auto; /* Maintain the aspect ratio */
  display: block;
  margin: 0 auto; /* Ensure the image is centered */
}

.custom-button:hover {
  transform: scale(1.1); /* Slightly increase the size on hover */
}
</style>
