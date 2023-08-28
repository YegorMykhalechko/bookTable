import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Vuetify from '@/plugins/vuetify'
import HomeView from '@/views/HomeView.vue'

global.ResizeObserver = require('resize-observer-polyfill')

describe('HelloWorld', () => {
  test('displays message', () => {
    const view = mount(HomeView, { global: { plugins: [Vuetify] } })
    console.log(view.html())
    expect(view.text()).toContain('Main Content')
  })
})
