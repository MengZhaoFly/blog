interface LabelledValue {
    label: string;
}
declare function printLabel(labelledObj: LabelledValue): void;
declare let myObj: {
    size: number;
    label: string;
};
interface SearchFunc {
    (source: string, subString: string): boolean;
}
declare let mySearch: SearchFunc;
interface Person1 {
    name: string;
    age: number;
}
interface PersonArray {
    [index: number]: Person1;
}
declare let manyPerson: PersonArray;
interface ClockConstructor {
    new (hour: number, minute: number): number;
}
declare class Control {
    private state;
}
interface SelectableControl extends Control {
    select(): void;
}
declare class Button extends Control implements SelectableControl {
    select(): void;
}
declare class TextBox extends Control {
    select(): void;
}
