<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="perfil-container">
        <div class="profile-header">
          <div class="profile-image-container clickable" @click="openImageViewer([profileImage])">
            <img :src="profileImage" alt="Foto de perfil" class="profile-image">
          </div>
          <div class="profile-info">
            <div class="profile-bio">
              <p class="username">Daniculb77</p>
              <p class="bio">Sin fiesta, no hay vida.</p>
              <button class="edit-profile-btn" @click="goToCalendar">
                <ion-icon :icon="createOutline"></ion-icon>
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        <div class="profile-stats">
          <div class="stat">
            <ion-icon :icon="peopleOutline" class="stat-icon"></ion-icon>
            <span class="stat-number">58</span>
            <span class="stat-label">Siguiendo</span>
          </div>
          <div class="stat">
            <ion-icon :icon="heartOutline" class="stat-icon"></ion-icon>
            <span class="stat-number">72</span>
            <span class="stat-label">Me gusta</span>
          </div>
          <div class="stat">
            <ion-icon :icon="musicalNotesOutline" class="stat-icon"></ion-icon>
            <span class="stat-number">15</span>
            <span class="stat-label">Discotecas visitadas</span>
          </div>
        </div>

        <div class="saved-places">
          <h2 class="subtitle">Discotecas guardadas</h2>
          <div class="places-grid">
            <div v-for="post in savedPosts" :key="post.id" class="place-card" @click="goToDetails(post.id)">
              <img :src="post.images[0]" :alt="post.name" class="place-image">
              <div class="place-name">{{ post.name }}</div>
            </div>
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
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { 
  peopleOutline, 
  heartOutline, 
  musicalNotesOutline, 
  createOutline,
  heart,
  bookmarkOutline,
  bookmarkSharp
} from 'ionicons/icons';
import { usePostsStore } from '@/components/stores/posts';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import ImageViewer from '@/components/ImageViewer/ImageViewer.vue';
import profileImageSrc from '@/assets/imagenes/example/balbaro77.png';

const profileImage = profileImageSrc; // Usar la imagen importada
const router = useRouter();
const postsStore = usePostsStore();
const isViewerOpen = ref(false);
const selectedImages = ref<string[]>([]);

const savedPosts = computed(() => {
  return postsStore.posts.slice(0, 4);
});

const goToDetails = (id: number) => {
  router.push({ name: 'Details', params: { id: id.toString() } });
};

const goToCalendar = () => {
  router.push('/NightOut/PerfilEdit');
};

const openImageViewer = (images: string[]) => {
  selectedImages.value = images;
  isViewerOpen.value = true;
};

const closeImageViewer = () => {
  isViewerOpen.value = false;
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#perfil-container {
  text-align: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  margin-bottom: 30px;
}

.profile-image-container {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ff007f;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.profile-image-container:hover {
  transform: scale(1.05);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex-grow: 1;
  text-align: left;
}

.profile-bio {
  margin-bottom: 10px;
}

.username {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 8px;
  font-weight: bold;
}

.bio {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 20px;
}

.edit-profile-btn {
  --background: linear-gradient(to right, #560C78, #180A51);
  --border-radius: 20px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --color: white;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
  border: 2px solid #4D4DFF;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-size: 14px;
  width: 100%;
  max-width: 250px;
}

.edit-profile-btn:hover,
.edit-profile-btn:active {
  --background: linear-gradient(to right, #230A34, #2C1D92);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(44, 29, 146, 0.5);
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon {
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 5px;
}

.stat-number {
  font-size: 1.3rem;
  color: #ff007f;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9rem;
  color: #fff;
}

.saved-places {
  margin-bottom: 30px;
}

.subtitle {
  font-size: 1.2rem;
  color: #ff007f;
  margin-bottom: 15px;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 10px;
}

.place-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transform-origin: center;
  transition: transform 0.3s ease;
  z-index: 1;
}

.place-card:hover {
  transform: scale(1.05);
  z-index: 2;
}

.place-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  font-size: 0.9rem;
  text-align: left;
}

@media (max-width: 1024px) {
  #perfil-container {
    padding: 15px;
  }
  
  .places-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .profile-image-container {
    width: 150px; /* Aumenta el tamaño de la imagen */
    height: 150px; /* Aumenta el tamaño de la imagen */
    margin: 0 auto;
  }

  .profile-info {
    text-align: center;
  }

  .username {
    font-size: 1.8rem;
  }

  .bio {
    font-size: 1.1rem;
  }

  .profile-bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .places-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .profile-stats {
    flex-wrap: wrap;
    gap: 15px;
  }

  .stat {
    flex: 1 1 30%;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  #perfil-container {
    padding: 10px;
  }

  .profile-image-container {
    width: 130px; /* Aumenta el tamaño de la imagen */
    height: 130px; /* Aumenta el tamaño de la imagen */
  }

  .username {
    font-size: 1.5rem;
  }

  .bio {
    font-size: 1rem;
  }

  .stat-icon {
    font-size: 1.2rem;
  }

  .stat-number {
    font-size: 1.1rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .edit-profile-btn {
    --padding-top: 20px;
    --padding-bottom: 20px;
    font-size: 18px;
    max-width: 300px;
    margin: 20px auto;
  }
}
</style>