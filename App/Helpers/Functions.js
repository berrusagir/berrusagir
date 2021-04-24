export const formattedDateTime = () => {
  const date = new Date();
  const day = date.getDate();
  const month = parseInt(date.getMonth()) + 1;
  const year = date.getFullYear();
  return `${monthName(month)} ${day}, ${year}`;
};
