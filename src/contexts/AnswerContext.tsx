import React, { useContext, useEffect, useState } from "react";
import { Answer } from "../models/Answers";
import { userContext } from "../contexts/UserContext";
import axios from "axios";

type AnswerContext = {
  answers: Answer[];
};

export const initialContext = {
  answers: [],
  answer: null,
};

export const answerContext = React.createContext<AnswerContext>(initialContext);

export const AnswerProvider: React.FC = ({ children }) => {
  const context = useContext(userContext);
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('Answer: ',context);
    async function getAnswers() {
      setLoading(true);
      await axios
        .get("http://localhost:4000/api/answer", {
          headers: { Authorization: context.actions.authHeader() },
        })
        .then((response) => {
          if (response.status === 200) {
            setAnswers(response.data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }

    if (context.actions.authHeader() !== null) {
      getAnswers();
    }
  }, [context.actions]);
  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <answerContext.Provider
      value={{
        answers: answers || [],
      }}
    >
      {children}
    </answerContext.Provider>
  );
};
