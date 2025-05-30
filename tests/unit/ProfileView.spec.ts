import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ProfileView from '@/views/ProfileView.vue'
import { mockHackathons } from '@/models/hackathons'

describe('ProfileView', () => {
  let wrapper: any

  const mockProfile = {
    name: 'John Doe',
    title: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    email: 'john@example.com',
    phone: '+7 999 123 45 67',
    location: 'Moscow',
    bio: 'Full-stack developer with 5 years of experience',
    completedHackathons: 15,
    rating: 4.9,
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
  }

  beforeEach(() => {
    wrapper = mount(ProfileView, {
      data() {
        return {
          profileSaved: mockProfile,
          currentHack: mockHackathons[0],
          activeTab: 'info',
          mouseX: 0,
          mouseY: 0,
        }
      },
    })
  })

  it('switches tabs correctly', async () => {
    const tabs = wrapper.findAll('.tab-button')
    const tabNames = ['info', 'hackathons', 'settings']

    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].trigger('click')
      expect(wrapper.vm.activeTab).toBe(tabNames[i])
    }
  })

  it('updates profile information', async () => {
    // Переключаемся на вкладку информации
    await wrapper.find('.tab-button').trigger('click')

    // Обновляем имя
    const nameInput = wrapper.find('input[type="text"]')
    await nameInput.setValue('Jane Doe')
    expect(wrapper.vm.profileSaved.name).toBe('Jane Doe')

    // Обновляем email
    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('jane@example.com')
    expect(wrapper.vm.profileSaved.email).toBe('jane@example.com')
  })

  it('shows settings form', async () => {
    await wrapper.findAll('.tab-button')[2].trigger('click')

    const themeSelect = wrapper.find('select')
    const notificationSwitches = wrapper.findAll('.switch input[type="checkbox"]')

    expect(themeSelect.exists()).toBe(true)
    expect(notificationSwitches.length).toBe(2)
  })

  it('has working theme selector', async () => {
    await wrapper.findAll('.tab-button')[2].trigger('click')

    const themeSelect = wrapper.find('select')
    await themeSelect.setValue('Светлая')

    expect(themeSelect.element.value).toBe('Светлая')
  })

  it('has working notification toggles', async () => {
    await wrapper.findAll('.tab-button')[2].trigger('click')

    const switches = wrapper.findAll('.switch input[type="checkbox"]')

    for (const switchEl of switches) {
      await switchEl.setChecked(false)
      expect(switchEl.element.checked).toBe(false)

      await switchEl.setChecked(true)
      expect(switchEl.element.checked).toBe(true)
    }
  })
})
