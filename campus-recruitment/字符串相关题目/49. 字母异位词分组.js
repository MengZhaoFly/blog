var groupAnagrams = function(strs) {
  // { 'ate': [] }
  let hash = {};
  for (let str of strs) {
    let key = [...str].sort().join('');
    if (hash[key] === undefined) hash[key] = [];
    hash[key].push(str);
  }
  // {} => []
  return Object.keys(hash).map(key => hash[key]);
};