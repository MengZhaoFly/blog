import axios from 'axios'
function cbTest(cb) {
  setTimeout(() => {
    cb(123);
  }, 2000);
}

function fetchList() {
  return axios('/list').then(res => res.data);
}

function map(items, callback) {
  let r = []
  for (let index = 0; index < items.length; index++) {
    r.push(callback(items[index], index));
  }
  return r;
}
export {
  cbTest,
  fetchList,
  map
}