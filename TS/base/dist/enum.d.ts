declare enum Direction1 {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}
declare enum Direction1 {
    a = 0
}
declare let ea: Direction1;
declare enum Animal {
    Dog = 0,
    Cat = 1
}
declare enum Month {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}
declare function isSummer(month: Month): boolean;
declare namespace Month {
    function isSummer(month: Month): boolean;
}
declare namespace Person {
    function getA(): number;
}
