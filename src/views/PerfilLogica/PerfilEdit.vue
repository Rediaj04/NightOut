<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="perfil-container">
        <!-- Encabezado -->
        <div class="header">
          <ion-buttons slot="start" class="back-button">
            <ion-back-button default-href="/NightOut/Perfil"></ion-back-button>
          </ion-buttons>
          <h2 class="titulo">Editar perfil</h2>
          <button class="save-btn">Guardar</button>
        </div>

        <!-- Imagen de perfil -->
        <div class="profile-image-container">
          <img src="" alt="Foto de perfil" class="profile-image">
          <p class="edit-photo">Editar foto</p>
        </div>

        <!-- Campos de edición -->
        <div class="input-group">
          <label>Nombre</label>
          <input type="text" placeholder="Daniel" class="input-field"/>
        </div>

        <div class="input-group">
          <label>Nombre de usuario</label>
          <input type="text" placeholder="DaniClub77" class="input-field"/>
        </div>

        <div class="input-group">
          <label>Presentación</label>
          <textarea placeholder="Sin fiesta, no hay vida." class="input-field"></textarea>
        </div>

        <!-- Opciones adicionales -->
        <p class="option">Agregar enlace</p>
        <p class="option">Agregar discoteca</p>

        <!-- Sección de música -->
        <div class="music-section">
          <h2 class="subtitle">Música</h2>
          <p class="music-text">Lgante klk sesión bzp</p>
          <hr class="music-line" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#perfil-container {
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 20px;
}

.titulo {
  font-size: 1.5rem;
  font-weight: bold;
}

.profile-image-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px auto;
  border: 3px solid #ff9800;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-photo {
  color: orange;
  font-size: 0.9rem;
  margin-top: 5px;
}

.input-group {
  margin: 10px 0;
}

label {
  display: block;
  text-align: left;
  color: #bbb;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bbb;
  background: none;
  color: white;
  font-size: 1rem;
}

textarea {
  height: 60px;
  resize: none;
}

.save-btn {
  background: linear-gradient(to right, #560C78, #180A51);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
}

.option {
  color: orange;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}

.music-section {
  margin-top: 20px;
}

.subtitle {
  color: orange;
  font-size: 1.2rem;
}

.music-text {
  color: white;
  font-size: 1rem;
}

.music-line {
  border: none;
  border-top: 1px solid white;
  margin-top: 5px;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}

ion-back-button {
  --color: #ff007f;
}
</style>
