import { Elysia } from "elysia";
import { authController } from "./controllers/auth";


const app = new Elysia();

app.get("/", () => "Hello Elysia");

app.use(authController);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
