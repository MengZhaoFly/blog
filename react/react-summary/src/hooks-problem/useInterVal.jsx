import React, { useState, useEffect } from 'react';
const useInterval = (callback, delay) => {
  useEffect(() => {
      if (delay !== null) {
          let id = setInterval(callback, delay);
          return () => clearInterval(id);
      }
  }, [delay]);
};
const Home = () => {
  const [count, setCount] = useState(0);
  
  useInterval(() => {
      console.log(count);
      setCount(count + 1);
  }, 500);

  return (
    <div> { count } </div>
  );
}
export default Home;