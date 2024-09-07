import SearchCoursesSection from "../home/courses"
import Enrollment from "../home/enrollment"
import Herosection from "../home/hero"

const Home = () => {
    return (
        <main>
            <Herosection />
            <SearchCoursesSection /> //l
            <Enrollment />
        </main>
    )
}
export default Home