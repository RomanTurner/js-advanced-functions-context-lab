/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employees) => {
  return employees.map((employee) => {
    return createEmployeeRecord(employee);
  });
};

function createTimeInEvent(timeStamp) {
  let [date, hour] = timeStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: +hour,
  });
  return this;
}

function createTimeOutEvent(timeStamp) {
  let [date, hour] = timeStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: +hour,
  });
  return this;
}

function hoursWorkedOnDate(dayInQuestion) {
  let clockIn = this.timeInEvents.find((day) => day.date === dayInQuestion);
  let clockOut = this.timeOutEvents.find((day) => day.date === dayInQuestion);

  return Math.abs((clockOut.hour - clockIn.hour) / 100);
}

function wagesEarnedOnDate(dayInQuestion) {
  let hours = hoursWorkedOnDate.call(this, dayInQuestion);
  return hours * this.payPerHour;
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  return employees.reduce((accumulator, employee) => {
    return accumulator + allWagesFor.call(employee);
  }, 0);
}
