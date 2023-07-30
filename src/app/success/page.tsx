'use client'
import { useSearchParams } from 'next/navigation'
export default function Page() {
    const searchParams = useSearchParams()
    const id = searchParams.get('session_id')
    return (
        <div>
            <h1>Success</h1>
            <p>Thank you for your order.</p>
            <p>Your session number is: {id}</p>
        </div>
    )
}