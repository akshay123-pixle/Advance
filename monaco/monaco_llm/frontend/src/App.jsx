import React from "react";
import { useEffect } from "react";
import XmlEditor from "../components/XmlEditor";

const App = () => {
  // useEffect(() => {
  //   async function fetchAnswer() {
  //     const res = await fetch("http://localhost:4000/api/deepseek", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt: "Who is the PM of India?" }),
  //     });

  //     const data = await res.json();
  //     console.log("ans",data.text); // AI answer
  //     // setAnswer(data.text);
  //   }
  //   fetchAnswer()
  // });
  return (
    <div>
      <h1>Monaco XML Editor</h1>
      <XmlEditor />
    </div>
  );
};

export default App;
