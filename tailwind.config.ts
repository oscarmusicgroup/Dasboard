import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366f1',
          secondary: '#a855f7',
        }
      }
    }
  }
}
