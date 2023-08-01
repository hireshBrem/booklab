'use server';

import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

// Local function
export async function createClient() {
    const uri = process.env.MONGO_URI || ""

    if(uri!="") {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          deprecationErrors: true,
        }
      });

    return client
    }
    else {
        return (null)
    }
}

export async function addReaderToWaitingList(_email:string) {
    
    const client = await createClient()

    if(client){
        await client.connect()

        const db = client.db("bookdb")

        await db.collection("early_adopters")
        .insertOne({
            email: _email,
        });
        console.log("Added to waiting list")
        await client.close();
    }    
}

export async function addAuthorToWaitingList(_email:string) {
    const client = await createClient()
        
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        await db.collection("early_authors")
        .insertOne({
            email: _email,
        });
        console.log("Added to waiting list")
        await client.close();
    }     
}

export async function getBooks() {

    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        const books = await db.collection("books").find({}).toArray();

        await client.close();

        // revalidatePath("/books")

        return(books) 
    }
}

export async function getPDF(id:string) {
    
    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb");

        const book = await db.collection("books")
        .findOne({
            _id: new ObjectId(id)
        })
        
        await client.close();
        revalidatePath("/books/[id]")
        return(book) 
    }
}

export async function uploadBook(title:string, book:string) {
    
    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        await db.collection("books")
        .insertOne({
            title: title,
            data: book,
        });

        await client.close();
    }

}

export async function addComment(_comment:string, page:number, _name:string | null | undefined, _title:string) {
    const client = await createClient()
    let _date = new Date().toUTCString()

    if(client && _name!==null && _name!==undefined){
        await client.connect()

        const db = client.db("bookdb")

        let query = { title: _title }

        let i = page-1
        i.toString()

        await db.collection("books").findOne(query).then(async(result:any) => {
            if(result.comments[i]==null){
                await db.collection("books")
                .updateOne(query,
                {
                    $set: {
                        ['comments.' + i]: [{
                            "comment_text": _comment, 
                            "date": _date, 
                            "sender_name": _name
                        }]
                    }
                })
            }
            else{
                await db.collection("books")
                .updateOne(query,
                {
                    $push: {
                        ['comments.' + i]: {
                            $each: [{
                                "comment_text": _comment, 
                                "date": _date, 
                                "sender_name": _name
                            }],
                        }
                    }
                }

                )
                revalidatePath("/books/[id]")
                await client.close();
            }
        })
    }

}

export async function checkAllowedBook(email: string | null | undefined, bookId:string) {
    let isAllowed = false

    const client = await createClient()

    if(client){
        await client.connect()

        const db = client.db("bookdb")

        const user = await db.collection("users")
        .findOne({
            email: email
        })

        await client.close();
        if(user?.owned_books.length>0) {
            user?.owned_books.forEach((book:string) => {
                console.log(bookId)
                console.log(book)
                if(bookId==book){
                    isAllowed = true
                }
            });    
        }


    }
    return(isAllowed)
}

export async function checkUserInDB(_email: string | null | undefined) {
    const client = await createClient()

    if(client){
        await client.connect()

        const db = client.db("bookdb")

        const user = await db.collection("users")
        .findOne({
            email: _email
        })

        await client.close();

        if(user) {
            return(true)
        }
        else {
            return(false)
        }
    }


}

export async function addUserToDB(_email:string | null | undefined, _name:string | null | undefined) {
    const client = await createClient()
    let userIndb = await checkUserInDB(_email)
    
    if(client && userIndb===false){
        await client.connect()

        const db = client.db("bookdb")

        await db.collection("users")
        .insertOne({
            name: _name,
            email: _email,
            plan: "free",
            signedUp: new Date().toUTCString(),
            booksLeft: 0,
            owned_books: [],
            customer_id: null,
            subscription: null
        })
        client.close()
    }
}

export async function sendFeedback(_email:string | null | undefined, _feedback:string, _rating:string) {

    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        await db.collection("feedback")
        .insertOne({
            email: _email,
            comment: _feedback,
            rating: _rating
        });

        await client.close();
        return(true)
    }
    return(false)
}

export async function getUser(_email:string | null | undefined) {
    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        const user = await db.collection("users")
        .findOne({
            email: _email
        })

        await client.close();

        return(user)
    }
}    

export async function getBook(_id:string) {
    const client = await createClient()
    
    if(client){
        await client.connect()

        const db = client.db("bookdb")

        const book = await db.collection("books")
        .findOne({
            _id: new ObjectId(_id)
        })

        await client.close();

        return(book)
    }
}

export async function addBookToUser(book_id:string, _email:string | null | undefined) {

    const client = await createClient()
    if(client) {
        const db = client.db("bookdb")

        await db.collection("users")
        .updateOne({email: _email},{
            $push: {owned_books: book_id}
        })

        client.close()
    }
}