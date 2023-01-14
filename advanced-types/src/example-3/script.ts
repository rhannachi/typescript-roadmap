
/**
 * *** Type Guards ***
 * TypeScript utilise des opérateurs JavaScript intégrés tels que:
 * typeof, instanceof et in, pour déterminer si un objet contient une propriété.
 */

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee): string {
  if ('privileges' in emp) {
    return 'Privileges: ' + emp.privileges
  }
  if ('startDate' in emp) {
    return 'Start Date: ' + emp.startDate
  }
  return ''
}

console.log('Example 3')
console.log({ printEmployeeInformation: printEmployeeInformation({ name: 'Manu', startDate: new Date() }) })
console.log()