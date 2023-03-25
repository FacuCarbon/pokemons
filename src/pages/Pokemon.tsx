import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
/// style
import styles from "./pokemon.module.css";
// assets
import Pokeball from "../assets/pokeball.png";

import Footer from "../components/Footer";
import { PokemonDetail } from "../types/types";
import { fetchPokemon } from "../api/fetchPokemon";
import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";
const Pokemon = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      await waitFor(500);
      const fetchedPokemon = await fetchPokemon(name as string);
      setPokemon(fetchedPokemon);
      setIsLoading(false);
    };
    getPokemon();
  }, [name]);
  if (isLoading || !pokemon) {
    return <LoadingScreen />;
  }
  return (
    <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={Pokeball} alt="go back" /> Go
        Back
      </button>
      <div className={styles.pokemon}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}>
            {pokemon?.name?.toUpperCase()}
          </div>
          <div>N° {pokemon?.id}</div>
          <div>
            <img
              className={styles.pokemonInfoImg}
              src={pokemon?.imgSrc}
              alt={pokemon?.name}
            />
          </div>
          <div>HP: {pokemon?.hp}</div>
          <div>Attack: {pokemon?.attack}</div>
          <div>Defense: {pokemon?.defense}</div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Pokemon;
