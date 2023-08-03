export default function Authors() {
    return(
        <div className="max-w-6xl mx-auto text-white mt-10 space-y-4 sm:mb-40 px-4 font-martian_mono">
            <p className="text-4xl bg-gradient-to-tr from-indigo-500 to-[#BA68C8] bg-clip-text text-transparent">Looking to publish some work? Have any questions? Reporting any bugs?</p> <br /> <br />
            <p className="text-xl font-bold italic">BookLab is community-driven therefore we put authors and readers first before anything. View our <a href="/terms&conditions" className="border-b-2 border-transparent hover:border-indigo-500">terms and conditions page</a>.</p>            
            <p className="text-xl font-bold italic ">We value your input and look forward to hearing from you. Whether you have a suggestion to improve our services or encounter any issues, we appreciate your engagement and strive to provide you with the best experience possible.</p>
            <div className='border-2 border-indigo-500 w-fit mt-5 rounded-md p-2 space-y-2'>
                <p className="text-xl font-bold italic hover:underline">Contact booklab2023@hotmail.com</p>
                <a href="https://www.linkedin.com/in/hiresh-bremanand-a78782224" className="text-xl font-bold italic mt-5 hover:underline">Contact founder's Linkedin</a>
            </div>
        </div>
    )
}