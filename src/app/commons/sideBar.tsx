import Link from "next/link";

const SideBar = () => {
  return (
    <>
      {/* header of the side-bar  */}
      <div className="p-4 flex flex-col justify-between sticky top-0 items-center flex-grow">
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors 2xl:text-4xl text-lg md:text-2xl"
        >
          Diary Application
        </a>
      </div>
      {/* list of category */}
      <div>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/components/diary_input">
              <p className="text-gray-300 hover:text-white text-center text-2xl">
                diary
              </p>
            </Link>
          </li>
          <li>
            <Link href="/components/calendar">
              <p className="text-gray-300 hover:text-white text-center text-2xl">
                calendar
              </p>
            </Link>
          </li>
        </ul>
      </div>
      {/* footer of the side-bar for signing in and logging in */}
      <div className="absolute bottom-3 flex items-center flex-grow">
        <footer className="flex justify-between w-80 space-x-3">
          <div>
            <Link href="/components/login">
              <p className=" text-gray-300 hover:text-white text-center text-2xl">
                login
              </p>
            </Link>
          </div>
          <div>
            <Link href="/components/signIn">
              <p className="text-gray-300 hover:text-white text-center text-2xl">
                sign in
              </p>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SideBar;
