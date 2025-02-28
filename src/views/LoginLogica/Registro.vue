<template>
  <ion-page>
    <ion-content :fullscreen="true" color-scheme="light">
      <div id="login-form-container">
        <h1 class="title">NightOut</h1>
        <p class="subtitle">Discover the best parties near you</p>
        <img src="@/assets/imagenes/info/logo.png" alt="Logo" class="logo">
        
        <!-- Imagen de perfil circular con click para expandir -->
        <div class="profile-image-container" @click="openImageViewer">
          <img src="@/assets/imagenes/example/balbaro77.png" alt="Profile" class="profile-image clickable">
          <div class="add-photo-icon">+</div>
        </div>

        <div class="input-container">
          <div class="input-wrapper">
            <ion-icon :icon="personOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="text" 
              placeholder="USERNAME"
              class="custom-input">
            </ion-input>
          </div>
          
          <div class="input-wrapper">
            <ion-icon :icon="mailOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="email" 
              placeholder="EMAIL"
              class="custom-input">
            </ion-input>
          </div>

          <div class="input-wrapper">
            <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
            <ion-input 
              type="password" 
              placeholder="PASSWORD"
              class="custom-input">
            </ion-input>
          </div>
        </div>

        <ion-button class="login-button" @click="handleSignUp">
          SIGN UP
        </ion-button>
      </div>
    </ion-content>

    <!-- Image Viewer Modal -->
    <ImageViewer
      :is-open="isViewerOpen"
      :images="[profileImage]"
      :initial-slide="0"
      @close="closeImageViewer"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variables para el visor de imágenes
const isViewerOpen = ref(false);
const profileImage = ref(new URL('@/assets/imagenes/example/balbaro77.png', import.meta.url).href);

// Funciones para el visor de imágenes
const openImageViewer = () => {
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};

// Función para manejar el registro
const handleSignUp = async () => {
  try {
    // Aquí iría la lógica de registro cuando la implementes
    
    // Navegación programática
    await router.push('/NightOut/Inicio');
    
    // Forzar recarga del componente si es necesario
    window.location.reload();
  } catch (error) {
    console.error('Error durante la navegación:', error);
  }
};
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

.profile-image-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 20px auto;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.profile-image-container:hover {
  transform: scale(1.02);
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff007f;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
  transition: opacity 0.2s ease;
}

.profile-image:hover {
  opacity: 0.9;
}

.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.clickable:hover {
  opacity: 0.8;
}

.add-photo-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 35px;
  height: 35px;
  background-color: #ff007f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.input-container {
  margin: 20px 0;
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

  .profile-image-container {
    width: 120px;
    height: 120px;
    margin: 15px auto;
  }

  .input-wrapper {
    margin-bottom: 15px;
  }
}
</style>
