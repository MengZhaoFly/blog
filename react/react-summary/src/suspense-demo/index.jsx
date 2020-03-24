import React, { useState, Suspense } from 'react';
// function ProfilePage() {

// }
// export default function SuspenseDemo() {
//   return (
//     <Suspense fallback={<div>loading profile</div>}>
//       <ProfilePage />
//     </Suspense>
//   )
// }
// 加载中 我们会 : laoding
const ProfilePage = React.lazy(() => import('./ProfilePage')); // Lazy-loaded


// Show a spinner while the profile is loading
export default function App() {
  return (
    <Suspense fallback={<div>App loading</div>}>
      {/* fallback 完了 之后 就应该是 用户真实看到的内容
      不是 我这个 Suspense loading 完了之后 ，再接着再给他 一个 ProfilePage 的 laoding
      */}
      <ProfilePage />
    </Suspense>
  )
}