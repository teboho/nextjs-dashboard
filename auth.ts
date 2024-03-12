import NextAuth from "next-auth";
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import type { User } from "./app/lib/definitions";
import bcryt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed tp fetch user: ', error);
        throw new Error('Failed to fetch user.');
    }
}

/**
 * Exposes the auth object and the signIn and signOut functions
 */
export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await bcryt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                
                console.log('Invalidating credentials');
                return null;
            }
        })
    ]
})