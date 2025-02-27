<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="procesando-container">
        <h1 class="title">Procesando pago</h1>
        <div class="progress-bar">
          <div class="progress" ref="progressBar"></div>
        </div>
        <div class="progress-status">{{ progressStatus }}</div>
        <div class="status-message" v-if="completed">
          <ion-icon :icon="checkmarkCircle" class="success-icon"></ion-icon>
          <p>¡Pago completado con éxito!</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkmarkCircle } from 'ionicons/icons';

const router = useRouter();
const completed = ref(false);
const progressStatus = ref('Iniciando proceso...');
const progressBar = ref<HTMLElement | null>(null);

const updateProgress = (width: number, status: string) => {
  if (progressBar.value) {
    progressBar.value.style.width = `${width}%`;
    progressStatus.value = status;
  }
};

const startProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateProgress(50, 'Iniciando proceso...');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateProgress(75, 'Procesando pago...');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateProgress(85, 'Confirmando reserva...');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateProgress(100, '¡Completado!');
  completed.value = true;
  
  setTimeout(() => {
    router.push('/NightOut/InfoReserva/1');
  }, 2000);
};

onMounted(() => {
  if (progressBar.value) {
    progressBar.value.style.width = '50%';
  }
  startProgress();
});
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#procesando-container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 20px;
}

.progress-bar {
  height: 15px;
  background: rgba(163, 74, 246, 0.3);
  border: 2px solid #A34AF6;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
  padding: 3px;
}

.progress {
  height: 100%;
  background: #6A00FF;
  border-radius: 8px;
  transition: width 0.3s ease;
}

.progress-status {
  color: #ff007f;
  margin-top: 10px;
  font-size: 1.2rem;
}

.status-message {
  color: #4CAF50;
  font-size: 1.5rem;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.success-icon {
  font-size: 4rem;
  color: #4CAF50;
}

/* Ajustes responsive */
@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
  
  .progress-status {
    font-size: 1rem;
  }
}
</style>