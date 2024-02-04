import React, { useEffect, useState } from "react";
import Quote from "./components/Quote";
import "./App.css";
import back from "./assets/bg.jpg";
import html2canvas from "html2canvas";
const App = () => {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState("");

  async function quoteGenerate() {
    const response = await fetch("https://api.quotable.io/quotes");
    var data = await response.json();
    const { results } = data;

    let filterQuote = results.filter((item) => {
      return item.length < 100;
    });

    let rn = Math.floor(Math.random() * filterQuote.length);
    setQuote(filterQuote[rn]);
    setLoading(true);
    setBg(back);
  }

  useEffect(() => {
    quoteGenerate();
  }, []);

  function downloadQuote() {
    const element = document.querySelector("#downloadDiv");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpg");
      link.download = "quote.jpg";
      link.click();
    });
  }

  return (
    <div className="app">
      <Quote quote={quote} loading={loading} bg={bg} />
      <div className="controls">
        <button onClick={downloadQuote}>
          <i className="fa-solid fa-download"></i>
        </button>
        <button onClick={quoteGenerate}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
