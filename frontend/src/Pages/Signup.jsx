import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const Signup = () => {
//   const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
// .then(FingerprintJS => FingerprintJS.load())
// fpPromise
// .then(fp => fp.get())
// .then(result => {
//   // This is the visitor identifier:
//   const visitorId = result.visitorId
//   console.log(result)
// })
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const onSubmit = ({ roomId, name }) => {
    // console.log(data);
    if(!roomId || !name)
    return toast.error("Please! Fill the required fields")
    setValue("roomId", "");
    navigate(`/editorpage/${roomId}`, { state: {
      name ,
      roomId
    } });
  };

  const generateRoomId = () => {
    // Generate Room ID logic goes here
    // For simplicity, I'll generate a random 4-digit number
    const roomId = uuidv4();
    // Set the generated room ID value to the form field
    setValue("roomId", roomId);
    toast.success("Created a new room ID")
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
      <div className="max-w-md w-96 h-96 mx-auto mt-8 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="roomId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Room ID:
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              {...register("roomId")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Room ID"
            />
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={generateRoomId}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Room ID
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
