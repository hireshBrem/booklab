'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { createClient } from "./db_actions";

export default async function addCustomerId(customer_id:string, amount:number) {
    const session = await getServerSession(authOptions);

    const client = await createClient()
    console.log("session from server action: " + session)

    if(client && session) {    
        await client.connect()

        const db = client.db("bookdb")
    
        await db.collection("users")
        .updateOne({email: session.user?.email},
            {$set:{ customer_id: customer_id}})

        if(amount == 1554){
            await db.collection("users")
            .updateOne({email: session.user?.email}, 
            {$set:{ booksLeft: 1}})
        }
        if(amount == 3807) {
            await db.collection("users")
            .updateOne({email: session.user?.email}, 
            {$set:{ booksLeft: 2}})
        } 
        if(amount == 7693) {
            await db.collection("users")
            .updateOne({email: session.user?.email}, 
            {$set:{ booksLeft: 4}})
        }
        console.log("customer id added to db")
        await client.close();

    }
}