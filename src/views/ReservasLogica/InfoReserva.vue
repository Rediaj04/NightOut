<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="inicio" href="/NightOut/Inicio">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="busqueda" href="/NightOut/Busqueda">
          <ion-icon :icon="searchOutline"></ion-icon>
          <ion-label>Buscar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="crearReserva" href="/NightOut/CrearReserva">
          <ion-icon :icon="addCircleOutline"></ion-icon>
          <ion-label>Reservar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="reservas" href="/NightOut/Reservas">
          <ion-icon :icon="calendarOutline"></ion-icon>
          <ion-label>Reservas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="perfil" href="/NightOut/Perfil">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <ion-content :fullscreen="true">
      <div class="info-container" v-if="post">
        <!-- Recibo de Reservación -->
        <div class="receipt-container">
          <h1 class="receipt-title">Recibo de Reservación</h1>
          
          <div class="receipt-details">
            <div class="detail-item">
              <span class="label">A nombre de:</span>
              <span class="value">M. Molina</span>
            </div>
            
            <div class="detail-row">
              <div class="detail-item">
                <span class="label">Número de personas:</span>
                <span class="value">5</span>
              </div>
              
              <div class="detail-item">
                <span class="label">Total pagado:</span>
                <span class="value">$60000</span>
              </div>
            </div>
          </div>

          <!-- Calendario -->
          <div class="calendar-section">
            <h2 class="calendar-title">Fecha reservada</h2>
            <div class="calendar">
              <div class="month">Enero 2024</div>
              <div class="weekdays">
                <div v-for="day in ['D', 'L', 'M', 'M', 'J', 'V', 'S']" :key="day">{{ day }}</div>
              </div>
              <div class="days">
                <div v-for="i in 31" :key="i" :class="{ 'selected': i === 25 }">{{ i }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Información del club -->
        <div class="club-info">
          <div class="image-section">
            <div class="main-image-container">
              <img 
                :src="post.images[currentImageIndex]" 
                class="main-image"
                @click="openImageViewer(currentImageIndex)"
              />
            </div>
            <div class="thumbnail-container">
              <img 
                v-for="(image, index) in post.images" 
                :key="index"
                :src="image"
                class="thumbnail"
                :class="{ active: index === currentImageIndex }"
                @click="currentImageIndex = index"
              />
            </div>
          </div>

          <div class="club-details">
            <div class="club-header">
              <img :src="post.profileImage" class="club-image" />
              <h2 class="club-name">{{ post.name }}</h2>
            </div>
          </div>
        </div>
      </div>

      <image-viewer
        :is-open="isViewerOpen"
        :images="post?.images || []"
        :initial-slide="currentImageIndex"
        @close="closeImageViewer"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  IonPage, 
  IonContent, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel,
  IonRouterOutlet 
} from '@ionic/vue';
import { 
  homeOutline, 
  searchOutline, 
  addCircleOutline, 
  calendarOutline, 
  personOutline,
  locationOutline,
  timeOutline,
  musicalNotesOutline,
  cardOutline 
} from 'ionicons/icons';
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/components/stores/posts';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';

const route = useRoute();
const postsStore = usePostsStore();
const currentImageIndex = ref(0);
const isViewerOpen = ref(false);

const post = postsStore.posts.find(p => p.id.toString() === route.params.id);

const openImageViewer = (index: number) => {
  currentImageIndex.value = index;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

.info-container {
  padding: 15px;
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.receipt-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.receipt-title {
  color: #ff007f;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(255, 0, 127, 0.2);
}

.receipt-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.detail-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
}

.detail-item:hover {
  transform: translateY(-2px);
}

.label {
  color: #ff007f;
  font-weight: bold;
  font-size: 1.1rem;
}

.value {
  color: white;
  font-size: 1.1rem;
}

/* Calendario */
.calendar-section {
  margin-top: 30px;
}

.calendar-title {
  color: #ff007f;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.calendar {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 15px;
  max-width: 100%;
  margin: 0 auto;
}

.month {
  color: #FF9A23;
  text-shadow: 0 0 10px rgba(255, 154, 35, 0.3);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
}

.weekdays div {
  color: #ff007f;
  font-weight: bold;
  font-size: 1rem;
}

.days div {
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s ease;
}

.days div.selected {
  background: #ff007f;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.3);
}

/* Galería de imágenes */
.club-info {
  margin-top: 20px;
}

.image-section {
  display: grid;
  gap: 10px;
}

.main-image-container {
  width: 100%;
  aspect-ratio: 1;
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.thumbnail-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 8px;
  padding: 5px;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #ff007f;
  transform: scale(1.05);
}

.club-details {
  margin-top: 30px;
}

.club-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
}

.club-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #ff007f;
}

.club-name {
  color: #ff007f;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(255, 0, 127, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-container {
    padding: 10px;
  }

  .receipt-title {
    font-size: 1.3rem;
  }

  .detail-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .main-image-container {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .info-container {
    padding: 8px;
  }

  .receipt-container {
    padding: 15px;
  }

  .receipt-title {
    font-size: 1.2rem;
  }

  .calendar {
    padding: 10px;
  }

  .days div {
    padding: 6px;
    font-size: 0.8rem;
  }

  .thumbnail-container {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }
}
</style> 