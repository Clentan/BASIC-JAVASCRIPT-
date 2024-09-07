const Dashboard = () => {
  return (
    <section>
      <div>
        <div className="py-3">
          <p className="text-3xl">Good Evening, frankie.</p>
          <p className="text-gray-400">Dashboard Overview</p>
        </div>
        <div className="cards flex gap-4">
          <div className="w-[15dvw] border-2 p-3 rounded">
            <div className="flex">
              <div>
                <p className="text-2xl">15:34:00</p>
                <p className="text-gray-400">Time spend</p>
                <p className="text-green-500 font-bold">+1.05%</p>
              </div>
              <div className="pt-5 ps-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  color={"red"}
                  fill={"none"}
                >
                  <path
                    d="M4.5 12C4.5 8.71252 4.5 7.06878 5.40796 5.96243C5.57418 5.75989 5.75989 5.57418 5.96243 5.40796C7.06878 4.5 8.71252 4.5 12 4.5C15.2875 4.5 16.9312 4.5 18.0376 5.40796C18.2401 5.57418 18.4258 5.75989 18.592 5.96243C19.5 7.06878 19.5 8.71252 19.5 12C19.5 15.2875 19.5 16.9312 18.592 18.0376C18.4258 18.2401 18.2401 18.4258 18.0376 18.592C16.9312 19.5 15.2875 19.5 12 19.5C8.71252 19.5 7.06878 19.5 5.96243 18.592C5.75989 18.4258 5.57418 18.2401 5.40796 18.0376C4.5 16.9312 4.5 15.2875 4.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9 22H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 2H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 10L13 13M15 9L11 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-[15dvw] border-2 p-3 rounded">
            <div className="flex">
              <div>
                <p className="text-2xl">75%</p>
                <p className="text-gray-400">Courses</p>
                <p className="text-green-500 font-bold">+1.05%</p>
              </div>
              <div className="pt-5 ps-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                  <path d="M1.99805 7.99928C1.99805 9.34126 10.0943 13 11.9857 13C13.8772 13 21.9734 9.34126 21.9734 7.99928C21.9734 6.6573 13.8772 2.99854 11.9857 2.99854C10.0943 2.99854 1.99805 6.6573 1.99805 7.99928Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.99219 11L7.24348 16.8002C7.32919 17.1975 7.52703 17.5687 7.85696 17.8054C10.0787 19.3998 13.8908 19.3998 16.1126 17.8054C16.4426 17.5687 16.6404 17.1975 16.7261 16.8002L17.9774 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.4774 9.49951V16.5006M20.4774 16.5006C19.6864 17.9471 19.3366 18.7221 18.9813 20.0011C18.9042 20.4562 18.9654 20.6855 19.2786 20.8891C19.4059 20.9718 19.5588 21.0012 19.7104 21.0012H21.229C21.3904 21.0012 21.5533 20.9675 21.6863 20.8757C21.9774 20.6747 22.0523 20.4541 21.9734 20.0011C21.662 18.8135 21.2653 18.0016 20.4774 16.5006Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </div>
            </div>
          </div>

          <div className="w-[15dvw] border-2 p-3 rounded">
            <div className="flex">
              <div>
                <p className="text-2xl">5/15</p>
                <p className="text-gray-400">Quizes</p>
                <p className="text-green-500 font-bold">+1.05%</p>
              </div>
              <div className="pt-5 ps-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                  <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M6.5 10L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13.5 11C13.5 11 14 11 14.5 12C14.5 12 16.0882 9.5 17.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 16L10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M13.5 17C13.5 17 14 17 14.5 18C14.5 18 16.0882 15.5 17.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
