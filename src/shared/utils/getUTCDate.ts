export default function getUTCDate(date: string) {
  const dateObject = new Date(date);
  return dateObject.toUTCString();
}
