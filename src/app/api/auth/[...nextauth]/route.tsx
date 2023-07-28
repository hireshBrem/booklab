import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { addUserToDB } from "@/app/actions/db_actions"

const handler = NextAuth({
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
        async signIn({ user, account, profile, email, credentials }) {
            console.log("Sign in")
            await addUserToDB(user.email, user.name)
            return(true)
        }
    }
})

export { handler as GET, handler as POST }