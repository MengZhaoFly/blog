const chars = "0123456789ABCDEFGHIJKLMNOPGQRSTUVWXYZ";
var add = function (str1, str2) {
    let a = str1.split(''), b = str2.split('');
    let alength = a.length;
    let blength = b.length;
    let m = Math.max(alength, blength);
    let inc = 0;
    let clength = chars.length;
    let result = "";
    for (let i = 0; i < m; i++) {
        // 低位开始相加
        // 当前位所在的 10 进制数
        let ia = i < alength ? chars.indexOf(a[alength - i - 1]) : 0;
        let ib = i < blength ? chars.indexOf(b[blength - i - 1]) : 0;
        let add = ia + ib + inc;
        // > 36
        if (add > clength) {
            inc = 1;
        } else {
            inc = 0;
        }
        result = chars.charAt(add % clength) + result;
    }
    if (inc > 0) {
        result = chars.charAt(inc) + result;
    }
    return result;
}
console.log(add('122B', '2X'))