import { createContext, useEffect, useState } from "react";

export const tokenContextObject = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <tokenContextObject.Provider value={{ token, setToken }}>
      {children}
    </tokenContextObject.Provider>
  );
}
