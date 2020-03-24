import React, { useState, Suspense } from 'react';
function fetchUserName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({name: 'Li Hua'})
    }, 3000)
  })
}
// 只要在 组件内部 throw 一个 promise 
// Suspense 就能够 回退到 fallback 的状态
function profilePage() {
  // ProfilePage: xhr 请求：请求过程中 也会 loading
  const userNamePromise = fetchUserName();
  let status = 'pengding';
  let result;
  let suspenseRender = userNamePromise.then(r => {
    status = 'success';
    result = r;
  })
  console.log('status', status)
  return {
    user: () => {
      if (status === 'pengding') {
        throw suspenseRender;
      } else {
        return result;
      }
    }
  }
}
const obj = profilePage();
export default function ProfileContent() {
  // 导致 ProfileContent 一直执行 -> 又导致 profilePage() 一直执行 
  // const userName = .user();
  const userName = obj.user();
  console.log('userName', userName);
  return (
    <h2>
      { userName.name }
    </h2>
  )
}