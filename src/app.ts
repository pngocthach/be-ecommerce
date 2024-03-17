import express, { Request, Response, NextFunction } from "express"
import morgan from "morgan"
import "dotenv/config"
import "./helpers/initMongodb"
import "./helpers/initRedis"
import router from "./routes/index.route"
import createError from "http-errors"

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound("this route does not exist"))
})

app.use((err: Error, req: Request, res: Response) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

export default app
