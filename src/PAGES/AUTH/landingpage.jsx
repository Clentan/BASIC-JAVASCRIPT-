import { Navigate } from "react-router-dom";
import { useAuth } from "../../PROVIDERS/DataProvider";
import LandingNavbar from "../../components/LandingNavbar";
import Footer from "../../components/footer";
import SearchCoursesSection from "../../components/home/courses";
import Enrollment from "../../components/home/enrollment";
import Herosection from "../../components/home/hero";


export default function LandingPage() {

	const { currentUser, loading } = useAuth();

	console.log(currentUser)

	if (currentUser) { return <Navigate to="/" replace /> }
	return (
		<main>
			<LandingNavbar />
			<Herosection />
			{/*<SearchCoursesSection /> */}
			<Enrollment />

			<Footer />
		</main>
	)
}
