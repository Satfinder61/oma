import { parse } from "cookie";

export function getUserIdFromCookies(req) {
  if (!req || !req.headers?.cookie) {
    return null;
  }
  const cookies = parse(req.headers.cookie);
  return cookies.userId ? parseInt(cookies.userId) : null;
}
