import "./App.css";
import { useCatFact } from "./hooks/UseCatFact";
import { useCatImage } from "./hooks/UseCatImage";

export const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({fact})

  const handleClick = () => {
    refreshFact();
  }

  return (
    <main>
      <h3>App de gatitos</h3>

      <button onClick={handleClick}>Get new fact</button>

      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image extracted using the first three words of ${fact}`}
          ></img>
        )}
      </section>
    </main>
  );
};
