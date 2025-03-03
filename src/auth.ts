// src/auth.ts

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    verifyRequest: `http://localhost:3000/auth/verify-request`,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Lors de la première connexion, on enrichit le token avec des données supplémentaires
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // On peut maintenant accéder à ces données dans la session
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  events: {
    async signIn(message) {
      // Vous pouvez ajouter ici une logique qui doit se déclencher à chaque connexion
      // Par exemple, enregistrer une trace ou mettre à jour des informations utilisateur
      console.log("User signed in:", message.user);
    },
    async signOut(message) {
      console.log("User signed out:", message);
    },
  },
  ...authConfig,
});
