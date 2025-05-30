<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleSubmit = () => {
  isLoading.value = true
  // Здесь будет логика авторизации
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}
</script>

<template>
  <div class="login">
    <div class="auth-card">
      <div class="card-header">
        <h2>Добро пожаловать</h2>
        <p>Введите свои данные для входа</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="input-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="example@mail.com" required />
          <span class="input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
        </div>

        <div class="input-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" placeholder="••••••••" required />
          <span class="input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
        </div>

        <div class="options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>Запомнить меня</span>
          </label>
          <router-link to="/forgot-password" class="forgot-password"> Забыли пароль? </router-link>
        </div>

        <RouterLink to="/main" type="submit" :disabled="isLoading" class="auth-button">
          <span v-if="!isLoading">Войти</span>
          <span v-else class="loader"></span>
        </RouterLink>
      </form>

      <div class="divider">
        <span>или</span>
      </div>

      <div class="social-auth">
        <button class="social-button google">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21.8 10.5H12v3h5.5c-.5 2.5-2.8 4-5.5 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.9.5 4 1.4l2.6-2.6C16.1 2.7 14.2 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10c0-.7-.1-1.4-.2-2z"
            ></path>
          </svg>
          Google
        </button>
        <button class="social-button github">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.2 3.2 0 0 0-1-2.5c3.2-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 20 1s-1.3-.3-4 1.5a13.4 13.4 0 0 0-7 0C6.3.7 5 1 5 1a5 5 0 0 0 0 3.8 5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.5 7a3.2 3.2 0 0 0-1 2.5V22"
            ></path>
          </svg>
          GitHub
        </button>
      </div>

      <div class="register-link">
        Нет аккаунта? <router-link to="/main">Зарегистрируйтесь</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: clamp(10px, 3vw, 20px);
}

.auth-card {
  background: #1e293b;
  border-radius: clamp(12px, 2vw, 16px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: clamp(20px, 4vw, 40px);
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.6s ease-out;
  border: 1px solid #334155;
}

@media (max-width: 480px) {
  .auth-card {
    margin: 10px;
  }
}

.card-header {
  text-align: center;
  margin-bottom: clamp(20px, 4vw, 32px);
}

.card-header h2 {
  font-size: clamp(24px, 5vw, 28px);
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: clamp(6px, 1.5vw, 8px);
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-header p {
  color: #94a3b8;
  font-size: clamp(14px, 3vw, 15px);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 20px);
}

.input-group {
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: clamp(6px, 1.5vw, 8px);
  font-size: clamp(13px, 2.5vw, 14px);
  font-weight: 500;
  color: #cbd5e1;
}

.input-group input {
  width: 100%;
  padding: clamp(10px, 2vw, 12px) clamp(14px, 3vw, 16px) clamp(10px, 2vw, 12px)
    clamp(40px, 8vw, 44px);
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: clamp(14px, 3vw, 15px);
  transition: all 0.3s;
  background-color: #1f2937;
  color: #f8fafc;
}

.input-group input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
  background-color: #1f2937;
}

.input-group input::placeholder {
  color: #64748b;
}

.input-icon {
  position: absolute;
  left: clamp(12px, 2.5vw, 14px);
  bottom: clamp(10px, 2vw, 12px);
  color: #64748b;
}

.input-icon svg {
  width: clamp(18px, 3.5vw, 20px);
  height: clamp(18px, 3.5vw, 20px);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(13px, 2.5vw, 14px);
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 360px) {
  .options {
    flex-direction: column;
    align-items: flex-start;
  }
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  cursor: pointer;
}

.remember-me input {
  width: clamp(14px, 3vw, 16px);
  height: clamp(14px, 3vw, 16px);
  accent-color: #8b5cf6;
}

.forgot-password {
  color: #8b5cf6;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #7c3aed;
  text-decoration: underline;
}

.auth-button {
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: clamp(12px, 2.5vw, 14px);
  border-radius: 8px;
  font-size: clamp(15px, 3vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: clamp(6px, 1.5vw, 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: clamp(44px, 9vw, 48px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-align: center;
}

.auth-button:hover {
  background: linear-gradient(90deg, #5a5feb 0%, #7c3aed 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.auth-button:disabled {
  background: #4c51bf;
  cursor: not-allowed;
  transform: none;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: clamp(20px, 4vw, 24px) 0;
  color: #64748b;
  font-size: clamp(13px, 2.5vw, 14px);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #334155;
}

.divider span {
  margin: 0 10px;
}

.social-auth {
  display: flex;
  gap: clamp(10px, 2vw, 12px);
  margin-bottom: clamp(20px, 4vw, 24px);
}

@media (max-width: 360px) {
  .social-auth {
    flex-direction: column;
  }
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: clamp(10px, 2vw, 12px);
  border-radius: 8px;
  font-size: clamp(14px, 2.5vw, 15px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #334155;
  background: #1f2937;
  color: #e2e8f0;
}

.social-button:hover {
  background: #2d3748;
  transform: translateY(-1px);
}

.social-button svg {
  width: clamp(16px, 3vw, 18px);
  height: clamp(16px, 3vw, 18px);
}

.register-link {
  text-align: center;
  color: #cbd5e1;
  font-size: clamp(14px, 2.5vw, 15px);
}

.register-link a {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.register-link a:hover {
  color: #7c3aed;
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
