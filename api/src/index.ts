import { Elysia } from "elysia";
import { userRouter } from "./routes/user-routes";


const app = new Elysia();

app.get("/", () => "Hello Elysia");

app.use(userRouter);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
