import dayjs from "dayjs";

// Date 내장 객체
const todayNewDate = new Date();
const year = todayNewDate.getFullYear();
const month = todayNewDate.getMonth() + 1;
const day = todayNewDate.getDate();
const dateFormat = (year, month, day) => {
  const tempMonth = month < 10 ? `0${month}` : month;
  const tempDay = day < 10 ? `0${day}` : day;
  return `${year}-${tempMonth}-${tempDay}`;
}

console.log('Today: ' + dateFormat(year, month, day));

// dayjs package
const todayDayjs = dayjs().format('YYYY-MM-DD');
console.log('Today: ' + todayDayjs);