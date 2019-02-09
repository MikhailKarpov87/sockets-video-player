const avatarColors = [
  "#78909c",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#ff9800",
  "#ffc107",
  "#f44336",
  "#8bc34a",
  "#03a9f4",
  "#009688"
];

export function getAvatarName(userName) {
  return userName
    .split(" ")
    .reduce((result, word) => result + word.slice(0, 1), "")
    .slice(0, 2);
}

export function colorize(userId) {
  let letters = userId.slice(0, 10).split("");
  let hash = letters
    .reduce((total, i) => total + i.charCodeAt(), letters[5].charCodeAt())
    .toString();
  return avatarColors[hash[1]];
}

export function getMessageTime(date) {
  const messageDate = new Date(date);
  const hours = messageDate.getHours() < 10 ? "0" + messageDate.getHours() : messageDate.getHours();
  const minutes =
    messageDate.getMinutes() < 10 ? "0" + messageDate.getMinutes() : messageDate.getMinutes();
  return hours + ":" + minutes;
}

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
