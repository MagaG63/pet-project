import { Request } from 'express';
export declare const COOKIE_CONFIG: {
    readonly refreshToken: {
        readonly name: "refreshToken";
        readonly options: {
            readonly httpOnly: true;
            readonly secure: boolean;
            readonly sameSite: "strict";
            readonly maxAge: number;
            readonly path: "/";
        };
    };
};
export declare const getCookieValue: (req: Request, cookieName: string) => string | null;
export declare const clearRefreshTokenCookie: (res: any) => void;
