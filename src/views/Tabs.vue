<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    
    <!-- Barra de tabs móvil -->
    <ion-tab-bar slot="bottom" class="mobile-tabs">
      <ion-tab-button tab="Inicio" href="/NightOut/Inicio">
        <ion-icon aria-hidden="true" :icon="home" />
        <ion-label>Inicio</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="Busqueda" href="/NightOut/Busqueda">
        <ion-icon aria-hidden="true" :icon="search" />
        <ion-label>Búsqueda</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="CrearReserva" href="/NightOut/CrearReserva">
        <ion-icon aria-hidden="true" :icon="add" />
        <ion-label>Añadir</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="Reservas" href="/NightOut/Reservas">
        <ion-icon aria-hidden="true" :icon="bookmark" />
        <ion-label>Reservas</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="Perfil" href="/NightOut/Perfil">
        <ion-icon aria-hidden="true" :icon="people" />
        <ion-label>Perfil</ion-label>
      </ion-tab-button>
    </ion-tab-bar>

    <!-- Barra lateral desktop -->
    <div class="desktop-sidebar">
      <h1 class="neon-title">NightOut</h1>
      <nav class="nav-menu">
        <router-link to="/NightOut/Inicio" class="nav-item" active-class="active">
          <ion-icon :icon="home"></ion-icon>
          <span>Inicio</span>
        </router-link>

        <router-link to="/NightOut/Busqueda" class="nav-item" active-class="active">
          <ion-icon :icon="search"></ion-icon>
          <span>Búsqueda</span>
        </router-link>

        <router-link to="/NightOut/CrearReserva" class="nav-item" active-class="active">
          <ion-icon :icon="add"></ion-icon>
          <span>Crear reserva</span>
        </router-link>

        <router-link to="/NightOut/Reservas" class="nav-item" active-class="active">
          <ion-icon :icon="bookmark"></ion-icon>
          <span>Mis reservas</span>
        </router-link>

        <router-link to="/NightOut/Perfil" class="nav-item" active-class="active">
          <ion-icon :icon="people"></ion-icon>
          <span>Perfil</span>
        </router-link>
      </nav>
      <div class="logout-button" @click="handleLogout">
        <ion-icon :icon="logOut"></ion-icon>
        <span>Cerrar sesión</span>
      </div>
    </div>
  </ion-tabs>
</template>

<script setup lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/vue';
import { home, search, add, bookmark, people, logOut } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  router.push('/Login');
};
</script>

<style scoped>
/* Estilos base para la barra de tabs móvil */
.mobile-tabs {
  background: linear-gradient(to bottom, #5A0D7F, #100011) !important;
  border-top: none !important;
}

ion-tab-button {
  background: transparent !important;
  --color: white;
  --color-selected: #ff007f;
  transition: all 0.2s ease;
}

ion-tab-button::part(native) {
  padding: 10px;
}

/* Efecto hover y seleccionado para tabs móviles */
ion-tab-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

ion-tab-button.tab-selected {
  ion-icon, ion-label {
    color: #ff007f !important;
    font-weight: bold;
  }
}

/* Estilos para la barra lateral desktop */
.desktop-sidebar {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: rgba(43, 0, 58, 0.95);
  padding: 20px;
  flex-direction: column;
}

.neon-title {
  font-size: 2rem;
  color: #ff007f;
  text-shadow: 0 0 10px #ff007f;
  margin-bottom: 40px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  color: #ff007f;
  font-weight: bold;
}

.nav-item ion-icon {
  font-size: 24px;
}

.logout-button {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease;
}

.logout-button:hover {
  color: #ff007f;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

/* Media queries para desktop */
@media (min-width: 769px) {
  .mobile-tabs {
    display: none !important;
  }

  .desktop-sidebar {
    display: flex;
  }

  ion-router-outlet {
    margin-left: 240px;
  }
}
</style>
  
  