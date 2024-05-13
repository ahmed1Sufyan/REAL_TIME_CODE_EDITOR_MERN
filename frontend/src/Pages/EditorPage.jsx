import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Clients from "../Components/Clients";
import Editor from "../Components/Editorarea";
import Editorarea from "../Components/Editorarea";
import { initSocket } from "../socket";
import Actions from "../Actions";
import toast from "react-hot-toast";

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const socketRef = useRef(null);
  const handleErrors = () => {
    navigate("/");
    console.log("Connection failed. Please refresh the page");
    toast.error("Connection failed. Please refresh the page");
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));
      socketRef.current.emit(Actions.JOIN, {
        username: location?.state.name,
        roomId: location?.state.roomId,
      });
      socketRef.current.on(
        Actions.JOINED,
        ({ clients, username, socketId }) => {
          console.log(clients);
          setClients(clients);
          if (username !== location?.state.name) {
            toast.success(username + " joined the room");
            console.log("han");
          }
          console.log(username);
          console.log(socketId);
        }
      );

      socketRef.current.on(Actions.DISCONNECT, ({ socketId, username }) => {
        toast.success(username + " left the room");
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOIN);
      socketRef.current.off(Actions.DISCONNECT);
    };
  }, []);

  if (!location?.state.name || !location?.state.roomId) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-[100vh] w-full bg-gray-800">
      <div className="h-full flex">
        <div className="bg-gray-800 w-[20vw] h-full text-white font-sans font-bold">
          <h2 className="text-center pt-5 text-3xl">REAL TIME EDITOR</h2>
          <h3 className="text-center pt-5 text-2xl text-blue-400">
            Connected Users
          </h3>
          <div className="flex ml-5 gap-3 mt-5 font-sans">
            {clients.map((client) => {
              return (
                <Clients key={client.socketId} username={client.username} />
              );
            })}
          </div>
        </div>
        <div className="">
          <Editorarea
            socketRef={socketRef}
            username={location?.state.name}
            roomId={location?.state.roomId}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
