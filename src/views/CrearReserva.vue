<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div class="map-container">
          <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <l-tile-layer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              :attribution="attribution"
              layer-type="base"
              name="Stadia Dark"
            ></l-tile-layer>
            <l-marker
              v-if="userLocation"
              :lat-lng="userLocation"
              :icon="userIcon"
            >
              <l-popup>Tu ubicación actual</l-popup>
            </l-marker>
            <l-marker
              v-for="post in posts"
              :key="post.id"
              :lat-lng="post.coordinates"
              :icon="clubIcon"
            >
              <l-popup>
                <div class="popup-content">
                  <img :src="post.profileImage" class="popup-image" />
                  <h3>{{ post.name }}</h3>
                  <p>{{ post.location }}</p>
                  <ion-button 
                    class="reserve-btn"
                    @click="goToDetails(post.id)"
                  >
                    RESERVAR
                  </ion-button>                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonButton } from '@ionic/vue';
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
  import { useRouter } from 'vue-router';
  import { usePostsStore } from '@/components/stores/posts';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';

  const router = useRouter();
  const postsStore = usePostsStore();
  const posts = postsStore.posts;

  // Corregir el problema de los iconos de Leaflet
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  });

  // Estado del mapa
  const zoom = ref(14);
  const center = ref<[number, number]>([41.455651, 2.201304]); // Barcelona
  const userLocation = ref<[number, number] | null>(null);
  const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>';

  // Iconos personalizados
  const userIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const clubIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Navegación a detalles
  const goToDetails = (id: number) => {
    router.push({ name: 'Details', params: { id: id.toString() } });
  };

  // Obtener la ubicación del usuario
  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.value = [latitude, longitude];
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  });
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

  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :deep(.leaflet-container) {
    width: 100%;
    height: 100%;
    z-index: 1;
    background: #242424 !important;
  }

  /* Personalización de controles del mapa */
  :deep(.leaflet-control-zoom) {
    border: none !important;
    margin: 15px !important;
  }

  :deep(.leaflet-control-zoom-in),
  :deep(.leaflet-control-zoom-out) {
    background: rgba(43, 0, 58, 0.9) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }

  :deep(.leaflet-control-zoom-in:hover),
  :deep(.leaflet-control-zoom-out:hover) {
    background: rgba(43, 0, 58, 1) !important;
  }

  :deep(.leaflet-popup-content-wrapper) {
    background: rgba(43, 0, 58, 0.9);
    color: white;
  }

  :deep(.leaflet-popup-tip) {
    background: rgba(43, 0, 58, 0.9);
  }

  :deep(.leaflet-bar) {
    border: none !important;
  }

  .reserve-btn {
    --background: linear-gradient(to right, #560C78, #180A51);
    --border-radius: 20px;
    --padding-top: 8px;
    --padding-bottom: 8px;
    --padding-start: 16px;
    --padding-end: 16px;
    --color: white;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    border: 2px solid #4D4DFF;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    transition: all 0.3s ease;
    border-radius: 20px !important;
  }

  .reserve-btn::part(native) {
    border-radius: 20px;
  }

  .reserve-btn:hover,
  .reserve-btn:active {
    --background: linear-gradient(to right, #230A34, #2C1D92);
    border-color: transparent;
    box-shadow: 0 0 15px rgba(44, 29, 146, 0.5);
  }

  :deep(.leaflet-control-attribution) {
    background: rgba(43, 0, 58, 0.8) !important;
    color: rgba(255, 255, 255, 0.7) !important;
  }

  :deep(.leaflet-control-attribution a) {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .popup-content {
    text-align: center;
    padding: 5px;
  }

  .popup-content .reserve-btn {
    margin: 8px 0 0 0;
    width: 100%;
  }

  .popup-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 8px;
  }

  :deep(.leaflet-popup-content-wrapper) {
    background: rgba(43, 0, 58, 0.95);
    color: white;
    border-radius: 10px;
    min-width: 200px;
    padding: 10px;
  }

  :deep(.leaflet-popup-content) {
    margin: 0;
    text-align: center;
    width: 100% !important;
  }

  .title {
    font-size: 1.5rem;
    color: white;
    text-align: center;
    margin: 10px 0;
  }

  /* Estilos base para móvil */
  .title-container {
    background: rgba(43, 0, 58, 0.7);
    backdrop-filter: blur(5px);
    padding: 5px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .neon-title {
    font-size: 1.2rem; /* Tamaño más pequeño para móvil */
    color: #ff007f;
    text-shadow: 0 0 10px #ff007f;
    text-align: center;
    margin: 3px 0;
  }

  .popup-content {
    text-align: center;
    padding: 5px;
    min-width: 200px; /* Ancho mínimo para móvil */
  }

  .popup-image {
    width: 40px; /* Más pequeño para móvil */
    height: 40px;
    border-radius: 50%;
    margin-bottom: 6px;
  }

  .popup-content h3 {
    font-size: 0.9rem;
    margin: 5px 0;
  }

  .popup-content p {
    font-size: 0.8rem;
    margin: 3px 0;
  }

  .reserve-btn {
    font-size: 12px; /* Más pequeño para móvil */
    padding: 6px 12px;
  }

  /* Tablet */
  @media (min-width: 768px) {
    .neon-title {
      font-size: 1.5rem;
    }

    .popup-content {
      min-width: 250px;
    }

    .popup-image {
      width: 50px;
      height: 50px;
    }

    .popup-content h3 {
      font-size: 1rem;
    }

    .popup-content p {
      font-size: 0.9rem;
    }

    .reserve-btn {
      font-size: 14px;
      padding: 8px 16px;
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .neon-title {
      font-size: 1.5rem;
      padding: 8px 0;
    }

    .popup-content {
      min-width: 300px;
      padding: 10px;
    }

    .popup-image {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
    }

    .popup-content h3 {
      font-size: 1.1rem;
      margin: 8px 0;
    }

    .popup-content p {
      font-size: 1rem;
      margin: 5px 0;
    }

    .reserve-btn {
      font-size: 14px;
      padding: 8px 20px;
    }

    :deep(.leaflet-control-zoom) {
      margin: 20px !important;
    }

    :deep(.leaflet-control-zoom-in),
    :deep(.leaflet-control-zoom-out) {
      width: 35px !important;
      height: 35px !important;
      line-height: 35px !important;
      font-size: 18px !important;
    }
  }

  /* Pantallas muy grandes */
  @media (min-width: 1440px) {
    .neon-title {
      font-size: 1.8rem;
    }

    .popup-content {
      min-width: 350px;
    }
  }

  /* Ajustes para pantallas pequeñas en modo landscape */
  @media (max-height: 500px) and (orientation: landscape) {
    .neon-title {
      font-size: 1rem;
      margin: 2px 0;
    }

    .title-container {
      padding: 2px;
    }

    .popup-content {
      padding: 3px;
    }

    .popup-image {
      width: 35px;
      height: 35px;
      margin-bottom: 4px;
    }
  }
</style>