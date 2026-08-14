import { useState } from "react";
import { askGemini } from "../../services/gemini";

function TestGemini() {
  const [answer, setAnswer] = useState("");

  const test = async () => {
    try {
      alert("Button Clicked!");

      const response = await askGemini(
        "Say hello to my AI Security Platform."
      );

      setAnswer(response);
    } catch (err) {
      console.error(err);
      alert("ERROR - Check Console (F12)");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        background: "#070B16",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "yellow",
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        GEMINI TEST PAGE
      </h1>

      <button
        onClick={test}
        style={{
          background: "red",
          color: "white",
          padding: "18px 40px",
          fontSize: "26px",
          border: "3px solid yellow",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      >
        CLICK GEMINI
      </button>

      <div
        style={{
          marginTop: "40px",
          whiteSpace: "pre-wrap",
          fontSize: "20px",
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default TestGemini;