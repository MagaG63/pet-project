"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRefreshTokenCookie = exports.getCookieValue = exports.COOKIE_CONFIG = void 0;
exports.COOKIE_CONFIG = {
    refreshToken: {
        name: 'refreshToken',
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/',
        },
    },
};
const getCookieValue = (req, cookieName) => {
    const cookies = req.headers.cookie?.split('; ');
    if (!cookies?.length)
        return null;
    const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : null;
};
exports.getCookieValue = getCookieValue;
const clearRefreshTokenCookie = (res) => {
    res.clearCookie(exports.COOKIE_CONFIG.refreshToken.name, {
        ...exports.COOKIE_CONFIG.refreshToken.options,
        maxAge: 0,
    });
};
exports.clearRefreshTokenCookie = clearRefreshTokenCookie;
//# sourceMappingURL=cookies.utils.js.map