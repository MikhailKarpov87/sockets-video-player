export function initGoogleAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/platform.js";

  script.onload = () => {
    window.gapi.load("auth2", function() {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
      });
    });
  };

  document.body.appendChild(script);
}

//  Функции для работы с localStorage - чтение/запись/очистка
export function writeToLocalStorage(token, googleToken, userName, userId) {
  if (!token || !googleToken || !userName || !userId) {
    return false;
  }
  localStorage.setItem("token", token);
  localStorage.setItem("googleToken", googleToken);
  localStorage.setItem("userName", userName);
  localStorage.setItem("userId", userId);
}

export function readFromLocalStorage() {
  const token = localStorage.getItem("token");
  const googleToken = localStorage.getItem("googleToken");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  return { token, googleToken, userName, userId };
}

export function clearLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("googleToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
}
