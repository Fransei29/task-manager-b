import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Hacer un request a MockAPI para verificar las credenciales
          const response = await axios.get('https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Users', {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          });
      
          // Verificar si se encuentra un usuario que coincida con las credenciales
          if (response.data && response.data.length > 0) {
            return response.data[0]; // Retorna el primer usuario que coincida
          }
          return null; // Si no se encuentra, retorna null
        } catch (error) {
          console.error('Error de autenticación:', error);
          return null;
        }
      }
}),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
