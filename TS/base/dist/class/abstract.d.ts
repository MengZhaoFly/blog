declare abstract class Department {
    name: string;
    constructor(name: string);
    printName(): void;
    abstract printMeeting(): void;
}
declare class AccountingDepartment extends Department {
    constructor();
    printMeeting(): void;
    generateReports(): void;
}
declare let department: AccountingDepartment;
