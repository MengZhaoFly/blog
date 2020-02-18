var groupAnagrams = function(strs) {
  let hash = {};
  for (let str of strs) {
    let key = [...str].sort();
    if (hash[key] === undefined) hash[key] = [];
    hash[key].push(str);
  }
  return Object.keys(hash).map(key => hash[key])
};