function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  // id
  if (selector.charAt(0) == '#') {
    let attr = element.attributes.filter(attr => attr.name === 'id');
    if (attr && attr[0] && attr[0].value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) == '.') {
    let attr = element.attributes.filter(attr => attr.name === 'class');
    if (attr && attr[0] && attr[0].value === selector.replace('.', '')) {
      return true;
    }
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}
module.exports = {
  match
}