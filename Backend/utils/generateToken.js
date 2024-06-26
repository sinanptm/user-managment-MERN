import jwt from 'jsonwebtoken'

const generateToken = (res, userId, cookieName = 'jwt') => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 100
    })
}

export default generateToken