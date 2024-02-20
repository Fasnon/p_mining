import dayjs from "dayjs";

export function getData(arg) {
  const { sDate, eDate } = arg || {};
  const data = require("./data/STP_Data.json");
  var filteredData;
  filteredData = data;
  if (sDate) {
    filteredData = filteredData.filter(
      (data) => Date.parse(data.startDate) > dayjs(sDate) - 1,
    );
  }
  if (eDate) {
    filteredData = filteredData.filter(
      (data) =>
        Date.parse(data.transactions.slice(-1)[0].changeDate) <
        dayjs(eDate) + 24 * 3600 * 1000,
    );
  }
  return filteredData;
}

export function getCounts({ sDate, eDate }) {
  const data = getData({ sDate: sDate, eDate: eDate });

  const STP_count = data.filter((data) => data.stpStatus == "yes").length;
  const nonSTP_count = data.filter((data) => data.stpStatus == "no").length;
  const total_count = data.length;
  return {
    STP_count: STP_count,
    nonSTP_count: nonSTP_count,
    total_count: total_count,
  };
}

export function getThroughputTime({ sDate, eDate }) {
  const data = getData({ sDate: sDate, eDate: eDate });
  const sum = Object.values(data).reduce(
    (acc, current) =>
      acc +
      (Date.parse(current.transactions.slice(-1)[0].changeDate) -
        Date.parse(current.startDate)) /
        (1000 * 3600 * 24),
    0,
  );
  const average = sum / Object.values(data).length;
  const LessOneDay = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
      1 * 1000 * 3600 * 24,
  ).length;
  const LessTwoDays = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
        2 * 1000 * 3600 * 24 &&
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) >
        1 * 1000 * 3600 * 24,
  ).length;
  const LessFiveDays = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
        5 * 1000 * 3600 * 24 &&
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) >
        2 * 1000 * 3600 * 24,
  ).length;

  const LessSevenDays = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
        7 * 1000 * 3600 * 24 &&
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) >
        5 * 1000 * 3600 * 24,
  ).length;

  const LessTwoWeeks = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) <=
        14 * 1000 * 3600 * 24 &&
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) >
        7 * 1000 * 3600 * 24,
  ).length;

  const MoreTwoWeeks = data.filter(
    (data) =>
      Date.parse(data.transactions.slice(-1)[0].changeDate) -
        Date.parse(data.startDate) >
      14 * 1000 * 3600 * 24,
  ).length;

  return {
    MeanThroughputTime: average,
    timeCounts: [
      LessOneDay,
      LessTwoDays,
      LessFiveDays,
      LessSevenDays,
      LessTwoWeeks,
      MoreTwoWeeks,
    ],
  };
}

export function getAllBusinessIK() {
  const data = getData();
  var arr = [];
  console.log(data);

  for (var m in data) {
    console.log(m);
    arr.push(data[m].businessInternalKey);
  }
  console.log(arr);
  return arr;
}

export function indivLookup(arg) {
  const { businessIK } = arg || {};
  const data = getData();
  const transaction = data.filter(
    (data) => data.businessInternalKey == businessIK,
  );

  if (transaction.length == 0) {
    return null;
  }
  console.log(transaction[0].transactions.slice(-1)[0].changeDate);
  console.log(transaction[0].startDate);

  const map = new Map();
  for (var b in transaction[0].transactions) {
    const step = transaction[0].transactions[b];
    if (map.has(step["transactionStatus"])) {
      map.set(
        step["transactionStatus"],
        map.get(step["transactionStatus"]) + 1,
      );
    } else {
      map.set(step["transactionStatus"], 1);
    }
  }
  var steps = 0;
  var instances = 0;
  console.log(map);
  map.forEach((value) => {
    steps = steps + 1;
    instances = instances + value;
  });
  console.log(steps, instances);
  return {
    ThroughputTime:
      (Date.parse(transaction[0].transactions.slice(-1)[0].changeDate) -
        Date.parse(transaction[0].startDate)) /
      (3600 * 24 * 1000),
    RepeatedSteps: instances - steps,
  };
}


export function getVariantCounts({ sDate, eDate }){
  const data = getData({ sDate: sDate, eDate: eDate });

  const map = new Map();
  console.log(map);

  for (var m in data) {
    var str = ""
    for (var j in data[m].transactions){
      str += data[m].transactions[j].transactionStatus
    }
    if (map.has(str)) {
      map.set(
        str,
        map.get(str) + 1,
      );
    } else {
      map.set(str, 1);
    }
  }

  return Object.fromEntries(map)
}


export function indivTransactions(arg) {
  const { businessIK } = arg || {};
  const data = getData();

  const transaction = data.filter(
    (data) => data.businessInternalKey == businessIK,
  );

  console.log("dsf" + transaction)
  if (transaction.length == 0) {
    return null;
  }
  return transaction[0].transactions


}