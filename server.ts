import app from './src/app'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', async () => {
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
