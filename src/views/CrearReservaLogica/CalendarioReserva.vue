<template>
  <ion-page>
    <ion-header>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="agenda-container">
        <ion-buttons slot="start">
          <ion-back-button default-href="/reserva/realizar"></ion-back-button>
        </ion-buttons>
        <h1 class="title">Agenda tu día</h1>
        <div class="progress-bar">
          <div class="progress" style="width: 40%;"></div>
        </div>
        <div class="calendar">
          <div class="month">{{ currentMonth }}</div>
          <div class="weekdays">
            <div v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>
          <div class="days">
            <div v-for="day in days" 
                 :key="day.date" 
                 :class="{ 
                   'active': isSelected(day),
                   'disabled': !day.available 
                 }"
                 @click="selectDate(day)">
              {{ day.date }}
            </div>
          </div>
        </div>
        <ion-button expand="block" class="reserve-button" @click="goToProcess">
          SIGUIENTE
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton,
  IonButton 
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Definir la interfaz para un día
interface Day {
  date: number;
  available: boolean;
}

const router = useRouter();
const currentMonth = ref('Enero 2024');
const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const selectedDate = ref<number | null>(null);

// Generar días del mes con disponibilidad aleatoria
const days: Day[] = Array.from({ length: 31 }, (_, i) => ({
  date: i + 1,
  available: Math.random() > 0.3
}));

const isSelected = (day: Day): boolean => selectedDate.value === day.date;

const selectDate = (day: Day): void => {
  if (day.available) {
    selectedDate.value = day.date;
  }
};

const goToProcess = (): void => {
  if (selectedDate.value) {
    router.push('/reserva/procesar');
  }
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#agenda-container {
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
  background-color: rgba(163, 74, 246, 0.3);
  border: 2px solid #A34AF6;
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 20px;
}

.progress {
  background-color: #6A00FF;
  border-radius: 8px;
  height: 15px;
  transition: width 0.3s ease;
}

.calendar {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.month {
  color: #FF9A23;
  text-shadow: 0 0 10px rgba(255, 154, 35, 0.3);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.weekdays div {
  color: #ff007f;
}

.days div {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 5px;
}

.days div:hover:not(.disabled) {
  background: rgba(255, 0, 127, 0.2);
  transform: scale(1.1);
}

.days div.active {
  background: #ff007f;
  color: white;
  transform: scale(1.1);
}

.days div.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.reserve-button {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 20px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  max-width: 200px;
  margin: 20px auto;
  font-size: 1rem;
}

.reserve-button:hover {
  --background: linear-gradient(to right, #230A34, #2C1D92);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(44, 29, 146, 0.5);
}
</style>