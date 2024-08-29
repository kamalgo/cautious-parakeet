export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("forstu", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("forstu"))) {
      return JSON.parse(localStorage.getItem("forstu"));
      
    }
    return false;
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("forstu");
    next();
  }
};

export const setOTPSecret = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("otpsecret", JSON.stringify(data));
    next();
  }
};

export const getOTPSecret = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("otpsecret"))) {
      return JSON.parse(localStorage.getItem("otpsecret"));
    }
    return false;
  }
};
