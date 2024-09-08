import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Button,
} from "@nextui-org/react";


export default function Subjects() {
	const subjects = [
		{
			id: 101,
			name: "Mathematics",
			description: "Covers topics such as algebra, geometry, calculus, and statistics, focusing on problem-solving and critical thinking."
		},
		{
			id: 102,
			name: "Physical Science",
			description: "Focuses on the study of physics and chemistry, exploring concepts such as matter, energy, and chemical reactions."
		},
		{
			id: 103,
			name: "Life Sciences",
			description: "Studies biological systems, organisms, ecology, and genetics, emphasizing human and environmental biology."
		},
		{
			id: 104,
			name: "Geography",
			description: "Examines the physical features of the Earth and human societies, covering topics like climate, ecosystems, and urban development."
		},
		{
			id: 105,
			name: "History",
			description: "Explores key historical events, figures, and movements, with a focus on South Africa, Africa, and world history."
		},
		{
			id: 106,
			name: "English Home Language",
			description: "Focuses on language, literature, comprehension, and writing skills, helping learners develop proficiency in English."
		},
		{
			id: 107,
			name: "Afrikaans First Additional Language",
			description: "Teaches Afrikaans as a second language, focusing on communication, grammar, reading, and writing."
		}
	];

	return (
		<section>
			<div>
				<div className="text-center my-5">
					<p className="text-4xl">Subjects</p>
					<p className="text-gray-400">Delve into a wide range of topics, with videos and resources to enhance your learning journey.</p>
				</div>
				<div className="grid grid-cols-12 gap-5">
					{subjects.map(subject => (
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
