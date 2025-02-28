<template>
  <ion-page>
    <ion-content :fullscreen="true" color-scheme="light">
      <div id="login-form-container">
        <h1 class="title">NightOut</h1>
        <p class="subtitle">Discover the best parties near you</p>
        <img src="@/assets/imagenes/info/logo.png" alt="Logo" class="logo">
        
        <h2 class="forgot-title">¿Olvidaste tu contraseña?</h2>
        <p class="create-password-text">CREA UNA CONTRASEÑA</p>

        <div class="input-container">
          <div class="input-wrapper">
            <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="password" 
              placeholder="New Password"
              class="custom-input">
            </ion-input>
          </div>

          <div class="input-wrapper">
            <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="password" 
              placeholder="Confirmation"
              class="custom-input">
            </ion-input>
          </div>
        </div>

        <ion-button class="login-button" router-link="/Login">
          LISTO
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { lockClosedOutline } from 'ionicons/icons';
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
  margin-bottom: 0;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px;
  margin-bottom: 15px;
}

.logo {
  width: 80px;
  height: auto;
  margin: 10px auto;
  display: block;
}

.forgot-title {
  font-size: 1.8rem;
  color: white;
  margin: 30px 0 10px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.create-password-text {
  font-size: 1.2rem;
  color: #ff007f;
  margin: 20px 0;
  font-weight: bold;
  letter-spacing: 1px;
}

.input-container {
  margin: 30px 0;
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

ion-input {
  --border-style: none;
  --highlight-height: 0;
}

:host {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Ajustes responsive */
@media (max-height: 700px) {
  .title {
    font-size: 2.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .logo {
    width: 60px;
    margin: 5px auto;
  }

  .forgot-title {
    font-size: 1.5rem;
    margin: 20px 0 5px;
  }

  .create-password-text {
    font-size: 1rem;
    margin: 15px 0;
  }

  .input-wrapper {
    margin-bottom: 15px;
  }
}
</style>
