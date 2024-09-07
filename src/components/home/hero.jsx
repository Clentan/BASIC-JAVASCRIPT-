import { Button } from "@nextui-org/react"

const Herosection = () => {
    return (
        <>
            <div className="relative ">
    

    <section className="bg- overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch h-[100dvh]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                <div className="absolute bottom-0 right-0 hidden lg:block">
                    {/* <img className="object-contain w-auto h-48" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png" alt="" /> */}
                </div>

                <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                    <h1 className="font-bold text-black text-5xl">
                    Unlock Your <span className="text-[#0496ff]">Potential</span>.
                    Learn Anytime, Anywhere.
                    </h1>
                    <p className="mt-8 text-xl text-gray-700">Discover thousands of courses taught by industry experts and start mastering new skills today. Join our community of learners and take the next step in your career.</p>
                    
                    <Button className="bg-[#0496ff] shadowed-btn text-white px-[40pt] my-2">Get Started</Button>
                </div>

            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12 ms-2 my-2 rounded-lg">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full scale-150 " src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/man-working-on-laptop.jpg" alt="" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center">
                            <svg className="w-10 h-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            <h2 className="font-bold text-white text-7xl ml-2.5">395</h2>
                        </div>
                        <p className="max-w-xs mt-1.5 text-xl text-white">Professionals have organized their desk via PostCra</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

        </>
    )
}

export default Herosection