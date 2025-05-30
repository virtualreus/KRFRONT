import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

describe('LoginView', () => {
  let wrapper: any
  let router: Router

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: { template: '<div>Home</div>' },
        },
        {
          path: '/main',
          name: 'main',
          component: { template: '<div>Main</div>' },
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: { template: '<div>Forgot Password</div>' },
        },
      ],
    })

    wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.auth-card').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Добро пожаловать')
  })

  it('has email and password inputs', () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
  })

  it('updates v-model values when inputs change', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')

    expect(wrapper.vm.email).toBe('test@example.com')
    expect(wrapper.vm.password).toBe('password123')
  })

  it('shows loading state when form is submitted', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(wrapper.vm.isLoading).toBe(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('toggles remember me checkbox', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]')

    await checkbox.setChecked()
    expect(wrapper.vm.rememberMe).toBe(true)

    await checkbox.setChecked(false)
    expect(wrapper.vm.rememberMe).toBe(false)
  })

  it('has social login buttons', () => {
    const googleButton = wrapper.find('.social-button.google')
    const githubButton = wrapper.find('.social-button.github')

    expect(googleButton.exists()).toBe(true)
    expect(githubButton.exists()).toBe(true)
  })
})
