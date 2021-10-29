import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Job } from "../models/Job";
import { userContext } from "./UserContext";

type JobContext = {
  jobs: Job[];
};

export const initialContext = {
  jobs: [],
};

export const jobContext = React.createContext<JobContext>(initialContext);

export const JobProvider: React.FC = ({ children }) => {
  const context = useContext(userContext);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get("http://localhost:4000/api/job", {
        cancelToken: source.token,
      })
      .then((response) => {
        if (response.status === 200) {
          if (!unmounted) {
            setJobs(response.data.data);
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        if (!unmounted) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
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
    <jobContext.Provider
      value={{
        jobs: jobs || [],
      }}
    >
      {children}
    </jobContext.Provider>
  );
};
