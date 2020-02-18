var isSymmetric = function(root) {
  if (!root) return true;
  function mirror(leftRoot, rightRoot) {
    if (!leftRoot && !rightRoot) return true;
    if (!leftRoot || !rightRoot) return false;
    let isMirror = leftRoot.val === rightRoot.val;

    // let flag = leftRoot.left.val === rightRoot.right.val && 
    // leftRoot.right.val === rightRoot.left.val; 
    return isMirror && 
    mirror(leftRoot.left, rightRoot.right) && 
    mirror(leftRoot.right, rightRoot.left);
  }
  return mirror(root.left, root.right);
}