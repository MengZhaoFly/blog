interface Say1 {
    (words: string): string;
}
interface User {
    name: string;
    age?: number;
    readonly isMale: boolean;
    say: (words: string) => string;
    say1: Say1;
}
interface Config {
    width?: number;
}
declare function CalculateAreas(config: Config): {
    area: number;
};
declare let mySquare: {
    area: number;
};
