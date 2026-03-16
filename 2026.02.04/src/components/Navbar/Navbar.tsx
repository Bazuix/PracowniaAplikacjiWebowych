import styles from './Navbar.module.scss'
import {Link} from "react-router";

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarHolder}>
        <li>
          <Link
            className={styles.NavbarHolderLink}
            to="/"
          >
            Strona główna
          </Link>
        </li>
        <li>
          <Link
            className={styles.NavbarHolderLink}
            to="/wpisy"
          >
            Wpisy
          </Link>
        </li>
        <li>
          <Link
            className={styles.NavbarHolderLink}
            to="/kontakt"
          >
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  )
}
