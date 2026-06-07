import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const ownerEmail = (
  process.env.OWNER_EMAIL ?? "isafronovms@gmail.com"
).toLowerCase();

export const authConfigured = Boolean(
  process.env.AUTH_GITHUB_ID &&
    process.env.AUTH_GITHUB_SECRET &&
    process.env.AUTH_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn({ user }) {
      return user.email?.toLowerCase() === ownerEmail;
    },
    authorized({ auth: session }) {
      return session?.user?.email?.toLowerCase() === ownerEmail;
    },
  },
});
