/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
  let res = new Array(num_people).fill(0);
  let i = 0;
  while(candies > 0) {
    if (candies > i + 1) {
      res[ i % num_people] = i + 1 + res[ i % num_people]
      candies = candies - ( i + 1);
    } else {
      res[ i % num_people] = candies + res[ i % num_people]
      candies = candies - candies;
    }
    i ++;
  }
  return res;
};
// console.log(distributeCandies(10, 3))