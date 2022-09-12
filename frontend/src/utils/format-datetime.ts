function formatDatetime(dateTime: string) {
  const temp = new Date(dateTime);
  const date = temp.toLocaleDateString('en-US');
  const time = temp.toLocaleTimeString('en-US');
  return date.concat(' ').concat(time);
}

export default formatDatetime;
