<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="details-container">
        <template v-if="post">
          <!-- Logo -->
          <div class="logo-header">
            <h1 class="neon-logo">NightOut</h1>
          </div>

          <!-- Contenedor principal -->
          <div class="post-content">
            <!-- Imagen principal con overlay -->
            <div class="main-image-container">
              <swiper class="detail-swiper" :modules="[SwiperAutoplay, SwiperPagination]" 
                     :pagination="{ clickable: true }" :autoplay="{ delay: 3000 }">
                <swiper-slide v-for="(image, index) in post.images" :key="index">
                  <img :src="image" alt="Post image" class="detail-image" />
                </swiper-slide>
              </swiper>
              
              <!-- Información superpuesta -->
              <div class="venue-header">
                <div class="venue-info">
                  <img :src="post.profileImage" alt="Profile" class="venue-profile" />
                  <div>
                    <h2 class="venue-name">
                      {{ post.name }}
                      <ion-icon :icon="checkmarkCircle" class="verified-icon"></ion-icon>
                    </h2>
                    <p class="venue-location">
                      <ion-icon :icon="locationOutline"></ion-icon>
                      {{ post.location }}
                    </p>
                  </div>
                </div>
                <ion-button class="follow-btn">SEGUIR</ion-button>
              </div>
            </div>

            <!-- Descripción y detalles -->
            <div class="venue-details">
              <p class="venue-description">{{ post.description }}</p>
              
              <div class="rating-container">
                <div class="stars">
                  <ion-icon v-for="n in 5" :key="n" 
                    :icon="n <= post.rating ? star : starOutline" 
                    class="star-icon">
                  </ion-icon>
                </div>
                <span class="rating-text">({{ post.ratingValue }} de 4.0)</span>
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

              <ion-button expand="block" class="reserve-btn">RESERVAR</ion-button>
            </div>
          </div>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '@/stores/posts';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { locationOutline, star, starOutline, checkmarkCircle } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
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
  color: #FF007F;
  font-size: 2rem;
  text-shadow: 0 0 10px #FF007F;
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
}

.venue-header {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.venue-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.venue-profile {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid white;
}

.venue-name {
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.verified-icon {
  color: #4D4DFF;
}

.venue-location {
  margin: 5px 0 0;
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255,255,255,0.8);
}

.follow-btn {
  --background: transparent;
  --border-color: #4D4DFF;
  --color: white;
  --border-width: 2px;
  --border-radius: 20px;
  font-weight: bold;
}

.venue-details {
  padding: 15px;
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
}

.venue-description {
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 20px;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  gap: 15px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.detail-label {
  color: #FF007F;
  font-weight: bold;
}

.reserve-btn {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 20px;
  --padding-top: 15px;
  --padding-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
  border: 2px solid #4D4DFF;
  transition: all 0.3s ease;
}

.reserve-btn:hover {
  --background: linear-gradient(to right, #671694, #1F0C66);
  box-shadow: 0 0 15px rgba(77, 77, 255, 0.5);
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
    margin-top: 0;
    padding: 30px;
    height: auto;
    overflow-y: visible;
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
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
  }

  .rating-container {
    margin-bottom: 0;
  }

  .detail-item {
    padding: 12px;
  }

  .reserve-btn {
    --padding-top: 20px;
    --padding-bottom: 20px;
    font-size: 18px;
    max-width: 300px;
    margin: 20px auto;
  }
}
</style>