export const formatTime = (timeInSecs) => {
  if (isNaN(timeInSecs) || timeInSecs === null) return "00:00";
  const minutes = Math.floor(timeInSecs / 60);
  const seconds = Math.floor(timeInSecs % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
