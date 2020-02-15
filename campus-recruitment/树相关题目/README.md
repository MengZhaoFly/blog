
## 构造二叉树系列

- #105. 从前序与中序遍历序列构造二叉树[1]
  
  前序遍历 preorder = [3,9,20,15,7] root left(1) right(root/left/right)
  中序遍历 inorder = [9,3,15,20,7]  left(1) root right
    3
  /   \
 9    20  20 ?
     /  \
    15   7

- #106. 从中序与后序遍历序列构造二叉树[2]
  中序遍历 inorder = [9,3,15,20,7]  left root right
  后序遍历 postorder = [9,15,7,20,3]  left right root
- #889. 根据前序和后序遍历构造二叉树[3]
  输入：pre = [1,2,4,5,3,6,7],  root left right
  post = [4,5,2,6,7,3,1]       left right root
  // 前序遍历 第一访问的
  // 后续遍历 最后一个访问的
        1
      /   \
     2     3
   /  \   /  \
  4   5  6    7
## 226. 翻转二叉树

## 二叉树的深度

- #104 二叉树的最大深度
- #111. 二叉树的最小深度

     1  最小深度：1
    /  \
  2 1   null 0



