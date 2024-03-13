import redis from 'redis'

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
  }
})

try {
  await client.connect()
} catch (error) {
  console.log(error)
}

client.on('connect', () => {
  console.log('connected to Redis')
})

client.on('ready', () => {
  console.log('Redis is ready to use')
})

client.on('end', () => {
  console.log('Redis connection is closed')
})

client.on('error', (err) => {
  console.log(err.message)
})

process.on('SIGINT', async () => {
  await client.quit()
})

export default client