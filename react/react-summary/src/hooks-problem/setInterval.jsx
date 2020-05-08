import React, { useState, useEffect } from 'react';
export default function() {
  const [date, setDate] = useState(new Date().toLocaleTimeString())
  const [time, setTime] = useState('');
  useEffect(() => {
    setInterval(() => {
      timeTick()
    }, 1000)
  }, [])
  const timeTick = () => {
    setDate(new Date().toLocaleTimeString());
    console.log(date);
  }
  return (
    <div>
      {date}
      {}
    </div>
  )
}