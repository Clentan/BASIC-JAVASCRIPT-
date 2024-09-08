import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Button,
} from "@nextui-org/react";
import { useAuth } from "../../PROVIDERS/DataProvider";
import { Link } from "react-router-dom";


const subjectsList = [
	{ name: 'Mathematics', id: 0, image: "https://stock.adobe.com/search?k=maths" },
	{ name: 'Mathematical Literacy', id: 1, image: "https://www.facebook.com/p/Grade-12-Mathematical-Literacy-Group-100063798530983/" },
	{ name: 'Physical Sciences', id: 2, image: "https://www.pexels.com/search/physics/" },
	{ name: 'Geography', id: 3, image: "https://www.freepik.com/vectors/geography-subject" },
	{ name: 'History', id: 4, image: "https://www.gostudy.net/career-guidance/subject-choice---history" },
	{ name: 'Business Studies', id: 5, image: "https://www.geeksforgeeks.org/business-studies/" },
	{ name: 'Economics', id: 6, image: "https://www.freepik.com/premium-vector/school-subject-doodle-economics_148610493.htm" },
	{ name: 'Accounting', id: 7, image: "https://www.fiverr.com/malikwaseemawan/do-online-teaching-of-accounting-subjects" },
	{ name: 'English Home Language', id: 8, image: "https://www.pinterest.com/pin/english-subject-illustration-vector-download--596234438187479057/" },
];



export default function Subjects() {
	const { currentUser } = useAuth()
	const userSubjects = subjectsList.filter((subject) => currentUser.grade.subjects.includes(subject.id));


	return (
		<section>
			<div>
				<div className="text-center my-5">
					<p className="text-4xl">Subjects</p>
					<p className="text-gray-400">Delve into a wide range of topics, with videos and resources to enhance your learning journey.</p>
				</div>
				<div className="grid grid-cols-12 gap-5">
					{userSubjects.map(subject => (
						<Card isFooterBlurred className="w-full h-[300px] col-span-3" key={subject.id}>
							<Image
								removeWrapper
								alt="Card example background"
								className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
								src={subject.image}
							/>
							<CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
								<div>
									<p className="text-black">{subject.name}</p>
									<p className="text-black text-tiny">Get notified.</p>
								</div>

								<Link to={`${subject.id}`}>
									<Button
										className="text-tiny"
										color="primary"
										radius="full"
										size="sm"
									>
										View
									</Button>
								</Link>
							</CardFooter>

						</Card>
					))}

				</div>
			</div>
		</section>
	);
}
