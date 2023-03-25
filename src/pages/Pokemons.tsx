/// hooks
import { useState, useEffect } from "react";
/// components
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
/// style
import styles from "./pokemons.module.css";
/// assets

import { fetchPokemons } from "../api/fetchPokemons";
import { Pokemon } from "../types/types";
import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";
const Pokemons = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      setIsLoading(true);
      await waitFor(1000);
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
      setIsLoading(false);
    };
    fetchAllPokemons();
  }, []);

  const filterPokemons = pokemons?.slice(0, 151).filter((pokemon) => {
    return pokemon?.name?.toLocaleLowerCase().match(query?.toLowerCase());
  });

  if (isLoading || !pokemons) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav className={styles.nav}>
          {filterPokemons?.slice(0, 151).map((pokemon: any) => (
            <Link
              className={styles.listItem}
              to={`/pokemon/${pokemon?.name?.toLowerCase()}`}
              key={pokemon?.id}
            >
              <img
                className={styles.listItemIcon}
                src={pokemon?.imgSrc}
                alt={pokemon?.name}
              />
              <div className={styles.listItemText}>
                <span>{pokemon?.name}</span>
                <span>{pokemon?.id}</span>
              </div>
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </>
  );
};

export default Pokemons;
