<template>
  <ion-page>
    <ion-content :fullscreen="true" color-scheme="light">
      <div id="login-container">
          <h1 class="title">NightOut</h1>
          <p class="subtitle">Discover the best parties near you</p>
          <img src="@/assets/imagenes/info/logo.png" alt="Logo" class="logo">
          <ion-button class="auth-button" router-link="/Login/Sesion">LOGIN</ion-button>
          <ion-button class="auth-button">SIGN UP</ion-button>
          <a href="Reservar" class="forgot-password">He olvidado mi contraseña</a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';

</script>

<style scoped>
ion-content {
  --background: url("@/assets/imagenes/info/fondo.jpg") no-repeat center center / cover;
  --color-scheme: light;
}

.logo {
  width: 150px; 
  height: auto; 
  margin-bottom: 20px; 
  display: block; 
  margin-left: auto;
  margin-right: auto;
}

#login-container {
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
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #ff007f;
  text-shadow: 0px 0px 15px #ff007f;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.auth-button {
  --background: linear-gradient(90deg, #640134, #180A51);
  --color: white;
  --border-color: #4D4DFF;
  --border-style: solid;
  --border-width: 2px;
  width: 100%;
  height: auto;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  --border-radius: 25px;
  margin: 0px 0;
  --box-shadow: none;
}

.forgot-password {
  display: inline-block;
  margin-top: 15px;
  font-size: 0.9rem;
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid white;
  padding-bottom: 2px;
}
</style>

