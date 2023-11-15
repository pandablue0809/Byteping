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
