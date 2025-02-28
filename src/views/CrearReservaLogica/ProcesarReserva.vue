<template>
  <ion-page>
    <ion-header>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="pago-container">
        <ion-buttons slot="start">
          <ion-back-button default-href="/NightOut/reserva/calendario"></ion-back-button>
        </ion-buttons>
        <h1 class="title">Realiza el pago</h1>
        <div class="progress-bar">
          <div class="progress" style="width: 50%;"></div>
        </div>
        <p class="total">Total a pagar: $60000</p>
        
        <div class="card-preview">
          <div class="card">
            <div class="card-chip"></div>
            <div class="card-number">{{ formatCardNumber(cuenta) || 'XXXX XXXX XXXX XXXX' }}</div>
            <div class="card-details">
              <div>
                <span class="card-label">Válido hasta</span>
                <div class="card-expiry">{{ formatExpiry(expiracion) || 'MM/YY' }}</div>
              </div>
              <div>
                <span class="card-label">CVV</span>
                <div class="card-cvv">{{ cvv || '***' }}</div>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="procesarPago" class="payment-form">
          <div class="form-group">
            <label for="cuenta">Número de tarjeta</label>
            <input 
              type="text" 
              id="cuenta" 
              v-model="cuenta" 
              @input="formatCardInput"
              maxlength="19"
              placeholder="1234 5678 9012 3456"
              required
            >
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiracion">Fecha de expiración</label>
              <input 
                type="text" 
                id="expiracion" 
                v-model="expiracion"
                @input="formatExpiryInput"
                maxlength="5"
                placeholder="MM/YY"
                required
              >
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                v-model="cvv"
                @input="validateCVV"
                maxlength="3"
                placeholder="123"
                required
              >
            </div>
          </div>

          <ion-button 
            expand="block" 
            class="reserve-button" 
            @click="procesarPago"
            :disabled="!isFormValid"
          >
            PAGAR
          </ion-button>
        </form>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cuenta = ref('');
const cvv = ref('');
const expiracion = ref('');

const formatCardNumber = (value: string) => {
  if (!value) return '';
  return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
};

const formatCardInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  cuenta.value = value.replace(/(\d{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
  if (!value) return '';
  return value;
};

const formatExpiryInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  
  expiracion.value = value;
};

const validateCVV = (event: Event) => {
  const input = event.target as HTMLInputElement;
  cvv.value = input.value.replace(/\D/g, '');
};

const isFormValid = computed(() => {
  return cuenta.value.replace(/\s/g, '').length === 16 &&
         cvv.value.length === 3 &&
         expiracion.value.length === 5;
});

const procesarPago = () => {
  if (isFormValid.value) {
    router.push('/NightOut/reserva/final');
  }
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#pago-container {
  padding: 15px;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

.total {
  text-align: center;
  font-size: 1.5rem;
  color: #ff007f;
  margin: 20px 0;
}

.card-preview {
  perspective: 1000px;
  margin: 15px 0;
}

.card {
  background: linear-gradient(135deg, #560C78, #180A51);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.card-chip {
  width: 50px;
  height: 40px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-number {
  font-size: 1.6rem;
  letter-spacing: 2px;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.card-details {
  display: flex;
  justify-content: space-between;
  color: white;
}

.card-label {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
  margin-bottom: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #ff007f;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #ff007f;
  outline: none;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.3);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.reserve-button {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 10px;
  --padding-top: 15px;
  --padding-bottom: 15px;
  --color: white; 
  font-size: 1rem;
  margin: 20px auto 0;
  max-width: 250px;
  position: relative;
  overflow: hidden;
  border: 2px solid #4D4DFF; 
  border-radius: 10px; 
  transition: all 0.3s ease;
}

.reserve-button:hover {
  --background: linear-gradient(to right, #230A34, #2C1D92);
  border-color: #ff007f;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.3);
}

.reserve-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .card-number {
    font-size: 1.3rem;
  }

  .card {
    padding: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  input {
    padding: 8px;
    font-size: 0.9rem;
  }

  .form-group label {
    font-size: 1rem;
  }

  .total {
    font-size: 1.3rem;
    margin: 15px 0;
  }
}

@media (max-height: 700px) {
  .card-preview {
    margin: 10px 0;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .card {
    padding: 15px;
  }
}
</style>