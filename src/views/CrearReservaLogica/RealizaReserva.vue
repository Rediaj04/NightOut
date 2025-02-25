<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="reserva-container">
        <ion-buttons slot="start">
          <ion-back-button default-href="/Details"></ion-back-button>
        </ion-buttons>
        <h1 class="title">Realiza tu reserva</h1>
        
        <div class="progress-bar">
          <div class="progress" style="width: 20%;"></div>
        </div>

        <div class="form-container">
          <div class="form-group">
            <label>Nombre completo</label>
            <input 
              type="text" 
              v-model="nombre" 
              placeholder="Ej: María Molina"
              class="custom-input"
            >
          </div>

          <div class="form-group">
            <label>Número de personas</label>
            <div class="number-input">
              <button @click="decrementPersonas" :disabled="personas <= 1">-</button>
              <span>{{ personas }}</span>
              <button @click="incrementPersonas" :disabled="personas >= 10">+</button>
            </div>
          </div>

          <div class="form-group">
            <label>Tipo de servicio</label>
            <div class="service-options">
              <div 
                v-for="service in services" 
                :key="service.id"
                class="service-option"
                :class="{ active: selectedService === service.id }"
                @click="selectService(service.id)"
              >
                <ion-icon :icon="service.icon" class="service-icon"></ion-icon>
                <span>{{ service.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <ion-button 
          expand="block" 
          class="reserve-button" 
          @click="goToCalendar"
          :disabled="!isFormValid"
        >
          SIGUIENTE
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonContent, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { peopleOutline, wineOutline, beerOutline } from 'ionicons/icons';

interface Service {
  id: number;
  name: string;
  icon: string;
}

const router = useRouter();
const nombre = ref('');
const personas = ref(1);
const selectedService = ref<number | null>(null);

const services: Service[] = [
  { id: 1, name: 'General', icon: peopleOutline },
  { id: 2, name: 'VIP', icon: wineOutline },
  { id: 3, name: 'Premium', icon: beerOutline }
];

const decrementPersonas = () => {
  if (personas.value > 1) personas.value--;
};

const incrementPersonas = () => {
  if (personas.value < 10) personas.value++;
};

const selectService = (id: number) => {
  selectedService.value = id;
};

const isFormValid = computed(() => {
  return nombre.value.trim() !== '' && 
         personas.value >= 1 && 
         selectedService.value !== null;
});

const goToCalendar = () => {
  if (isFormValid.value) {
    router.push('/reserva/calendario');
  }
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#reserva-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  color: #ff007f;
  text-align: center;
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

.form-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: #ff007f;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.custom-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: #ff007f;
  outline: none;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.3);
}

.number-input {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
}

.number-input button {
  background: #ff007f;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.number-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.number-input span {
  font-size: 1.2rem;
  color: white;
  min-width: 40px;
  text-align: center;
}

.service-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.service-option {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-option:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.service-option.active {
  border-color: #ff007f;
  background: rgba(255, 0, 127, 0.1);
}

.service-icon {
  font-size: 2rem;
  color: #ff007f;
}

.service-info {
  flex: 1;
}

.service-info h3 {
  color: #FF9A23;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.service-info p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.9rem;
}

.service-price {
  color: #ff007f;
  font-weight: bold;
  font-size: 1.1rem;
  display: block;
  margin-top: 5px;
}

.reserve-button {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 20px;
  --padding-top: 20px;
  --padding-bottom: 20px;
  font-size: 1rem;
  margin: 30px auto 0;
  max-width: 250px;
  position: relative;
  overflow: hidden;
  border: 2px solid #4D4DFF;
  transition: all 0.3s ease;
}

.reserve-button:hover {
  --background: linear-gradient(to right, #230A34, #2C1D92);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(44, 29, 146, 0.5);
}

/* Ajustes responsive */
@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }

  .form-container {
    padding: 15px;
  }

  .service-option {
    padding: 12px;
  }

  .service-icon {
    font-size: 1.5rem;
  }
}
</style>