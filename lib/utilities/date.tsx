export function date(dateTime: string): [string, string, string] {
  let date = new Date(Date.parse(dateTime));
  let dayMonthYear: [string, string, string] = [
    date.toString().split(" ")[2],
    date.toString().split(" ")[1],
    date.toString().split(" ")[3],
  ];
  return dayMonthYear;
}
