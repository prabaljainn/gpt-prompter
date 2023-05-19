document.addEventListener(
  "click",
  function (event) {
    event.preventDefault(); // prevent the default action
    let element = event.target; // get the element clicked
    let text = element.textContent; // get the text content from the element
    console.log(element);
    alert(text); // log the text
    // you may want to save this text somewhere
  },
  true
);
