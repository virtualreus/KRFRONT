<script setup lang="ts">
import { mainHackathons, mockHackathons } from '@/models/hackathons.ts'
import HackathonCard from '@/components/HackathonCard.vue'
import { ref, onMounted } from 'vue'
import HackathonCardMain from '@/components/HackathonCardMain.vue'
import HeaderView from '@/components/HeaderView.vue'
import { RouterLink } from 'vue-router'

const videoPlayer = ref<HTMLVideoElement | null>(null)

// Автовоспроизведение с обработкой ошибок
onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.muted = true
    videoPlayer.value.play().catch((err) => console.error('Autoplay error:', err))
  }
})
</script>

<template>
  <header class="header">
    <HeaderView />
  </header>
  <div class="neon-circle"></div>
  <div class="hackathons">
    <div class="video-container">
      <video
        ref="videoPlayer"
        class="picture-bg"
        src="@/assets/img/video-bg.mp4"
        autoplay
        loop
        playsinline
        preload="true"
      ></video>
      <RouterLink to="/hackathon" class="video-button"> Перейти в хакатон </RouterLink>
    </div>

    <div class="main_events">
      <div class="neon-circle neon-main"></div>
      <h1 class="gradient-text">ГЛАВНЫЕ СОБЫТИЯ</h1>
      <div class="main-flex">
        <hackathon-card-main :hackathon="mainHackathons[0]" style="background: #ef0fef" />
        <hackathon-card-main :hackathon="mainHackathons[1]" style="background: #7a77ef" />
      </div>
      <div class="secondary-flex">
        <hackathon-card v-for="hackathon in mockHackathons" :hackathon="hackathon"></hackathon-card>
        <div class="neon-circle neon-bottom"></div>
      </div>
      <div class="neon-circle"></div>
    </div>
  </div>
</template>

<style>
.hackathons {
  width: 90%;
  max-width: 1400px;
  margin: auto;
  border-radius: 10px;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .hackathons {
    width: 95%;
    padding: 0 10px;
  }
}

.hackathons__title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 20px;
}

.picture-bg {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.video-container {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
}

.video-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px);
  background: #706cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  font-family: 'Unbounded', sans-serif;
  white-space: nowrap;
}

.video-button:hover {
  background: #5c58df;
  transform: translate(-50%, -50%) scale(1.05);
}

.neon-circle {
  position: absolute;
  top: 2%;
  right: 0;
  width: min(600px, 80vw);
  height: min(600px, 80vw);
  border-radius: 50%;
  background: #0ff;
  filter: blur(100px);
  z-index: -1;
  opacity: 0.4;
  animation: pulse 5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.2;
  }
}

.neon-main {
  top: 0;
  left: -250px;
  width: min(1000px, 100vw);
  height: min(1000px, 100vw);
  background: #ff00ff;
}

.neon-bottom {
  bottom: 0;
  right: 0;
  background: #4800ff;
}

.main_events {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.gradient-text {
  text-align: center;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  background: linear-gradient(45deg, #0ff, #ff00ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: 'Unbounded', sans-serif;
  margin-bottom: clamp(20px, 4vw, 40px);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;
}

.gradient-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  color: transparent;
  background: linear-gradient(45deg, #0ff, #ff00ff);
  filter: blur(15px);
  opacity: 0.7;
}

.main-flex {
  gap: clamp(10px, 2vw, 16px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: clamp(20px, 4vw, 40px);
}

@media (max-width: 768px) {
  .main-flex {
    grid-template-columns: 1fr;
  }
}

.secondary-flex {
  gap: clamp(10px, 2vw, 16px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
}

@media (max-width: 1200px) {
  .secondary-flex {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .secondary-flex {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .secondary-flex {
    grid-template-columns: 1fr;
  }
}
</style>
