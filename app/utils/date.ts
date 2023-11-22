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
    formattedMonth = "Jan";
  } else if (month === 2) {
    formattedMonth = "Feb";
  } else if (month === 3) {
    formattedMonth = "Mar";
  } else if (month === 4) {
    formattedMonth = "Apr";
  } else if (month === 5) {
    formattedMonth = "May";
  } else if (month === 6) {
    formattedMonth = "Jun";
  } else if (month === 7) {
    formattedMonth = "Jul";
  } else if (month === 8) {
    formattedMonth = "Aug";
  } else if (month === 9) {
    formattedMonth = "Sep";
  } else if (month === 10) {
    formattedMonth = "Oct";
  } else if (month === 11) {
    formattedMonth = "Nov";
  } else if (month === 12) {
    formattedMonth = "Dec";
  } else {
    formattedMonth = "Invalid month";
  }

  const formattedDate = `${day} ${formattedMonth} ${year}`;
  const todayObject = new Date();
  if (day === todayObject.getDate() && month === todayObject.getMonth() && year === todayObject.getFullYear())
    return "Today";
  return formattedDate;
};
