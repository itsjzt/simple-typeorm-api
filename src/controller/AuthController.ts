import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET


export function redirectNotLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token
        const tokenData = verify(token, JWT_SECRET)
        if (tokenData) {
            return next()
        }
    }
    return res.redirect('/users/login')
}

function getTokenData(token: string) {
    const tokenData = verify(token, JWT_SECRET)
    return tokenData
}

function getToken(req: Request) {
    if (req.cookies && req.cookies.token) {
        return req.cookies.token
    }
}

export function getUserId(req: Request) {
    const token = getToken(req)
    const tokenData: any = getTokenData(token)
    if (typeof tokenData === 'object' && tokenData.id) {
        return tokenData.id
    }
} 