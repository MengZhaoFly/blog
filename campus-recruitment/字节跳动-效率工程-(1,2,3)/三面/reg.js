let reg1 = /\b/g;
var str = '[JS] Lesson_01.mp4';

str.replace(reg1, function() {
  console.log(arguments);
})

var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result); 
// => "[#JS#] #Lesson_01#.#mp4#"
// \b: 是单词边界，具体就是 \w ([0-9a-zA-Z_]) 和 \W (排除字符组[^0-9a-zA-Z_]的简写形式)之间的位置 

// \B就是\b的反面的意思，非单词边界。例如在字符串中所有位置中，扣掉\b，剩下的都是\B的。
var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
console.log(result); 
// => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"

// (?=p)，其中p是一个子模式，即p前面的位置。比如(?=l)，表示'l'字符前面的位置，例如：

var result = "hello".replace(/(?=l)/g, '#');
console.log(result); 
// => "he#l#lo"

// 而(?!p)就是(?=p)的反面意思，比如：

var result = "hello".replace(/(?!l)/g, '#');

console.log(result); 
// => "#h#ell#o#"
// var str = '1234567890';
// console.log('1234567890'.replace(/\B(?=((\d{3})+(?!\d)))/g, '#'))

// 3个数字不允许后面跟着数字;
console.log('1234567890'.replace(/\B(?=((\d{3})+))/g, '#'))
// `/\B(?=(\d{3})+(?!\d))/g`

//https://juejin.im/post/5965943ff265da6c30653879