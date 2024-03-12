import NextAuth from "next-auth";
import { authConfig } from '@/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // next middleware matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};