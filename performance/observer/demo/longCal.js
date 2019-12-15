
let frag = document.createDocumentFragment();
function task() {
  for (var i = 0; i < 10000; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    frag.appendChild(li);
  }
  document.body.appendChild(frag);
}
task()
setTimeout(() => {
  const li = document.querySelector('li');
  li.style.display = 'none';
}, 3000);