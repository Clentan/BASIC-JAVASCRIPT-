import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Button,
} from "@nextui-org/react";
import { useAuth } from "../../PROVIDERS/DataProvider";


const subjectsList = [
	{ name: 'Mathematics', id: 0, image: "" },
	{ name: 'Mathematical Literacy', id: 1, image: "" },
	{ name: 'Physical Sciences', id: 2, image: "" },
	{ name: 'Geography', id: 3, image: "" },
	{ name: 'History', id: 4, image: "" },
	{ name: 'Business Studies', id: 5, image: "" },
	{ name: 'Economics', id: 6, image: "" },
	{ name: 'Accounting', id: 7, image: "" },
	{ name: 'English Home Language', id: 8, image: "" },
	{ name: 'Afrikaans First Additional Language', id: 9, image: "" },
	{ name: 'IsiZulu First Additional Language', id: 10, image: "" },
];



export default function Subjects() {
	const { currentUser } = useAuth()
	const userSubjects = subjectsList.filter((subject) => currentUser.grade.subjects.includes(subject.id));


	const subs = currentUser.grade.subjects
	console.log(subs)

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
								src="https://nextui.org/images/card-example-6.jpeg"
							/>
							<CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
								<div>
									<p className="text-black">{subject.name}</p>
									<p className="text-black text-tiny">Get notified.</p>
								</div>
								<Button
									className="text-tiny"
									color="primary"
									radius="full"
									size="sm"
								>
									View
								</Button>
							</CardFooter>
						</Card>
					))}

				</div>
			</div>
		</section>
	);
}
