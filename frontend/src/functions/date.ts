export const dateSplicer = (
  startDate: Date,
  endDate: Date,
  seperate: number
) => {
  const dateArray = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setMinutes(currentDate.getMinutes() + seperate);
  }
  return dateArray;
};

export const convertDay = (day: number) => {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "";
  }
};
