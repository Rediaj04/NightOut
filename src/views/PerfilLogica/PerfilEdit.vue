<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="perfil-container">
        <!-- Encabezado -->
        <div class="header">
          <ion-buttons slot="start" class="back-button mobile-only">
            <ion-back-button default-href="/NightOut/Perfil"></ion-back-button>
          </ion-buttons>
          <h2 class="titulo">Editar perfil</h2>
          <button class="save-btn" @click="handleSave">Guardar</button>
        </div>

        <!-- Imagen de perfil -->
        <div class="profile-image-container" @click="openImageViewer([profileImageSrc])">
          <img :src="profileImageSrc" alt="Foto de perfil" class="profile-image">
        </div>
        <p class="edit-photo">Editar foto</p>

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
        <div class="options-container">
          <p class="option">Agregar enlace</p>
          <p class="option">Agregar discoteca</p>
        </div>

        <!-- Sección de música -->
        <div class="music-section">
          <div class="music-content">
            <p class="music-text">
              <span class="music-label">Música: </span>
              <span class="song-info">Progreso - Eladio Carrion</span>
            </p>
            <div class="music-line"></div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Image Viewer Modal -->
    <ImageViewer
      :is-open="isViewerOpen"
      :images="selectedImages"
      :initial-slide="0"
      @close="closeImageViewer"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import profileImageSrc from '@/assets/imagenes/example/balbaro77.png';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isViewerOpen = ref(false);
const selectedImages = ref<string[]>([]);

const openImageViewer = (images: string[]) => {
  selectedImages.value = images;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};

const handleSave = () => {
  router.push('/NightOut/Perfil');
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#perfil-container {
  text-align: center;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 20px;
  flex-shrink: 0;
}

.titulo {
  font-size: 1.5rem;
  font-weight: bold;
}

.profile-image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 15px auto 5px;
  border: 3px solid #ff9800;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
}

.profile-image-container:hover {
  transform: scale(1.05);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-photo {
  color: orange;
  font-size: 1rem;
  margin: 2px 0 10px;
  cursor: pointer;
  flex-shrink: 0;
}

.input-group {
  margin: 5px 0;
  flex-shrink: 0;
}

label {
  display: block;
  text-align: left;
  color: #bbb;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.input-field {
  width: 100%;
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #bbb;
  background: none;
  color: white;
  font-size: 1rem;
}

textarea.input-field {
  height: 40px;
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

.options-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin: 8px 0;
  padding-left: 20px;
  flex-shrink: 0;
}

.option {
  color: orange;
  font-size: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}

.music-section {
  margin-top: 5px;
  flex-shrink: 0;
  text-align: left;
  padding-left: 20px;
}

.music-content {
  display: inline-block;
}

.music-text {
  color: white;
  font-size: 1rem;
  margin: 0;
}

.music-label {
  color: orange;
}

.song-info {
  color: white;
}

.music-line {
  height: 1px;
  background-color: white;
  margin-top: 2px;
  width: 100%;
}

.back-button {
  display: none;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  #perfil-container {
    height: auto;
    padding: 10px;
  }

  .profile-image-container {
    width: 180px;
    height: 180px;
    margin: 10px auto 5px;
  }

  .input-group {
    margin: 8px 0;
  }

  .options-container {
    padding-left: 15px;
    margin: 5px 0;
  }

  .music-section {
    padding-left: 15px;
    margin-top: 3px;
  }
}

@media (max-width: 480px) {
  .profile-image-container {
    width: 160px;
    height: 160px;
  }
}
</style>
