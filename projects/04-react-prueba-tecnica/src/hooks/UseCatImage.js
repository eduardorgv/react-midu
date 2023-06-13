import { useEffect, useState } from "react";

export const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com";

export function useCatImage ({fact}) {
  const [imageUrl, setImageUrl] = useState();

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

  return { imageUrl: `${CAT_ENDPOINT_IMAGE_URL}${imageUrl}` }
}