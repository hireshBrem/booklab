'use server';
import { MongoClient, ServerApiVersion } from 'mongodb'
import { revalidatePath } from 'next/cache'

// Local function
async function createClient() {
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

        revalidatePath("/books")

        return(books) 
    }
}

export async function getPDF(id:string | undefined) {
    
    const client = await createClient()
    let book:any = null
    
    if(client && id!==undefined){
        await client.connect()

        const db = client.db("bookdb");
        
        const books = await db.collection("books")
        .find({}).toArray().then((_books) => 
        {
            return(
            _books.forEach(_book => {
                if(JSON.stringify(_book._id) === id) {
                    book = _book
                    return(book)
                }    
            })
            )
        })

        await client.close();

        return(book.data) 
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