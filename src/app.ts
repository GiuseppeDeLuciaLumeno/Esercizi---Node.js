
import express from "express";
import "express-async-errors";


import { validationErrorMiddleware } from "./lib/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import passport from "passport";

import planetRoutes from "./routes/planets";
import authRoutes from "./routes/auth";




const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize())
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetRoutes);
app.use("/auth", authRoutes);

app.use(validationErrorMiddleware);

export default app;