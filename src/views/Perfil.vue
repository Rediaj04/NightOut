<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div id="reservar-container">
          <h1 class="title">Reservar</h1>
          <p class="subtitle">Reserva tu lugar en los mejores eventos</p>
          <!-- Aquí puedes agregar un formulario de reserva -->
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonContent, IonIcon } from '@ionic/vue';
  </script>
  
<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}
  #reservar-container {
    text-align: center;
    padding: 20px;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #ff007f;
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
</style>