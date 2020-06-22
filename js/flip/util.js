var preload = (imgs) => {
  return new Promise((resolve, reject) => {
    if (!imgs.length) {
      resolve()
    }
    const length = imgs.length
    let count = 0

    const load = (src) => {
      let img = new Image()
      const checkIfFinished = () => {
        count++
        if (count === length) {
          resolve(imgs)
        }
      }

      img.onload = checkIfFinished
      img.onerror = checkIfFinished

      img.src = src
    }
    imgs.forEach(load)
  })
}