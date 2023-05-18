import "./App.css";
import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_CAT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com";

export const App = () => {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  // Obtiene la el dato random y lo guarda en el estado
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_CAT)
      .then((resp) => {
        if (!resp.ok) return new Error("Error fetching fact");
        return resp.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Obtiene la imagen a partir de las tres primeras palabras del dato random
  useEffect(() => {
    if (!fact) return;

    const firstWord = fact.split(" ", 3).join(" ");

    fetch(
      `${CAT_ENDPOINT_IMAGE_URL}/cat/says/${firstWord}?size=50&color=red&json=true`
    )
      .then((resp) => resp.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h3>App de gatitos</h3>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={CAT_ENDPOINT_IMAGE_URL + imageUrl}
            alt={`Image extracted using the first three words of ${fact}`}
          ></img>
        )}
      </section>
    </main>
  );
};
