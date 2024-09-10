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
        // Find the user in the database
        const user = await User.findOne({ where: { email: credentials.email } });

        // If user exists, compare the provided password with the stored hash
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user; // Return the authenticated user
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Use NEXTAUTH_SECRET for JWT signing
  session: {
    strategy: 'jwt', // Use JSON Web Tokens (JWT) for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Attach user ID to the session
      }
      return session;
    },
  },
});
