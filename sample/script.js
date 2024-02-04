async function quoteGenerate() {
  const response = await fetch("https://api.quotable.io/quotes?tags=love");
  var data = await response.json();
  const { results } = data;

  let filterQuote = results.filter((item) => {
    return item.length < 150;
  });

  let rn = Math.floor(Math.random() * filterQuote.length);

  const quoteTitle = document.querySelector(".quoteArea span");
  quoteTitle.textContent = filterQuote[rn].content;

  const quoteAuthor = document.querySelector(".quoteArea p");
  quoteAuthor.textContent = `- ${filterQuote[rn].author}`;
}
quoteGenerate();

let generateBtn = document.querySelector("#generate");

generateBtn.addEventListener("click", () => {
  quoteGenerate();
});

let downloadBtn = document.querySelector("#download");
var div = document.getElementById("downloadDiv");

downloadBtn.addEventListener("click", () => {
  var div = document.getElementById("downloadDiv");

  // Use html2canvas to create a screenshot of the div
  html2canvas(div).then(function (canvas) {
    // Create a link element
    var downloadLink = document.createElement("a");

    // Set the href attribute to the data URL of the canvas
    downloadLink.href = canvas.toDataURL("image/png");

    // Set the download attribute to specify the filename
    downloadLink.download = "quote.png";

    // Append the link to the body (required in some browsers)
    document.body.appendChild(downloadLink);

    // Trigger a click event on the link to start the download
    downloadLink.click();

    // Remove the link from the DOM
    document.body.removeChild(downloadLink);
  });
});

