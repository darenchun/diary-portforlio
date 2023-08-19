const Login = () => {
  const eventHandler_onclick = (tag_info: any) => {
    console.log("tag information", tag_info);
  };

  return (
    <div className="justify-items-center">
      <h2 className="text-2xl p-4">Login</h2>
      <input
        id="id"
        type="text"
        placeholder="id"
        className="border-1 border-black my-2"
      />
      <input
        id="password"
        type="password"
        placeholder="password"
        className="border-1 border-black my-2"
      />
      <button
        onClick={eventHandler_onclick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
      >
        login
      </button>
    </div>
  );
};

export default Login;
