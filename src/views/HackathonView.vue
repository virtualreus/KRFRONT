<template>
  <div class="hackathon-container">
    <header class="header">
      <HeaderView></HeaderView>
    </header>
    <div class="hero">
      <h1 class="hero-title">{{ hackathon.name }}</h1>
      <p class="hero-date">{{ hackathon.dates }}</p>
    </div>

    <div class="main-container">
      <div class="main-content">
        <!-- Team Status -->
        <div class="team-status">
          <p>Статус команды: {{ teamStatus }}</p>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button class="tab" :class="{ active: activeTab === 'team' }" @click="activeTab = 'team'">
            Команда
          </button>
          <button
            class="tab"
            :class="{ active: activeTab === 'solutions' }"
            @click="activeTab = 'solutions'"
          >
            Решения
          </button>
          <button
            class="tab"
            :class="{ active: activeTab === 'results' }"
            @click="activeTab = 'results'"
          >
            Результаты
          </button>
        </div>

        <!-- Content with Transitions -->
        <transition name="fade">
          <div v-if="activeTab === 'team'" class="tab-content">
            <h2 class="content-title">Команда</h2>
            <div class="team-member" v-for="member in teamMembers" :key="member.id">
              <div class="avatar">{{ getInitials(member.name) }}</div>
              <div class="member-info">
                <h3>{{ member.name }}</h3>
                <p>{{ member.email }}</p>
                <p>{{ member.skills }}</p>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="activeTab === 'solutions'" class="tab-content">
            <h2 class="content-title">Решения</h2>
            <p>Введите ссылку на GitHub репозиторий:</p>
            <input
              v-model="githubLink"
              type="text"
              class="input-field"
              placeholder="https://github.com/your-repo"
            />
            <button @click="submitSolution" class="submit-btn">Отправить</button>
            <p
              v-if="submissionStatus"
              class="status"
              :class="{ success: submissionStatus === 'Решение успешно отправлено!' }"
            >
              {{ submissionStatus }}
            </p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="activeTab === 'results'" class="tab-content">
            <h2 class="content-title">Результаты</h2>
            <div v-if="results" class="results-grid">
              <div class="result-item">
                <h3>Место</h3>
                <p>{{ results.place }}</p>
              </div>
              <div
                class="result-item"
                v-for="(score, criterion) in results.scores"
                :key="criterion"
              >
                <h3>{{ criterion }}</h3>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: score + '%' }"></div>
                </div>
                <p>{{ score }}</p>
              </div>
            </div>
            <p v-else>Результаты появятся после отправки решения.</p>
          </div>
        </transition>
      </div>
      <div class="sidebar">
        <!-- Sidebar Content -->
        <div class="sidebar-section">
          <h3>Мероприятия</h3>
          <ul>
            <li><a href="#">Все мероприятия</a></li>
            <li><a href="#">Вопросы и ответы</a></li>
            <li><a href="#">Канал проекта</a></li>
            <li><a href="#">Новости</a></li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3>Профиль</h3>
          <ul>
            <li><a href="#">Редактировать профиль</a></li>
            <li><a href="#">Выйти</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import HeaderView from '@/components/HeaderView.vue'

interface Member {
  id: number
  name: string
  email: string
  skills: string
  avatar: string
}

interface Hackathon {
  name: string
  dates: string
}

interface Submission {
  githubLink: string
  status: string
  results: {
    place: string
    scores: { [key: string]: number }
  } | null
}

interface State {
  hackathon: Hackathon
  team: {
    members: Member[]
  }
  submission: Submission
}

export default defineComponent({
  components: { HeaderView },
  setup() {
    const store = useStore<State>()
    const activeTab = ref('team')

    const hackathon = computed(() => store.state.hackathon)
    const teamMembers = computed(() => store.state.team.members)
    const githubLink = computed({
      get: () => store.state.submission.githubLink,
      set: (value: string) => store.commit('setGithubLink', value),
    })
    const submissionStatus = computed(() => store.state.submission.status)
    const results = computed(() => store.state.submission.results)
    const teamStatus = computed(() => (results.value ? 'Решение отправлено' : 'В процессе'))

    const getInitials = (name: string): string => {
      const names = name.split(' ')
      const initials = names[0].charAt(0) + names[names.length - 1].charAt(0)
      return initials.toUpperCase()
    }

    const submitSolution = () => {
      store.dispatch('submitSolution')
    }

    return {
      activeTab,
      hackathon,
      teamMembers,
      githubLink,
      submissionStatus,
      results,
      teamStatus,
      getInitials,
      submitSolution,
    }
  },
})
</script>

<style scoped>
.hackathon-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

.hero {
  text-align: center;
  padding: clamp(30px, 6vw, 60px) clamp(15px, 3vw, 20px);
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
  background-size: cover;
  background-position: center;
}

.hero-title {
  font-size: clamp(28px, 6vw, 48px);
  font-weight: bold;
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 5s infinite alternate;
  margin-bottom: clamp(10px, 2vw, 20px);
}

.hero-date {
  font-size: clamp(18px, 4vw, 24px);
  color: #ccc;
  margin-top: clamp(5px, 1vw, 10px);
}

.main-container {
  display: flex;
  flex-direction: row;
  gap: clamp(15px, 3vw, 20px);
  padding: clamp(15px, 3vw, 20px);
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .main-content {
    padding-right: 0;
  }

  .sidebar {
    order: -1;
  }
}

.main-content {
  flex: 4;
  padding-right: clamp(15px, 3vw, 20px);
}

.sidebar {
  flex: 1;
  background: #2c2c3d;
  padding: clamp(15px, 3vw, 20px);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sidebar-section h3 {
  font-size: clamp(16px, 3vw, 18px);
  margin-bottom: clamp(8px, 1.5vw, 10px);
  color: #00ffff;
}

.sidebar-section ul {
  list-style: none;
  padding: 0;
}

.sidebar-section li {
  margin-bottom: clamp(4px, 1vw, 5px);
}

.sidebar-section a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: clamp(14px, 2.5vw, 16px);
}

.sidebar-section a:hover {
  color: #ff00ff;
}

.team-status {
  margin-bottom: clamp(15px, 3vw, 20px);
  font-size: clamp(16px, 3vw, 18px);
  color: #ff00ff;
  animation: fadeIn 0.5s ease-in;
}

.tabs {
  display: flex;
  gap: clamp(8px, 1.5vw, 10px);
  margin-bottom: clamp(20px, 4vw, 30px);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 5px;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: clamp(14px, 2.5vw, 16px);
  white-space: nowrap;
}

.tab.active {
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  color: #000;
}

.tab-content {
  animation: fadeIn 0.5s ease-in;
}

.content-title {
  font-size: clamp(20px, 4vw, 24px);
  margin-bottom: clamp(15px, 3vw, 20px);
  color: #00ffff;
}

.team-member {
  display: flex;
  align-items: center;
  gap: clamp(10px, 2vw, 15px);
  padding: clamp(10px, 2vw, 15px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: clamp(10px, 2vw, 15px);
}

.avatar {
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(16px, 3vw, 20px);
  font-weight: bold;
}

.member-info h3 {
  font-size: clamp(16px, 3vw, 18px);
  margin-bottom: clamp(4px, 1vw, 5px);
}

.member-info p {
  font-size: clamp(14px, 2.5vw, 16px);
  color: #ccc;
  margin: 0;
}

.input-field {
  width: 100%;
  padding: clamp(10px, 2vw, 12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: clamp(14px, 2.5vw, 16px);
  margin-bottom: clamp(15px, 3vw, 20px);
}

.submit-btn {
  padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 24px);
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-size: clamp(14px, 2.5vw, 16px);
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.status {
  margin-top: clamp(10px, 2vw, 15px);
  padding: clamp(10px, 2vw, 15px);
  border-radius: 8px;
  background: rgba(255, 0, 0, 0.2);
  font-size: clamp(14px, 2.5vw, 16px);
}

.status.success {
  background: rgba(0, 255, 0, 0.2);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(15px, 3vw, 20px);
}

.result-item {
  background: rgba(255, 255, 255, 0.1);
  padding: clamp(15px, 3vw, 20px);
  border-radius: 8px;
}

.result-item h3 {
  font-size: clamp(16px, 3vw, 18px);
  margin-bottom: clamp(10px, 2vw, 15px);
  color: #00ffff;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: clamp(5px, 1vw, 8px);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  transition: width 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 100% 50%;
  }
}
</style>
