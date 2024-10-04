<template>
    <div class="logo">
      <!-- You can add your logo as an image or SVG -->
      <img :src="logoSrc" :alt="altText" class="logo-image" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArkLogo',
    props: {
      logoSrc: {
        type: String,
        default: '../public/ArkLogo.png' // Add your default logo path here
      },
      altText: {
        type: String,
        default: 'Ark Logo' // Default alt text
      }
    }
  }
  </script>
  