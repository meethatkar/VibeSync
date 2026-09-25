import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  return (
    <SongContext.Provider value={{ songs, setSongs }}>
      {children}
    </SongContext.Provider>
  );
};
