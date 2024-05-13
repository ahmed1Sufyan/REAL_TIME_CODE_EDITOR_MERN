import React, { useEffect, useRef, useState } from "react";
// import { Codemirror } from 'codemirror'
import { json } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import { CODE_SNIPPET } from "../constants";
import { executecode } from "../api";
import Actions from "../Actions";

const Editorarea = ({ socketRef, username, roomId }) => {
  const [editor, seteditor] = useState("");
  const [code, setCode] = useState(`// Write your code here. \n`);
  const [language, setLanguage] = useState("Css");
  const [font, setFont] = useState(16);
  const [output, setOutput] = useState("Output Here");
  // State to hold the selected theme
  const [theme, setTheme] = useState("vs-dark");
  // const editorRef2 = useRef()
  const editorRef = useRef();
  useEffect(() => {
    const init = () => {
      socketRef?.current?.on(
        Actions.SYNC_CODE,
        ({ code, name, out, lang, them, fonts }) => {
          console.log("code", code);
            setCode(code);
          
          setOutput(out);
          setLanguage(lang);
          setTheme(them);
          setFont(fonts);
                
        }
      );
    };
    init();
  }, [socketRef.current,code,output,language,font,theme]);
  // useEffect(()=>{
  //     async function init()
  //     {
  //         Codemirror.fromTextArea(document.getElementById("realtimeEditor"),{
  //             mode : {name : "javascript",json : true},
  //             theme : 'dracula'
  //         })
  //     }
  //     init()
  // },[])
  // <textarea

  //   id="realtimeEditor"
  //   onChange={(e) => seteditor(e.target.value)}
  //   value={editor}
  //   className="resize-none w-[80vw] h-[97vh]"
  // />

  // State to hold the selected language
  
  const Mount = (editors) => {
    editorRef.current = editors;
    editors.focus();
  };
  // Function to handle code changes
  // const handleCodeChange = (newCode) => {
  //   setCode(newCode);
  // };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    if (e.target.value === "javascript") setCode(CODE_SNIPPET[e.target.value]);
    else setCode("//Write Your Here!");
  };

  // Function to handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

 
  const handleFontChange = (e) => {
    setFont(e.target.value);
  };
  // Options for the Monaco Editor
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    // automaticLayout: false,
    fontSize: font,
    autoClosingBrackets: "always", // Enable auto-closing of brackets
    autoCloseTags: true,
    autoClosingTags: true,
  };
  // extraSmall--16 small--17 medium--18 large--22 extraLarge--24

  const CodeHandler = async () => {
    if (!code) return;
    try {
      const { run: result } = await executecode(language, code);
      console.log(result.output);
      setOutput(result.output);
    } catch (error) {}
  };
  const codeChangeHandler = (changecode) => {
    setCode(changecode);
    console.log(changecode);
    socketRef.current.emit("change", {
      code: changecode,
      roomId,
      username,
      output,
      language,
      theme,
      font,
    });
  };
  return (
    <>
      <div className="mb-2 space-x-4 font-bold">
        <label className="text-gray-300 " htmlFor="language">
          Languages:
        </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          {/* Add more languages as needed */}
        </select>
        <label className="text-gray-300" htmlFor="font">
          Font Size:
        </label>
        <select id="font" value={font} onChange={handleFontChange}>
          <option value="16">Extra Small</option>
          <option value="17">Small</option>
          <option value="18">Medium</option>
          <option value="22">Large</option>
          <option value="24">Extra Large</option>
        </select>
        <label className="text-gray-300" htmlFor="theme">
          Theme:
        </label>
        <select id="theme" value={theme} onChange={handleThemeChange}>
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast</option>
          <option value="hc-white">High Contrast White</option>
          <option value="github">GitHub</option>
          <option value="monokai">Monokai</option>
        </select>
      </div>
      <div className="flex">
        <Editor
          height="95vh"
          width={"60vw"}
          language={language}
          theme={theme}
          onMount={Mount}
          value={code}
          options={editorOptions}
          // onChange={(Code) => setCode(Code)}
          onChange={codeChangeHandler}
        />
        <div className="w-auto text-white">
          <div className="flex justify-around items-center">
            <h1>Code Output</h1>
            <button
              onClick={CodeHandler}
              className="bg-blue-900 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Run
            </button>
            <button
              onClick={() => setOutput("Output Here")}
              className="bg-blue-900 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Clear
            </button>
          </div>
          <Output output={output} />
        </div>
      </div>
    </>
  );
};

export default Editorarea;
