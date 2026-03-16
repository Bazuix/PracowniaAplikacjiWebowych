import { Link } from "react-router"
import styles from "./Navbar.module.scss"

export default function Navbar() {
    return (
        <nav className={styles.Navbar}>
            <ul>

                <li>
                    <Link to="/">Strona główna</Link>
                </li>

                <li>
                    <Link to="/categories">Kategorie</Link>
                </li>
                <li>
                    <Link to="/post">Wpisy</Link>
                </li>

            </ul>
        </nav>
    )
}