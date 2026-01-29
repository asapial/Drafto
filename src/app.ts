import express, { Application } from "express"
import { postRoute } from "./modules/post/post.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRoute } from "./modules/comment/comment.route";
import errorHandler from "./middleware/globalErrorHandelar";
import notFound from "./middleware/notFound";



const app:Application = express()
app.use(express.json());

const corsOptions = {
  origin: `${process.env.ORIGIN_URL}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, 
}
 
app.use(
cors(corsOptions)
)
app.get('/', (req, res) => {
  res.send('Hello Worl!')
})

app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/post",postRoute)
app.use("/comment",commentRoute)

app.use(errorHandler);
app.use(notFound);

export default app;