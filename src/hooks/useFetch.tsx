import {  useEffect, useRef } from "react";
import { useState } from "react";
import { Response } from "../contexts/ResponseContext";

/**
 * Fetch data from an url and returns them.
 *
 * @param {string} url Route that should be fetched
 */

export function useFetch<T>(url: string) {

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = async () => {

      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "GET",
        });

        if (res.status === 200) {
          const { data } = (await res.json()) as Response<T>;
          setData(data);
        } else {
          const { status } = (await res.json()) as Response<undefined>;
          setError(status);
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
  
  };
  const refetchRef = useRef(refetch);

  useEffect(() => {
    refetchRef.current();
  }, []);
  return { data, loading, error, refetch: refetchRef.current };
}

export function useFetchSingle<T>(url: string, id: string | undefined) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = async () => {
    try {
      setLoading(true);
      const res = await fetch(url + "/" + id, {
        method: "GET",
      });

      if (res.status === 200) {
        const { data } = (await res.json()) as Response<T>;
        setData(data);
      } else {
        const { status } = (await res.json()) as Response<undefined>;
        setError(status);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  const refetchRef = useRef(refetch);

  useEffect(() => {
    refetchRef.current();
  }, []);
  return { data, loading, error, refetch: refetchRef.current };
}
