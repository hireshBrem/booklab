export default function Page({id}: {id:string}) {
    return (
        <div>
            <h1>Success</h1>
            <p>Thank you for your order.</p>
            <p>Your session number is: {id}</p>
        </div>
    )
}