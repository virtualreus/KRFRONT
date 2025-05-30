import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HackathonCardMain from '@/components/HackathonCardMain.vue'

describe('HackathonCardMain', () => {
  const mockHackathon = {
    id: 1,
    name: 'Test Hackathon',
    description: 'Test Description',
    dates: '1-2 января 2024',
    prize: '100 000 ₽',
    participants: 150,
    status: 'active',
  }

  it('emits click event when clicked', async () => {
    const wrapper = mount(HackathonCardMain, {
      props: {
        hackathon: mockHackathon,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
