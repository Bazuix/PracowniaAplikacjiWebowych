import styles from "./Categories.module.scss"


export default function Categories() {
    return (
        <div className={styles.Categories}>

            <h1>Kategorie:</h1>

            <ul>
                <li>Kategoria 1</li>
                <li>Kategoria 2</li>
                <li>Kategoria 3</li>
            </ul>

        </div>
    )
}