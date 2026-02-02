import { Request } from 'express';

export const COOKIE_CONFIG = {
  refreshToken: {
    name: 'refreshToken',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/',
    },
  },
} as const;

export const getCookieValue = (
  req: Request,
  cookieName: string,
): string | null => {
  const cookies = req.headers.cookie?.split('; ');
  if (!cookies?.length) return null;

  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export const clearRefreshTokenCookie = (res: any) => {
  res.clearCookie(COOKIE_CONFIG.refreshToken.name, {
    ...COOKIE_CONFIG.refreshToken.options,
    maxAge: 0,
  });
};
