// 结果来自： https://www.w3.org/TR/?title=&tag=css&status=&version=#
var lis = document.getElementById("container").children
var result = [];

for (let li of lis) {
  if (li.getAttribute('data-tag').match(/css/))
    result.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href
    })
}
console.log(result)
