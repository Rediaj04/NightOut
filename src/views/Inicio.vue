<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header móvil -->
      <div id="mobile-header">
        <h1 class="neon-title">NightOut</h1>
        <ion-icon 
          class="door-icon" 
          :icon="logOutOutline"
          @click="handleLogout"
        ></ion-icon>
      </div>

      <!-- Título "Para ti" -->
      <h2 class="feed-title">Para ti</h2>

      <div id="feed-container">
        <div class="post" v-for="post in posts" :key="post.id">
          <div class="post-header-overlay">
            <div class="post-header-info">
              <img :src="post.profileImage" class="profile-pic clickable" @click="goToDetails(post.id)" />
              <div class="post-details">
                <h2 class="profile-name clickable" @click="goToDetails(post.id)">{{ post.name }}</h2>
                <p class="suggestion">Sugerencia para ti</p>
              </div>
            </div>
            <button class="follow-btn" @click="toggleFollow(post)" :class="{ 'following': post.isFollowing }">
              {{ post.isFollowing ? 'Seguido' : 'Seguir' }}
            </button>
          </div>

          <swiper
            class="post-swiper"
            :modules="[SwiperAutoplay, SwiperPagination]"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 3000 }"
            @swiper="onSwiper"
            @click="(e) => openImageViewer(post.images)"
          >
            <swiper-slide v-for="(image, imgIndex) in post.images" :key="imgIndex">
              <img :src="image" class="post-image" />
            </swiper-slide>
          </swiper>

          <div class="post-footer">
            <div class="post-actions">
              <div class="left-actions">
                <ion-icon 
                  class="action-icon heart clickable" 
                  :class="{ 'liked': post.isLiked }"
                  :icon="post.isLiked ? heart : heartOutline"
                  @click="toggleLike(post)"
                ></ion-icon>
                <ion-icon 
                  class="action-icon calendar clickable" 
                  :icon="calendarOutline"
                  @click="goToCalendar"
                ></ion-icon>
                <ion-icon class="action-icon share clickable" :icon="shareOutline"></ion-icon>
              </div>
              <div class="right-actions">
                <ion-icon 
                  class="action-icon bookmark clickable" 
                  :class="{ 'saved': post.isSaved }"
                  :icon="post.isSaved ? bookmarkSharp : bookmarkOutline"
                  @click="toggleSave(post)"
                ></ion-icon>
              </div>
            </div>
            
            <p class="likes">{{ post.likes.toLocaleString() }} Me gusta</p>
            <p class="location">
              <ion-icon :icon="locationOutline"></ion-icon>
              {{ post.location }}
            </p>
          </div>

          <div class="stars">
            <ion-icon v-for="n in 4" :key="n" 
              :icon="n <= post.rating ? star : starOutline" 
              class="star-icon">
            </ion-icon>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Image Viewer Modal -->
    <ImageViewer
      :is-open="isViewerOpen"
      :images="selectedImages"
      :initial-slide="selectedImageIndex"
      @close="closeImageViewer"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { 
  heart,
  heartOutline, 
  logOutOutline,  
  calendarOutline, 
  shareOutline, 
  locationOutline, 
  star, 
  starOutline,
  bookmarkOutline,
  bookmarkSharp,
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { usePostsStore } from '@/components/stores/posts';
import { computed, ref } from 'vue';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';

// Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper/types';
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const router = useRouter();
const postsStore = usePostsStore();

// Obtener los posts del store
const posts = computed(() => postsStore.posts);

const isViewerOpen = ref(false);
const selectedImages = ref<string[]>([]);
const selectedImageIndex = ref(0);
const currentSwiper = ref<SwiperType | null>(null);

const goToDetails = (id: number) => {
  router.push({ name: 'Details', params: { id: id.toString() } });
};

const toggleLike = (post: any) => {
  post.isLiked = !post.isLiked;
  if (post.isLiked) {
    post.likes++;
  } else {
    post.likes--;
  }
};

const toggleFollow = (post: any) => {
  post.isFollowing = !post.isFollowing;
};

const toggleSave = (post: any) => {
  post.isSaved = !post.isSaved;
};

const handleLogout = () => {
  router.push('/Login');
};

const onSwiper = (swiper: SwiperType) => {
  currentSwiper.value = swiper;
};

const openImageViewer = (images: string[]) => {
  if (currentSwiper.value) {
    selectedImageIndex.value = currentSwiper.value.activeIndex;
  } else {
    selectedImageIndex.value = 0;
  }
  selectedImages.value = images;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};

const goToCalendar = () => {
  router.push('/reserva/realizar');
};
</script>

<style scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100%;
}

/* Sidebar styles */
.sidebar {
  display: none; /* Oculto por defecto en móvil */
  width: 240px;
  background: rgba(43, 0, 58, 0.95);
  padding: 20px;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-menu {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.nav-item.active {
  font-weight: bold;
  color: #ff007f;
}

.nav-item ion-icon {
  font-size: 24px;
}

.logout-button {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  padding: 10px;
  cursor: pointer;
}

/* Mobile header - solo visible en móvil */
#mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}

/* Media queries para desktop */
@media (min-width: 769px) {
  .sidebar {
    display: flex; /* Mostrar sidebar en desktop */
  }

  #mobile-header {
    display: none; /* Ocultar header móvil en desktop */
  }

  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }

  #feed-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .post {
    max-width: 600px;
    margin: 30px auto;
  }

  .post-swiper {
    height: 400px;
  }
}

/* Resto de los estilos existentes */
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

/* ---- HEADER ---- */
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: white;
}

.neon-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff007f;
  text-shadow: 
    0 0 5px #ff007f, 
    0 0 10px #ff007f, 
    0 0 20px #ff007f, 
    0 0 40px #ff007f;
}

.neon-title span {
  color: white;
  text-shadow: 
    0 0 5px white, 
    0 0 10px white, 
    0 0 20px white, 
    0 0 40px white;
}

.door-icon {
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.door-icon:hover {
  color: #ff007f;
  transform: scale(1.1);
}

/* ---- POST ---- */
.post {
  background: rgba(255, 255, 255, 0.1);
  margin: 15px auto;
  border-radius: 10px;
  overflow: hidden;
  width: 95%;
  position: relative;
}

.post:first-child {
  margin-top: 5px;
}

.post-swiper {
  width: 100%;
  height: 400px;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.post-image:hover {
  opacity: 0.9;
}

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .post-swiper {
    height: 300px;
  }
  
  .post {
    margin: 10px auto;
    max-width: 100%;
  }
}

/* Media query para pantallas más grandes */
@media (min-width: 769px) {
  .post {
    max-width: 450px;
  }
  
  .post-swiper {
    height: 300px;
  }
  
  #feed-container {
    padding: 10px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* ---- POST HEADER OVERLAY ---- */
.post-header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
}

.post-header-info {
  display: flex;
  align-items: center;
}

.profile-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid white;
}

.post-details {
  flex-grow: 1;
}

.profile-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.suggestion {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.8);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.follow-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-btn.following {
  background: white;
  color: #2B003A;
}

/* ---- POST FOOTER ---- */
.post-footer {
  padding: 8px 15px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.left-actions {
  display: flex;
  gap: 16px;
}

.action-icon {
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.1);
}

.heart.liked {
  color: #ff007f;
  transform: scale(1.1);
}

.bookmark.saved {
  color: #ffd700;
  transform: scale(1.1);
}

.likes {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 4px 0;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: white;
  margin: 4px 0;
}

.location ion-icon {
  color: #ff4444;
  font-size: 16px;
}

/* Ajuste para el calendario */
.calendar {
  color: #4488ff;
}

/* Ajuste para compartir */
.share {
  color: white;
}

/* Ajuste para el bookmark */
.bookmark {
  color: white;
}

.bookmark.saved {
  color: #ffd700;
}

/* ---- RATING ---- */
.stars {
  display: flex;
  padding: 5px 10px;
  margin: 0;
}

.star-icon {
  font-size: 1.5rem;
  color: gold;
}

/* Estilos generales para elementos clickables */
.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.clickable:hover {
  opacity: 0.8;
}

/* Estilos para la imagen y nombre del perfil */
.profile-pic:hover, 
.profile-name:hover {
  opacity: 0.8;
}

/* Estilos para los iconos de acción */
.action-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.1);
}

/* Título del feed */
.feed-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 20px;
  margin: 0;
}

/* Ajustes para el contenedor del feed */
#feed-container {
  padding: 0 15px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* Media queries para desktop */
@media (min-width: 769px) {
  .feed-title {
    font-size: 26px;
    padding: 20px 0;
    margin-left: 20px;
  }

  #feed-container {
    padding: 0 20px;
    max-width: 700px;
  }

  .post {
    max-width: 650px;
    margin: 30px auto;
  }

  .post-swiper {
    height: 400px;
  }

  .post-header-overlay {
    padding: 8px 15px;
  }

  .post-footer {
    padding: 8px 15px;
  }
}

/* Ajustes adicionales para asegurar que el post quepa en pantalla */
.profile-pic {
  width: 32px;
  height: 32px;
}

.profile-name {
  font-size: 0.9rem;
  margin: 0;
}

.suggestion {
  font-size: 0.8rem;
  margin: 0;
}
</style>