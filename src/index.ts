import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import { login, signup, signupPage, loginPage, bookmarkPage, createBookmark } from "./controller/UserController";
import { redirectNotLoggedIn } from "./controller/AuthController";

createConnection().then(async () => {

    // create express app
    const app = express();
    app.use(cookieParser())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs');

    try {
        app.get('/users/login', loginPage)
        app.post('/users/login', login)
        app.get('/users', signupPage)
        app.post('/users', signup)
        app.post('/bookmark', createBookmark)
        app.get('/', redirectNotLoggedIn, bookmarkPage)
        app.all('*', (_, res) => res.send('ayayayay'))
    } catch (e) {
        console.log({ e })
    }

    // start express server
    const PORT = parseInt(process.env.PORT) || 3000
    app.listen(PORT);

    console.log(">>> Listening 3000 <<<");

}).catch(error => console.log(error));
