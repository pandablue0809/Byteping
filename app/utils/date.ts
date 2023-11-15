export const getTime = (timestamp: string, needSeconds: boolean) => {
  const dateObject = new Date(timestamp);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  let amPm = "AM";
  let formattedHours = hours;

  // Convert to 12-hour format
  if (hours > 13) {
    formattedHours = hours - 12;
    amPm = "PM";
  } else if (hours === 0) {
    formattedHours = 12;
  }

  // Add leading zero for minutes and seconds if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  // Create the formatted time string
  let formattedTime;
  formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
  if (needSeconds) {
    formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
  }
  return formattedTime;
};

export const getDate = (timestamp: string) => {
  const dateObject = new Date(timestamp);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  let formattedMonth;

  if (month === 1) {
    formattedMonth = "January";
  } else if (month === 2) {
    formattedMonth = "February";
  } else if (month === 3) {
    formattedMonth = "March";
  } else if (month === 4) {
    formattedMonth = "April";
  } else if (month === 5) {
    formattedMonth = "May";
  } else if (month === 6) {
    formattedMonth = "June";
  } else if (month === 7) {
    formattedMonth = "July";
  } else if (month === 8) {
    formattedMonth = "August";
  } else if (month === 9) {
    formattedMonth = "September";
  } else if (month === 10) {
    formattedMonth = "October";
  } else if (month === 11) {
    formattedMonth = "November";
  } else if (month === 12) {
    formattedMonth = "December";
  } else {
    formattedMonth = "Invalid month";
  }

  const formattedDate = `${day} ${formattedMonth} ${year}`;
  const todayObject = new Date();
  if (day === todayObject.getDate() && month === todayObject.getMonth() && year === todayObject.getFullYear())
    return "Today";
  return formattedDate;
};
