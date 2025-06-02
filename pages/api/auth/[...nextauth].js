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
          const response = await axios.get('https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Users', {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (response.data && response.data.length > 0) {
            const user = response.data[0];
            console.log('🔐 authorize() user:', user);

            return {
              id: user.UserId,                // 👈 ESTE ID tiene que estar
              email: user.email,
              name: user.name || null,
            };
          }

          return null;
        } catch (error) {
          console.error('❌ Error en authorize:', error);
          return null;
        }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('✅ JWT callback - user:', user);
        token.id = user.id;              // 👈 ESTE ES EL CLAVE QUE FALTA
        token.email = user.email;
        token.name = user.name || null;
      }

      console.log('🧾 JWT token final:', token);
      return token;
    },

    async session({ session, token }) {
      console.log('🧠 SESSION callback - token:', token);
      session.user.id = token.id;       // 👈 Esto depende de que token.id exista
      session.user.email = token.email;
      session.user.name = token.name;
      console.log('📦 SESSION final:', session);
      return session;
    }
  }
});
