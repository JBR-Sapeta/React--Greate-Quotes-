export const getLocalStorageAuthData = () => {
  const storedToken = localStorage.getItem("gq-token");
  const storedExpirationTime = localStorage.getItem("gq-expiresIn");
  const storedUserId = localStorage.getItem("gq-userId");
  const storedNick = localStorage.getItem("gq-nick");

  if (storedExpirationTime) {
    const currentTime = new Date().getTime();
    const expirationTime = new Date(storedExpirationTime).getTime();


    const remainingTime = expirationTime - currentTime;
    

    if (remainingTime <= 7200) {
      localStorage.removeItem("gq-token");
      localStorage.removeItem("gq-expiresIn");
      localStorage.removeItem("gq-userId");
      localStorage.removeItem("gq-nick");
      return {
        isLoggedIn: false,
        idToken: "",
        expiresIn: "",
        userId: "",
        nick: "",
      };
    }
    return {
      isLoggedIn: true,
      idToken: storedToken,
      expiresIn: storedExpirationTime,
      userId: storedUserId,
      nick: storedNick,
    };
  }
  return {
    isLoggedIn: false,
    idToken: "",
    expiresIn: "",
    userId: "",
    nick: "",
  };
};

export const setLocalStorageAuthData = (token, expiresIn, userId, nick) => {

  const currentTime = new Date();
  const expirationDate = new Date( currentTime.getTime() + expiresIn*1000);
 
  localStorage.setItem("gq-token", token);
  localStorage.setItem("gq-expiresIn", expirationDate);
  localStorage.setItem("gq-userId", userId);
  localStorage.setItem("gq-nick", nick);
};

export const removeLocalStorageAuthData = () => {
  localStorage.removeItem("gq-token");
  localStorage.removeItem("gq-expiresIn");
  localStorage.removeItem("gq-userId");
  localStorage.removeItem("gq-nick");
};
