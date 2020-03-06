process.on('message', data => {
  console.log(process.pid, data);
})
