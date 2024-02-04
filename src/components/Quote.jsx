import React from "react";

const Quote = ({ quote,loading, bg }) => {

  return (
    <div className="quote-container" style={{"background-image": `url(${bg})` }} id="downloadDiv">
      <div className="quoteArea">
        <span>{loading ? `${quote.content}` : "Loading Quote..."}</span>
        <p>- {loading ? `${quote.author}` : "Loading Author..."}</p>
      </div>
    </div>
  );
};

export default Quote;
