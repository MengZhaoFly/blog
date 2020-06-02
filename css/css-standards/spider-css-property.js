
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    }
    element.addEventListener(event, handler);
  })
}

void async function () {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, "load");
  }
}();
