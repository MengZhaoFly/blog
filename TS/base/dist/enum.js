"use strict";
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 0] = "Up";
    Direction1[Direction1["Down"] = 1] = "Down";
    Direction1[Direction1["Left"] = 2] = "Left";
    Direction1[Direction1["Right"] = 3] = "Right";
})(Direction1 || (Direction1 = {}));
(function (Direction1) {
    Direction1[Direction1["a"] = 0] = "a";
})(Direction1 || (Direction1 = {}));
var ea;
var Animal;
(function (Animal) {
    Animal[Animal["Dog"] = 0] = "Dog";
    Animal[Animal["Cat"] = 1] = "Cat";
})(Animal || (Animal = {}));
ea = Direction1.Up;
ea = Direction1.a;
ea = 123;
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month || (Month = {}));
function isSummer(month) {
    switch (month) {
        case Month.June:
        case Month.July:
        case Month.August:
            return true;
        default:
            return false;
    }
}
(function (Month) {
    function isSummer(month) {
        switch (month) {
            case Month.June:
            case Month.July:
            case Month.August:
                return true;
            default:
                return false;
        }
    }
    Month.isSummer = isSummer;
})(Month || (Month = {}));
console.log(isSummer(Month.July));
console.log(Month);
var Person;
(function (Person) {
    var a = 123;
    function getA() {
        return a;
    }
    Person.getA = getA;
})(Person || (Person = {}));
console.log('Person', Person, Person.getA());
//# sourceMappingURL=enum.js.map