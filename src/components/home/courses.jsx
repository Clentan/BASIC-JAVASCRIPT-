import {
  Input,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

const SearchCoursesSection = () => {

    const courses = [
        {
          name: "Introduction to JavaScript",
          description: "Learn the basics of JavaScript, including variables, functions, and loops."
        },
        {
          name: "Web Development with React",
          description: "Build interactive user interfaces using React and explore state management."
        },
        {
          name: "Data Structures and Algorithms",
          description: "Understand fundamental data structures and algorithms for efficient programming."
        },
        {
          name: "Node.js and Express",
          description: "Learn to build server-side applications using Node.js and the Express framework."
        }
      ];
            


  return (
    <section className="py-[15dvh] px-10">
      <div className="w-full">
        <div className="flex justify-center">
          <div className="w-[30dvw] text-center">
            <p className="text-4xl"> Search for Courses </p>
            <Input
              type="search"
              placeholder="Search..."
              labelPlacement="outside"
              className="py-5 rounded-full"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  color={"#000000"}
                  fill={"none"}
                >
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              endContent={
                <Button className="rounded-full shadowed-btn bg-[#0496ff] text-white translate-x-9 px-[30pt]">
                  Search
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-center my-3">Popular Courses</p>
        <div className="grid grid-cols-12 gap-5">
            {courses.map((course, i) => (
                <Card isFooterBlurred className="w-full h-[300px] col-span-3" key={i}>
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                  <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  src="https://nextui.org/images/card-example-6.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                    <p className="text-black text-tiny">{course.name}</p>
                    <p className="text-black text-tiny">Beginner level</p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Notify Me
                  </Button>
                </CardFooter>
              </Card>
            ))}
          

          
        </div>
      </div>
    </section>
  );
};

export default SearchCoursesSection;
