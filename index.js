import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './router.js'
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import cors from 'cors'
//dotenv configuration
dotenv.config()

const app = express();
const __dirname = path.resolve();
const port = process.env.API_PORT || 3000
//For API Documention from Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//User routes from router js file
app.use('/', cors(), router)

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});
//Export App.js file
export default app;
