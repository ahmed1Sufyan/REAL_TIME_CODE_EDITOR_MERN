import axios from "axios";
import { CODE_SNIPPET, LANGUAGE_VERSIONS } from "./constants";
// import { version } from 'react'

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executecode = async ( language, sourceCode ) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
