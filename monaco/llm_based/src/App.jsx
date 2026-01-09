import React, { useState, useEffect } from "react";
import { deepseek } from "./ai/worker";


export default function App() {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function fetchAnswer() {
      const res = await deepseek("Who is the PM of India?");
      setAnswer(res);
    }
    fetchAnswer();
  }, []);

  return (
    <div>
      <h1>DeepSeek Test</h1>
      <p>Answer: {answer}</p>
    </div>
  );
}
