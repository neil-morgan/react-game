import React, { useState, createContext } from "react";

const CommentatorContext = createContext();

const CommentatorProvider = ({ children }) => {
  const [bar, setBar] = useState([]);

  return (
    <CommentatorContext.Provider value={{ bar, setBar }}>
      {children}
    </CommentatorContext.Provider>
  );
};

export { CommentatorContext, CommentatorProvider };
