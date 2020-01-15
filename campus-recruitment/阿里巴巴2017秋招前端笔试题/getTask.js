const titleNode = document.querySelector('.subject-content .subject-question');
let title = titleNode.textContent;
let choose = [];
const options = document.querySelectorAll('.subject-content .subject-options')
if (options) {
  choose = [...options].map(node => {
    return node.textContent.trim()
  })
}
console.log(title)
choose.forEach(c => {
  console.log(c)
})