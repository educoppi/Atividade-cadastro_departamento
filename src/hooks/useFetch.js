import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ativo = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }

        const json = await res.json();

        if (ativo) {
          setData(json);
        }
      } catch (error) {
        if (ativo) {
          setError("Não foi possível carregar os departamentos.");
          console.error("Erro ao buscar dados:", error);
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ativo = false;
    };
  }, [url]);

  return {
    data,
    setData,
    loading,
    error
  };
};