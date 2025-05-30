<script setup lang="ts">
import { type Profile, profile } from '@/models/profile.ts'
import { mockHackathons } from '@/models/hackathons.ts'
import { ref } from 'vue'
import HackathonProfileCard from '@/components/HackathonProfileCard.vue'
import HeaderView from '@/components/HeaderView.vue'

const profileSaved = ref<Profile>(profile)
const currentHack = mockHackathons[0]
const activeTab = ref('info')

// Для анимации фона
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX / window.innerWidth
  mouseY.value = e.clientY / window.innerHeight
}
</script>

<template>
  <div
    class="profile-page"
    @mousemove="handleMouseMove"
    :style="{
      '--mouse-x': mouseX,
      '--mouse-y': mouseY,
    }"
  >
    <header class="header">
      <HeaderView />
    </header>

    <div class="profile-container">
      <!-- Боковая панель профиля -->
      <div class="profile-sidebar">
        <div class="avatar-container">
          <div class="avatar-glow"></div>
          <img
            :src="profileSaved.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'"
            alt="Avatar"
            class="avatar"
          />
        </div>

        <h2 class="username">{{ profileSaved.name }}</h2>
        <p class="user-title">{{ profileSaved.title || 'Fullstack Developer' }}</p>

        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">{{ profileSaved.completedHackathons || 12 }}</span>
            <span class="stat-label">Хакатонов</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ profileSaved.rating || 4.8 }}</span>
            <span class="stat-label">Рейтинг</span>
          </div>
        </div>

        <div class="tags">
          <span v-for="(tag, index) in profileSaved.skills" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Основное содержимое -->
      <div class="profile-content">
        <div class="tabs">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'info' }"
            @click="activeTab = 'info'"
          >
            Личные данные
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'hackathons' }"
            @click="activeTab = 'hackathons'"
          >
            Мои хакатоны
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'settings' }"
            @click="activeTab = 'settings'"
          >
            Настройки
          </button>
        </div>

        <div class="tab-content" v-if="activeTab === 'info'">
          <div class="info-card">
            <h3 class="info-title">Основная информация</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Имя</label>
                <input type="text" v-model="profileSaved.name" />
              </div>
              <div class="info-item">
                <label>Email</label>
                <input type="email" v-model="profileSaved.email" />
              </div>
              <div class="info-item">
                <label>Телефон</label>
                <input type="tel" v-model="profileSaved.phone" />
              </div>
              <div class="info-item">
                <label>Город</label>
                <input type="text" v-model="profileSaved.location" />
              </div>
              <div class="info-item full-width">
                <label>О себе</label>
                <textarea v-model="profileSaved.bio"></textarea>
              </div>
            </div>
            <button class="save-button">Сохранить изменения</button>
          </div>
        </div>

        <div class="tab-content" v-if="activeTab === 'hackathons'">
          <h3 class="section-title">Текущие хакатоны</h3>
          <div class="hackathons-grid">
            <HackathonProfileCard
              v-for="hackathon in mockHackathons.slice(0, 3)"
              :key="hackathon.id"
              :hackathon="hackathon"
            />
          </div>

          <h3 class="section-title">Прошлые участия</h3>
          <div class="hackathons-grid">
            <HackathonProfileCard
              v-for="hackathon in mockHackathons.slice(3)"
              :key="hackathon.id"
              :hackathon="hackathon"
              past
            />
          </div>
        </div>

        <div class="tab-content" v-if="activeTab === 'settings'">
          <div class="settings-card">
            <h3>Настройки аккаунта</h3>
            <div class="settings-item">
              <label>Тема</label>
              <select>
                <option>Тёмная</option>
                <option>Светлая</option>
                <option>Системная</option>
              </select>
            </div>
            <div class="settings-item">
              <label>Уведомления</label>
              <div class="switches">
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider"></span>
                  <span>Email уведомления</span>
                </label>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider"></span>
                  <span>Push уведомления</span>
                </label>
              </div>
            </div>
            <button class="logout-button">Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Анимированный фон -->
    <div class="background-effects">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="gradient-circle"></div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: 'Unbounded', sans-serif;
}

.profile-container {
  display: flex;
  max-width: 1400px;
  margin: clamp(1rem, 3vw, 2rem) auto;
  padding: 0 clamp(1rem, 3vw, 2rem);
  gap: clamp(1rem, 3vw, 2rem);
  position: relative;
  z-index: 2;
  font-family: 'Unbounded', sans-serif;
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }
}

.profile-sidebar {
  width: clamp(280px, 30vw, 300px);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 0 15px rgba(147, 112, 219, 0.3);
  align-self: flex-start;
}

@media (max-width: 768px) {
  .profile-sidebar {
    width: 100%;
    margin-bottom: 1rem;
  }
}

.avatar-container {
  position: relative;
  width: clamp(100px, 15vw, 120px);
  height: clamp(100px, 15vw, 120px);
  margin: 0 auto clamp(1rem, 2vw, 1.5rem);
}

.avatar-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(147, 112, 219, 0.5) 0%, transparent 70%);
  animation: pulse 3s infinite;
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.5);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #ff00ff, #00f0ff);
  background-clip: border-box;
  -webkit-background-clip: border-box;
  position: relative;
}

.username {
  text-align: center;
  margin: 0 0 0.5rem;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.user-title {
  text-align: center;
  color: #a0a0a0;
  font-size: clamp(0.9rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: clamp(1rem, 2vw, 1.5rem) 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  color: #00f0ff;
}

.stat-label {
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: #a0a0a0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1vw, 0.8rem);
  margin-top: clamp(1rem, 2vw, 1.5rem);
}

.tag {
  background: rgba(147, 112, 219, 0.2);
  padding: clamp(0.3rem, 1vw, 0.5rem) clamp(0.8rem, 1.5vw, 1rem);
  border-radius: 20px;
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: #00f0ff;
  border: 1px solid rgba(147, 112, 219, 0.3);
}

.profile-content {
  flex: 1;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 0 15px rgba(147, 112, 219, 0.3);
}

.tabs {
  display: flex;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 5px;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: clamp(0.8rem, 1.5vw, 1rem) clamp(1.2rem, 2vw, 1.5rem);
  background: rgba(147, 112, 219, 0.1);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  white-space: nowrap;
}

.tab-button.active {
  background: linear-gradient(45deg, #ff00ff, #00f0ff);
  transform: translateY(-2px);
}

.info-card,
.settings-card {
  background: rgba(147, 112, 219, 0.1);
  border-radius: 15px;
  padding: clamp(1.5rem, 3vw, 2rem);
}

.info-title {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  color: #00f0ff;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #a0a0a0;
}

.info-item input,
.info-item textarea {
  padding: clamp(0.8rem, 1.5vw, 1rem);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-radius: 8px;
  color: white;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.info-item textarea {
  min-height: 100px;
  resize: vertical;
}

.save-button,
.logout-button {
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding: clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  background: linear-gradient(45deg, #ff00ff, #00f0ff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.save-button:hover,
.logout-button:hover {
  transform: translateY(-2px);
}

.logout-button {
  background: rgba(255, 0, 0, 0.3);
  width: 100%;
}

.hackathons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.section-title {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  color: #00f0ff;
}

.settings-item {
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.settings-item label {
  display: block;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #a0a0a0;
  margin-bottom: 0.5rem;
}

.settings-item select {
  width: 100%;
  padding: clamp(0.8rem, 1.5vw, 1rem);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(147, 112, 219, 0.3);
  border-radius: 8px;
  color: white;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.switches {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switch {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.switch input {
  display: none;
}

.slider {
  position: relative;
  width: 50px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 13px;
  transition: 0.3s;
}

.slider:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 3px;
  left: 3px;
  transition: 0.3s;
}

.switch input:checked + .slider {
  background: linear-gradient(45deg, #ff00ff, #00f0ff);
}

.switch input:checked + .slider:before {
  transform: translateX(24px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

/* Анимации и эффекты */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(147, 112, 219, 0.1);
  border-radius: 50%;
  animation: float 15s infinite linear;
  box-shadow: 0 0 15px rgba(147, 112, 219, 0.3);
}

.particle:nth-child(1) {
  width: 300px;
  height: 300px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  width: 200px;
  height: 200px;
  top: 60%;
  left: 70%;
  animation-delay: 5s;
}

.particle:nth-child(3) {
  width: 150px;
  height: 150px;
  top: 80%;
  left: 30%;
  animation-delay: 10s;
}

.gradient-circle {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(147, 112, 219, 0.15) 0%, transparent 70%);
  top: calc(var(--mouse-y, 0.5) * 100px);
  left: calc(var(--mouse-x, 0.5) * 100px);
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.3);
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .profile-container {
    flex-direction: column;
  }

  .profile-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-item.full-width {
    grid-column: span 1;
  }
}
</style>
