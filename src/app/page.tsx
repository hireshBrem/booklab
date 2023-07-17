
import Image from 'next/image'
import readingPic from './pics/reading.svg'
import Link from 'next/link'

export default async function Home() {
    return (
    <div className='flex space-x-10 mx-20 mt-20 flex-wrap'>
        <div className='self-center md:w-[50%] mr-10 text-center md:text-left'>
            <p className="text-6xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono">Welcome to BookLab</p>
            <p className="text-lg italic bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The first collaborative book reading platform</p>
            <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The problem?</p>
            <p className="text-lg bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">"People who read are more than 25% more likely to be healthy than non-readers, even when this is corrected for aspects such as education, income and age"</p>
            <p className="text-xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">The Solution?</p>
            <p className="text-lg bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent font-martian_mono mt-5">We provide a platform for readers to connect with others to read collaboratively. Therefore reading with others can conquer the single most important reason why people dont read books - they find it boring!</p>
            <Link href="/books"><button className='bg-gradient-to-tr from-indigo-500 to-[#BA68C8] font-martian_mono rounded-sm p-2 mt-5'>Get started</button></Link>
        </div>
        <div className=''>
            <Image className='hidden sm:inline' src={readingPic} width={500} height={500} alt="books" /> 
        </div>
    </div>
  )
}
