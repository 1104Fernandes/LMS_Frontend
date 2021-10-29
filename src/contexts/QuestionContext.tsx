import React, { useContext, useEffect, useState } from "react";
import { Question } from "../models/Questions";
import { userContext } from "../contexts/UserContext";
import axios from "axios";

type QuestionContext = {
  questions: Question[];
};

export const initialContext = {
  questions: [],
};

export const questionContext = React.createContext<QuestionContext>(
  initialContext
);

export const QuestionProvider: React.FC = ({ children }) => {
  const context = useContext(userContext);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      await axios
        .get("http://localhost:4000/api/question", {
          headers: { Authorization: context.actions.authHeader() },
        })
        .then((response) => {
          if (response.status === 200) {
            setQuestions(response.data.data);
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
      getQuestions();
    }
  }, [context.actions]);

  if (loading) {
    return <div>Loading..</div>;
  }
  // console.log(questions);
  return (
    <questionContext.Provider
      value={{
        questions: questions || [],
      }}
    >
      {children}
    </questionContext.Provider>
  );
};
