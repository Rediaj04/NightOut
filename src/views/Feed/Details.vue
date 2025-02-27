<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="details-container">
        <template v-if="post">
          <!-- Logo -->
          <div class="logo-header">
          </div>

          <!-- Contenedor principal -->
          <div class="post-content">
            <!-- Imagen principal -->
            <div class="main-image-container">
              <swiper class="detail-swiper" :modules="[SwiperAutoplay, SwiperPagination]" 
                     :pagination="{ clickable: true }" :autoplay="{ delay: 3000 }"
                     @swiper="onSwiper"
                     @click="openImageViewer(post.images)">
                <swiper-slide v-for="(image, index) in post.images" :key="index">
                  <img :src="image" alt="Post image" class="detail-image" />
                </swiper-slide>
              </swiper>
            </div>

            <!-- Contenedor de detalles -->
            <div class="venue-details">
              <!-- Header reorganizado -->
              <div class="venue-header">
                <img :src="post.profileImage" alt="Profile" class="venue-profile" />
                <h2 class="venue-name-details">
                  {{ post.name }}
                  <ion-icon :icon="checkmarkCircle" class="verified-icon"></ion-icon>
                </h2>
                <ion-button 
                  class="follow-btn" 
                  :class="{ 'following': isFollowing }" 
                  @click="toggleFollow"
                >
                  {{ isFollowing ? 'Seguido' : 'Seguir' }}
                </ion-button>
              </div>

              <p class="venue-description">{{ post.description }}</p>
              
              <p class="venue-location">
                <ion-icon :icon="locationOutline"></ion-icon>
                {{ post.location }}
              </p>

              <div class="rating-container">
                <div class="stars">
                  <ion-icon v-for="n in 4" :key="n" 
                    :icon="n <= post.rating ? star : starOutline" 
                    class="star-icon">
                  </ion-icon>
                </div>
                <span class="rating-text">({{ post.ratingValue }})</span>
              </div>

              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Edad mínima:</span>
                  <span class="detail-value">{{ post.minAge }} años</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Tipo de música:</span>
                  <span class="detail-value">{{ post.musicType }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Precio promedio:</span>
                  <span class="detail-value">{{ post.price }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Horario:</span>
                  <span class="detail-value">{{ post.schedule }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Zonas VIP:</span>
                  <span class="detail-value">{{ post.vip }}</span>
                </div>
              </div>

              <ion-button @click="goToReserva" expand="block" class="reserve-button">
                RESERVAR
              </ion-button>
            </div>
          </div>
        </template>
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
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '@/components/stores/posts';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { locationOutline, star, starOutline, checkmarkCircle } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper/types';
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';
import 'swiper/swiper-bundle.css';

// Definir la interfaz para el tipo Post
interface Post {
  id: number;
  name: string;
  images: string[];
  profileImage: string;
  description: string;
  location: string;
  minAge: number;
  musicType: string;
  price: string;
  schedule: string;
  vip: string;
  likes: number;
  rating: number;
  ratingValue: string;
  isLiked: boolean;
  isFollowing: boolean;
  isSaved: boolean;
}

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const post = computed<Post | undefined>(() => {
  const id = Number(route.params.id);
  return postsStore.posts.find(p => p.id === id);
});

const goToInicio = () => {
  router.push('/Inicio');
};

const goToReserva = () => {
  router.push('/NightOut/reserva/realizar');
};

// Variables para el ImageViewer
const isViewerOpen = ref(false);
const selectedImages = ref<string[]>([]);
const selectedImageIndex = ref(0);
const currentSwiper = ref<SwiperType | null>(null);

// Función para manejar el swiper
const onSwiper = (swiper: SwiperType) => {
  currentSwiper.value = swiper;
};

// Funciones para el ImageViewer
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

const isFollowing = ref(false);

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
};
</script>

<style scoped>
.details-container {
  background: linear-gradient(to bottom, #2B003A, #100011);
  min-height: 100vh;
  color: white;
}

.logo-header {
  padding: 10px;
  text-align: center;
}

.neon-logo {
  color: #FF9A23;
  font-size: 2rem;
  text-shadow: 0 0 10px #FF9A23;
  margin: 0;
}

.post-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
}

.main-image-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
}

.detail-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  cursor: pointer;
}

.venue-details {
  padding: 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  height: auto;
  min-height: 400px;
  margin-bottom: 20px;
}

.venue-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.venue-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}

.venue-name-details {
  flex: 1;
  font-size: 21px;
  color: #FF9A23;
  margin: 0;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 154, 35, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.verified-icon {
  color: #4D4DFF;
  font-size: 20px;
}

.venue-description {
  font-size: 15px;
  line-height: 1.3;
  margin: 8px 0;
  max-height: 80px;
  overflow-y: auto;
}

.venue-location {
  font-size: 14px;
  margin: 8px 0 12px;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.stars {
  display: flex;
  gap: 5px;
}

.star-icon {
  color: #FFD700;
  font-size: 20px;
}

.details-grid {
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-item {
  padding: 6px;
  font-size: 13px;
}

.detail-label {
  color: #FF9A23;
  font-weight: bold;
}

.reserve-button {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 20px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --color: white;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  border: 2px solid #4D4DFF;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-size: 14px;
  width: 100%;
  max-width: 250px;
}

.reserve-button:hover,
.reserve-button:active {
  --background: linear-gradient(to right, #230A34, #2C1D92);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(44, 29, 146, 0.5);
}

.follow-btn {
  --background: transparent;
  --border-color: white;
  --border-style: solid;
  --border-width: 1px;
  --border-radius: 15px;
  --color: white;
  --padding-start: 12px;
  --padding-end: 12px;
  font-size: 0.8rem;
  height: 32px;
  margin: 0;
  transition: all 0.2s ease;
}

.follow-btn.following {
  --background: white;
  --border-color: white;
  --color: #2B003A;
}

@media (min-width: 769px) {
  .post-content {
    max-width: 1200px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .main-image-container {
    margin-bottom: 0;
  }

  .detail-image {
    height: 600px;
  }

  .venue-details {
    height: 600px;
    overflow-y: auto;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .venue-description {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 0;
    max-height: 110px;
  }

  .rating-container {
    margin-bottom: 0;
  }

  .detail-item {
    padding: 12px;
    font-size: 14px;
  }

  .reserve-button {
    --padding-top: 20px;
    --padding-bottom: 20px;
    font-size: 18px;
    max-width: 300px;
    margin: 20px auto;
  }
}
</style>