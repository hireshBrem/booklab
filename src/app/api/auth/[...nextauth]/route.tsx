import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { addUserToDB } from "@/app/actions/db_actions"

export const authOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID || "",
        clientSecret: process.env.GOOGLE_SECRET || "",
        authorization: {
            params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
            }
        }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            await addUserToDB(user.email, user.name)
            return(true)
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }