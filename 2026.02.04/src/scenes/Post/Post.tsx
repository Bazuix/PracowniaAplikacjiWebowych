
import { useEffect, useState } from "react"
import { useParams } from "react-router"

import type { Post } from "../../types/Post/Post"
import type { User } from "../../types/User/User"
import type { Comment } from "../../types/Comment/Comment"

import styles from "./Post.module.scss"

export default function PostPage() {

  const { id } = useParams()

  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {

    const fetchData = async () => {

      if (!id) return

      try {

        setIsLoading(true)

        const postRes = await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + id
        )
        const postData: Post = await postRes.json()
        setPost(postData)

        const userRes = await fetch(
          "https://jsonplaceholder.typicode.com/users/" + postData.userId
        )
        const userData: User = await userRes.json()
        setUser(userData)

        const commentsRes = await fetch(
          "https://jsonplaceholder.typicode.com/comments?postId=" + id
        )
        const commentsData: Comment[] = await commentsRes.json()
        setComments(commentsData)

      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }

    }

    fetchData()

  }, [id])

  return (
    <div className={styles.Post}>

      {isLoading && (
        <div className={styles.PostLoading}>
          Trwa ładowanie...
        </div>
      )}

      {isError && (
        <div className={styles.PostError}>
          Wystąpił błąd 😭
        </div>
      )}

      {!isLoading && !isError && post && (
        <>
          <h1 className={styles.PostTitle}>
            {post.title}
          </h1>

          <p className={styles.PostBody}>
            {post.body}
          </p>

          {user && (
            <div className={styles.PostAuthor}>
              Autor: <b>{user.name}</b> ({user.email})
            </div>
          )}

          <div className={styles.PostComments}>
            <h3>Komentarze</h3>

            {comments.map(c => (
              <div key={c.id} className={styles.PostComment}>
                <h5>{c.name}</h5>
                <p>{c.body}</p>
                <small>{c.email}</small>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

