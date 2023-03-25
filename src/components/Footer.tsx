import { Link } from "react-router-dom";

/// style
import styles from "./footer.module.css";
/// Assets
import PokemonPic from "../assets/pikachu.png";
import LocationPic from "../assets/pointer.png";
import ItemsPic from "../assets/pokeball.png";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} to="/pokemons">
        <img className={styles.footerIcon} src={PokemonPic} alt="icon pikachu"/>
        Pokemons
      </Link>
      <Link className={styles.footerLink} to="/items">
        <img className={styles.footerIcon} src={ItemsPic} alt="icon pokeball"/>
        Items
      </Link>
      <Link className={styles.footerLink} to="/pokemons">
        <img className={styles.footerIcon} src={LocationPic} alt="icon map"/>
        Map
      </Link>
    </footer>
  );
};

export default Footer;
