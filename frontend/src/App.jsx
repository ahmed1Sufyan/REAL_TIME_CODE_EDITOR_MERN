import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import EditorPage from "./Pages/EditorPage.jsx";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <>
    <div>
      <Toaster
       position="top-right"
       reverseOrder={false}
       gutter={8}
       containerClassName=""
       containerStyle={{}}
       toastOptions={{
         // Define default options
         className: '',
         duration: 5000,
         style: {
           background: 'white',
           color: 'black',
         },
         success: {
           duration: 2000,
           theme: {
             primary: 'green',
             secondary: 'black',
           },
         },
       }}
      />
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/editorpage/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
