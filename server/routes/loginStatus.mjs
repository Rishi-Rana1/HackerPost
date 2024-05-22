// implement and export the following functions in this file:
// 1. parseCookies 
// 2. manageSession 
import { v4 } from 'uuid';

//uuid is imported in order to generate a new sessionId in case there isnt one
//localStorage.getItem('token')
const sessions = {}
export const parseCookies = function(req, res, next) {
    const cookieString = req.get('Cookie')
    if (cookieString) {
        req.hwCookies = cookieString.split(';').reduce((obj, s) => {
            const [name, val] = s.split('=')
            obj[name.trim()] = val
            return obj
        }, {})
    }
    else {
        console.log('no cookies')
        req.hwCookies = {}
    }
    console.log(JSON.stringify(req.hwCookies))
    next()
}

export const manageSession = function(req, res, next) {
    if (req.hwCookies.sessionId && sessions[req.hwCookies.sessionId]) {
        req.hwSession = sessions[req.hwCookies.sessionId]
        console.log('session already exists: ', req.hwCookies.sessionId)
    }
    else if (req.hwCookies.sessionId && !sessions[req.hwCookies.sessionId]) {
        sessions[req.hwCookies.sessionId] = {}
        req.hwSession = sessions[req.hwCookies.sessionId]
        console.log('session generated (already exists and added to sessions): ', req.hwCookies.sessionId)
    }

    else if (!req.hwCookies.sessionId) {
        req.hwCookies.sessionId = v4()
        sessions[req.hwCookies.sessionId] = {}
        req.hwSession = sessions[req.hwCookies.sessionId]
        console.log('session generated: ', req.hwCookies.sessionId)
    }
    res.append('Set-Cookie', `sessionId=${req.hwCookies.sessionId}; HttpOnly`);
    req.hwSession.sessionId = req.hwCookies.sessionId
    next()
}