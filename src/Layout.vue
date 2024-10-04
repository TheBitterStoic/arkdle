<template>
  <div class="layout-container">
    <!-- Make the logo clickable and link to the MainPage -->
    <router-link to="/">
      <Logo class="logo" logoSrc="/ArkLogo.png" altText="Your Logo" />
    </router-link>
    <div class="content">
      <!-- This is where the page-specific content will go -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Logo from './components/Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>

<style>
.layout-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
}

.logo {
  height: auto;
  max-width: 100vh; /* Set a fixed size for the logo if needed */
  display: block;
  cursor: pointer; /* Add pointer cursor to indicate it's clickable */
}

.content {
  width: 100%;
  flex-grow: 1; /* Ensures the content takes up the remaining space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5vh;
}
</style>
