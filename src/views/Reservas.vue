<template>
  <ion-page>
    <ion-header>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="reservas-container">
        <h1 class="main-title">Mis Reservas</h1>
        <div class="reservas-list">
          <ion-item v-for="reserva in reservas" 
                   :key="reserva.id" 
                   class="reserva-item"
                   @click="goToInfoReserva(reserva.id)">
            <div class="reserva-content">
              <img :src="reserva.profileImage" class="club-image" />
              <div class="reserva-info">
                <h2>{{ reserva.name }}</h2>
                <p class="fecha">{{ reserva.fecha }}</p>
              </div>
            </div>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { usePostsStore } from '@/components/stores/posts';

const router = useRouter();
const postsStore = usePostsStore();
const reservas = postsStore.posts;

const goToInfoReserva = (id: number) => {
  router.push(`/NightOut/InfoReserva/${id}`);
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

.reservas-container {
  padding: 20px;
}

.reserva-item {
  --background: rgba(255, 255, 255, 0.1);
  --border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reserva-item:hover {
  transform: scale(1.02);
}

.reserva-content {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.club-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.reserva-info h2 {
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0 0 5px 0;
}

.fecha {
  color: #ff007f;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .reservas-container {
    padding: 10px;
  }

  .club-image {
    width: 50px;
    height: 50px;
  }

  .reserva-info h2 {
    font-size: 1rem;
  }
}

.main-title {
  color: #ff007f;
  font-size: 2rem;
  text-align: center;
  margin: 20px 0;
  padding: 0 20px;
}
</style>