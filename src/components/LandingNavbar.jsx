import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

const LandingNavbar = () => {
    return (
        <nav className="bg-white">
            <div className="flex justify-between py-4 px-4">
                <div className="logo">
                </div>
                <div className="flex gap-5">
                    <ul className="flex gap-5 mt-3">
                        <li>Home</li>
                        <li>Services</li>
                        <li>About</li>
                    </ul>
                    <div className="flex gap-2">
                        <Link to="/signup">  <Button className="bg-[#0496ff]  text-white py-2 px-[2.5rem] rounded-full shadowed-btn">Sign up</Button></Link>
                        <Link to="/signin"><Button className="bg-[#0496ff]  text-white py-2 px-[2.5rem] rounded-full shadowed-btn">Sign In</Button></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar 
