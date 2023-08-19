const TopHeader = () => {
  return (
    <div className="flex flex-col justify-between sticky top-0 items-center flex-grow">
      <div className="bg-gray-800 p-4">
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors text-4xl"
        >
          Diary
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
