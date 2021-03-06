import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as crypto from 'crypto'
import { sign } from 'jsonwebtoken'
import { getUserId } from "./AuthController";
import { Bookmark } from "../entity/Bookmark";

const userRepository = () => getRepository(User);
const bookmarkResitory = () => getRepository(Bookmark);
const JWT_SECRET = process.env.JWT_SECRET

export async function login(req: Request, res: Response) {
    let { email, password } = req.body
    password = crypto.createHmac('sha256', password).digest('hex')
    const user = await userRepository().findOne({ email, password })
    if (!user) {
        return res
            .status(400)
            .render('loginPage', { message: 'Wrong credentails, try again' })
    }

    res.cookie('token', sign({ id: user.id, email: user.email }, JWT_SECRET), { maxAge: 900000, httpOnly: true });
    return res.redirect('/')
}

export async function signup(req: Request, res: Response) {
    let { email, password } = req.body
    password = crypto.createHmac('sha256', password).digest('hex')
    const user = await userRepository().save({ email, password });
    res.cookie('token', sign(user, JWT_SECRET), { maxAge: 900000, httpOnly: true });
    return res.redirect('/')
}

export function signupPage(req: Request, res: Response) {
    return res.render('signupPage')
}

export function loginPage(req: Request, res: Response) {
    return res.render('loginPage')
}

export async function bookmarkPage(req: Request, res: Response) {
    const userId = getUserId(req)

    const bookmarks = await bookmarkResitory().find({ where: { author: { id: userId } } })
    res.render('bookmarkPage', { bookmarks, userId })
}

export async function createBookmark(req: Request, res: Response) {
    const { title, link } = req.body
    await bookmarkResitory().save({
        title,
        link,
        authorId: getUserId(req)
    })

    res.redirect('/')
}