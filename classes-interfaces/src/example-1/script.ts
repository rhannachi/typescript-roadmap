class Department {
  private readonly id: string
  public name: string;
  protected employees: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log("employees:", this.employees);
  }
}
// ------------ ITDepartment ----------
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log({it});

// ------------ AccountingDepartment ----------
class AccountingDepartment extends Department {
  private readonly reports: string[]

  constructor(id: string, reports: string[]) {
    super(id, 'Accounting');
    this.reports = reports
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log("reports", this.reports);
  }

  // Overriding Properties employees
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.printReports();
accounting.printEmployeeInformation();
