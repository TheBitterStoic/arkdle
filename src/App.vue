<template>
  <div id="app">
    <router-view /> <!-- This will render the page based on the current route -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Apply the global background to both body and #app */
body {
  height: 100vh; /* Ensure full height of the page */
  margin: 0;
  padding: 0;
  background-color: #b92c2c; /* Global background color */
  background-image: 
    radial-gradient(circle, rgba(0, 0, 0, 0)10%, rgba(0, 0, 0, 0.5) 60%), 
    url('/ArkBackground.jpg'); /* Background image with vignette effect */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif; /* Optional: Set a global font */
  box-sizing: border-box;
  overflow-y: auto; /* Enable vertical scrolling */
  background-attachment: fixed;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Adjust this value to control the darkness level */
  z-index: -1; /* Ensure this is behind the content */
}

#app {
  height: 100%; /* Ensure #app also takes full height */
}

/* Hide scrollbar for Chrome, Safari, and Opera */
html {
  overflow-y: scroll; /* Still allow scrolling */
}

::-webkit-scrollbar {
  display: none; /* Hides scrollbar in Chrome, Safari, Opera */
}

/* Hide scrollbar in Firefox */
html {
  scrollbar-width: none;
}/* Hides scrollbar in Firefox */
</style>
