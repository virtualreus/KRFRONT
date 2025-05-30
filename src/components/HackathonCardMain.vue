<script setup lang="ts">
import type {Hackathon} from "@/models/hackathons.ts";
import {computed} from "vue";

const props = defineProps<{
  hackathon: Hackathon
}>()

const formattedDate = computed(() => {
  const from = new Date(props.hackathon.dateFrom)
  const to = new Date(props.hackathon.dateTo)

  return `${from.getDate()} - ${to.getDate()} ${
      ['января','февраля','марта','апреля','мая','июня',
        'июля','августа','сентября','октября','ноября','декабря'][from.getMonth()]
  }, ${props.hackathon.location}`
})
</script>

<template>
  <RouterLink to="/main" class="hackathon-card">
      <div class="hackathon-card-text">
        <span class="hackathon-date">{{formattedDate}}</span>
        <span class="hackathon-name">{{hackathon.title}}</span>
      </div>
      <RouterLink to="/hackathon" class="follow-hackathon" v-if="hackathon.registrationOpen">Перейти</RouterLink>
      <span v-else class="hackathon-ended">Мероприятие завершилось</span>
  </RouterLink>
</template>

<style scoped>
.hackathon-card {
  color: white;
  display: flex;
  min-height: 250px;
  border-radius: 10px;
  margin-bottom: 24px;
  padding: 20px 30px;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-between;
}


.hackathon-name {
  font-size: 32px;
  font-weight: bold;
  margin-top: 12px;
}


.hackathon-date {
  font-size: 16px;
  margin-top: 12px;
}

.hackathon-card-text {
  display: flex;
  flex-direction: column;
}

.follow-hackathon {
  width: max-content;
  padding: 12px 24px;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-family: "Unbounded", sans-serif;
  background: transparent;
  border: 1px solid currentColor; /* Граница будет цвета текста */
  backdrop-filter: blur(2px); /* Легкое размытие для лучшей читаемости */
  transition: all 0.3s ease;
  text-decoration: none;
}

.hackathon-ended {
  font-weight: bold;
}

</style>