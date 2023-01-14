abstract class DepartmentA {
    static fiscalYear = 2020;
    protected readonly id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;
}

class ITDepartmentA extends DepartmentA {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}

class AccountingDepartmentA extends DepartmentA {
    private lastReport: string;
    private static instance: AccountingDepartmentA;
    private reports: string[]
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    private constructor(id: string, reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
        this.reports = reports
    }

    static getInstance() {
        if (AccountingDepartmentA.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartmentA('d2', []);
        return this.instance;
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

}

const employee1 = DepartmentA.createEmployee('Max');
console.log({ employee1, fiscalYear: DepartmentA.fiscalYear});

const itA = new ITDepartmentA('d1', ['Max']);

itA.describe();
itA.name = 'NEW NAME';

console.log({ itA });

const accountingA = AccountingDepartmentA.getInstance();
const accounting2 = AccountingDepartmentA.getInstance();

accountingA.mostRecentReport = 'Year End Report';
accountingA.addReport('Something went wrong...');

console.log({ accountingA });
console.log({ accounting2 });

accountingA.describe();
