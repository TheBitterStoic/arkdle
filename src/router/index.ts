import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../MainPage.vue';
import DinoPage from '../DinoPage.vue';
import SaddlePage from '../SaddlePage.vue';
import SoundPage from '../SoundPage.vue';


const routes = [
  { path: '/', component: MainPage },
  { path: '/dino', component: DinoPage },
  {path: '/saddle', component: SaddlePage },
  {path: '/sound', component: SoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
