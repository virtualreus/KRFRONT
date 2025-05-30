import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Глобальные моки для Vue Router
config.global.mocks = {
  $route: {
    params: {},
    query: {},
    path: '/',
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  },
}

// Глобальные заглушки для компонентов
config.global.stubs = {
  RouterLink: true,
  RouterView: true,
}

// Настройка для работы с DOM в тестах
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }
