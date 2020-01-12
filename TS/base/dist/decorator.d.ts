declare function classDecorator<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
declare class Greeter {
    property: string;
    hello: string;
    constructor(m: string);
    log(): void;
}
