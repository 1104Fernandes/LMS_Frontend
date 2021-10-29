import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profession } from "../models/Profession";

type ProfessionContext = {
  professions: Profession[];
};

export const initialContext = {
  professions: [],
  profession: null,
};

export const professionContext = React.createContext<ProfessionContext>(
  initialContext
);

export const ProfessionProvider: React.FC = ({ children }) => {
  const [professions, setProfessions] = useState<Profession[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get("http://localhost:4000/api/profession", {
        cancelToken: source.token,
      })
      .then((response) => {
        if (response.status === 200) {
          if (!unmounted) {
            setProfessions(response.data.data);
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        if (!unmounted) {
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
        }
      });
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);
  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <professionContext.Provider
      value={{
        professions: professions || [],
      }}
    >
      {children}
    </professionContext.Provider>
  );
};
