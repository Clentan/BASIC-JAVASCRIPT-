import { Button } from "@nextui-org/react"

const Navbar = () => {
    return (
        <nav>
            <div className="flex justify-between py-4 px-4">
                <div className="logo">
                    Logo here
                </div>
                <div className="flex gap-5">
                    <ul className="flex gap-5 mt-3">
                        <li>Home</li>
                        <li>Services</li>
                        <li>About</li>
                    </ul>
                    <div className="flex gap-2">
                        <Button className="bg-[#0496ff]  text-white py-2 px-[2.5rem] rounded-full shadowed-btn">Sign up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar