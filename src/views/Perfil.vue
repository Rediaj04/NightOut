<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="perfil-container">
        <h1 class="title">Mi perfil</h1>
        <div class="profile-info">
          <div class="profile-stats">
            <div class="stat">
              <span class="stat-number">58</span>
              <span class="stat-label">Siguiendo</span>
            </div>
            <div class="stat">
              <span class="stat-number">72</span>
              <span class="stat-label">Me gusta</span>
            </div>
            <div class="stat">
              <span class="stat-number">15</span>
              <span class="stat-label">Discotecas visitadas</span>
            </div>
          </div>
          <div class="profile-bio">
            <p class="username">Daniculb77</p>
            <p class="bio">Sin fiesta, no hay vida.</p>
          </div>
        </div>
        <div class="saved-places">
          <h2 class="subtitle">Discotecas guardadas</h2>
          <ul class="places-list">
            <li>Dulcinea MD</li>
            <li>Otto Zutz</li>
            <li>TIPOD</li>
            <li>Ocean</li>
            <li>Taboo Night</li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to bottom, #2B003A, #100011) !important;
}

#perfil-container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 20px;
}

.profile-info {
  margin-bottom: 30px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  color: #ff007f;
}

.stat-label {
  font-size: 0.9rem;
  color: #fff;
}

.profile-bio {
  margin-bottom: 20px;
}

.username {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 5px;
}

.bio {
  font-size: 1rem;
  color: #ccc;
}

.saved-places {
  margin-bottom: 30px;
}

.subtitle {
  font-size: 1.2rem;
  color: #ff007f;
  margin-bottom: 15px;
}

.places-list {
  list-style: none;
  padding: 0;
}

.places-list li {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
}
</style>