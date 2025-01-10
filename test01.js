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

// Thêm ví dụ khác với dayjs
// Lấy ngày hiện tại
const now = dayjs();
console.log('Current Date and Time: ' + now.format('YYYY-MM-DD HH:mm:ss'));

// Thêm 7 ngày vào ngày hiện tại
const nextWeek = now.add(7, 'day');
console.log('Next Week: ' + nextWeek.format('YYYY-MM-DD'));

// Trừ 1 tháng từ ngày hiện tại
const lastMonth = now.subtract(1, 'month');
console.log('Last Month: ' + lastMonth.format('YYYY-MM-DD'));

// Kiểm tra xem một ngày có phải là trước ngày khác không
const isBefore = dayjs('2023-01-01').isBefore('2023-12-31');
console.log('Is 2023-01-01 before 2023-12-31? ' + isBefore);

// Định dạng ngày theo kiểu khác
const formattedDate = now.format('dddd, MMMM D, YYYY h:mm A');
console.log('Formatted Date: ' + formattedDate);