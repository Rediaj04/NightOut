<template>
  <ion-page>
    <ion-content :fullscreen="true" color-scheme="light">
      <div id="login-form-container">
        <h1 class="title">NightOut</h1>
        <p class="subtitle">Discover the best parties near you</p>
        <img src="@/assets/imagenes/info/logo.png" alt="Logo" class="logo">
        
        <div class="input-container">
          <div class="input-wrapper">
            <ion-icon :icon="personOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="text" 
              v-model="username" 
              placeholder="USERNAME"
              class="custom-input">
            </ion-input>
          </div>
          
          <div class="input-wrapper">
            <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="password" 
              v-model="password" 
              placeholder="PASSWORD"
              class="custom-input">
            </ion-input>
          </div>
        </div>

        <ion-button class="login-button" router-link="/NightOut/Inicio">
          LOGIN
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
</script> 

<style scoped>
ion-content {
  --background: url("@/assets/imagenes/info/fondo.jpg") no-repeat center center / cover;
  --color-scheme: light;
}

#login-form-container {
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  padding: 20px;
  color: white;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #ff007f;
  text-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
  margin-bottom: 0; /* Reducido de 10px a 0 */
  letter-spacing: 1px;
}

.logo {
  width: 100px; 
  height: auto; 
  margin: 20px auto; /* Aumentado el margen superior e inferior */
  display: block;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px; /* Añadido un pequeño margen arriba */
  margin-bottom: 30px; /* Reducido de 50px a 30px */
}

.input-container {
  margin-bottom: 30px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  padding: 5px 0;
}

.input-icon {
  color: white;
  font-size: 1.5rem;
  margin-right: 10px;
}

.custom-input {
  --background: transparent;
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.7);
  --placeholder-opacity: 1;
  --padding-start: 0;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.login-button {
  --background: linear-gradient(90deg, #640134, #180A51);
  --color: white;
  --border-color: #4D4DFF;
  --border-style: solid;
  --border-width: 2px;
  --border-radius: 25px;
  --padding-top: 20px;
  --padding-bottom: 20px;
  width: 100%;
  margin-top: 20px;
  font-size: 1.2rem;
  letter-spacing: 2px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Eliminar bordes y fondos por defecto de Ionic */
ion-input {
  --border-style: none;
  --highlight-height: 0;
}

/* Asegurar que el contenido esté centrado verticalmente */
:host {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>