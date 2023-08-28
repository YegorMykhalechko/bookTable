import { App } from 'vue'
import { ModuleNamespace } from 'vite/types/hot'

export const registerLayouts = (app: App<Element>) => {
  const layouts = import.meta.glob<boolean, ModuleNamespace>('@/layouts/*.vue', { eager: true })

  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default)
  })
}
