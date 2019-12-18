interface Say1 {
  (words: string) : string
}
interface User {
  name: string
  age?: number
  readonly isMale: boolean,
  say: (words: string) => string,
  say1: Say1
}

// let user: User;
// user = {
//   name: '123',
//   isMale: true
// }
// user.isMale = false
// console.log(user);
interface Config {
  width?: number;
}

function  CalculateAreas(config: Config): { area: number} {
  let square = 100;
  if (config.width) {
      square = config.width * config.width;
  }
  return {area: square};
}

let mySquare = CalculateAreas({ widdth: 5 } as Config);
console.log(mySquare);