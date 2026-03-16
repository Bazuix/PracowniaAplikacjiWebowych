import styles from "./Post.module.scss"

export default function Post() {



    return (
        <div className={styles.Post}>

           <ul>
               <li>
                   <h1>Wpis nr 1</h1>

                   <p>
                       Tekst wpisu
                   </p>
               </li>
               <li>
                   <h1>Wpis nr 2</h1>

                   <p>
                      Tekst wpisu
                   </p>
               </li>
           </ul>

        </div>

    )
}