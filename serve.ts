import { env } from './src/env'
import { app } from './src/app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running ${env.PORT} !`)
  })
