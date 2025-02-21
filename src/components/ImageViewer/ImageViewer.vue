<template>
  <div v-if="isOpen" class="image-viewer-overlay" @click="closeViewer">
    <div class="image-viewer-content" @click.stop>
      <ion-icon 
        class="close-button" 
        :icon="closeOutline" 
        @click="closeViewer"
      ></ion-icon>
      
      <swiper
        class="fullscreen-swiper"
        :modules="[SwiperNavigation, SwiperPagination]"
        :pagination="{ clickable: true }"
        :navigation="true"
        :initial-slide="initialSlide"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" class="fullscreen-image" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

defineProps<{
  isOpen: boolean;
  images: string[];
  initialSlide: number;
}>();

const emit = defineEmits(['close']);

const closeViewer = () => {
  emit('close');
};
</script>

<style scoped>
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease;
}

.image-viewer-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 32px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.2s ease;
}

.close-button:hover {
  transform: scale(1.1);
}

.fullscreen-swiper {
  width: 100%;
  height: 100%;
}

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
}

:deep(.swiper-pagination-bullet) {
  background: white;
}

:deep(.swiper-pagination-bullet-active) {
  background: #ff007f;
}
</style> 