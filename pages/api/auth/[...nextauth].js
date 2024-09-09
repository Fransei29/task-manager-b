// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../lib/models';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await User.findOne({ where: { email: credentials.email } });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user; // Return the authenticated user
        }

        return null; // Authentication failed
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens (JWT) for session handling
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secure-random-key', // Replace with a strong key
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
