import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };
  // Obtiene la el dato random y lo guarda en el estado
  useEffect(refreshFact, []);

  return { fact, refreshFact };
}
