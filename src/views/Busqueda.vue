<template>
  <ion-page>
    <ion-content :fullscreen="true" class="busqueda-content">
      <div class="search-container">
        <ion-icon :icon="arrowBack" class="back-icon" @click="goBack" />
        <div class="search-bar">
          <ion-input v-model="searchQuery" placeholder="Buscar..." class="search-input"></ion-input>
        </div>
      </div>

      <div class="recent-section">
        <h2 class="recent-title">Recientes</h2>
        <ul class="recent-list">
          <li v-for="(item, index) in recentItems" :key="item.id" class="recent-item">
            <img :src="item.image" class="item-icon" alt="logo" />
            <span class="item-name clickable" @click="goToDetails(item.id)">{{ item.name }}</span>
            <ion-icon :icon="close" class="close-icon" @click.stop="removeItem(index)" />
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue';
import { arrowBack, close } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { usePostsStore } from '../components/stores/posts'; 

const router = useRouter();
const searchQuery = ref('');
const postsStore = usePostsStore();

const recentItems = computed(() => postsStore.recentItems);

const goBack = () => {
  router.back();
};

const removeItem = (index: number) => {
  postsStore.removeRecentItem(index);
};

const goToDetails = (id: number) => {
  router.push({ name: 'Details', params: { id: id.toString() } });
};
</script>


<style scoped>

ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}
/* Contenedor de toda la pantalla */
.busqueda-content {
  background: linear-gradient(to bottom, #2B003A, #100011);
  color: white;
  min-height: 100vh;
  padding: 20px 20px 80px 20px; /* Aumentado el padding inferior a 80px */
  display: flex;
  flex-direction: column;
  gap: 20px;
}


/* Contenedor del icono de retroceso y el buscador */
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 16px; /* Añadido padding horizontal */
  margin-top: 12px; /* Añadido margen superior */
}

/* Botón de retroceso */
.back-icon {
  color: white;
  font-size: 28px;
  cursor: pointer;
  margin-right: 12px;
}

/* Barra de búsqueda */
.search-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 14px;
  border-radius: 12px;
  margin: 0 8px; /* Ajustado el margen horizontal */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding-left: 10px;
}

/* Sección de recientes */
.recent-section {
  padding: 10px 0;
  margin: 0 10px;
  margin-bottom: 60px; /* Añadido margen inferior */
  overflow-y: auto; /* Permite scroll si el contenido es muy largo */
  flex: 1; /* Permite que la sección ocupe el espacio disponible */
}

.recent-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}

/* Lista de elementos recientes */
.recent-list {
  list-style: none;
  padding: 0;
  padding-bottom: 20px; /* Añadido padding inferior a la lista */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recent-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Mejor visual */
}

.item-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 12px;
}

.item-name.clickable {
  flex: 1;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.item-name.clickable:hover {
  color: #FF007F;
}

.close-icon {
  color: white;
  font-size: 22px;
  cursor: pointer;
}
</style>

