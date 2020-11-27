import { firestoreClient } from '../../data/firebase'
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'

function authorsToText(authors) {
  if (authors.length === 0) return null
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return authors.join(' & ')
  return authors.join(', ')
}

export async function getStaticPaths() {
  const snap = await firestoreClient.collection('books').get()
  const books = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  return {
    paths: books.map((book) => ({
      params: {
        id: book.id,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const snap = await firestoreClient
    .collection('books')
    .doc(context.params.id)
    .get()
  return {
    props: { book: snap.data() },
  }
}

const ChapterSummary = ({ entry: { title, content } }) => (
  <>
    <h4>{title}</h4>
    <ReactMarkdown source={content} />
  </>
)

const BookContent = ({ book }) => {
  const title = `${book.title} (${authorsToText(book.authors)}; ${book.year})`
  const url = `https://brennancolberg.com/books/${book.id}`

  return (
    <div className="prose">
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />

        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
      </Head>

      <h1>
        {book.title}
        {book.subtitle && (
          <>
            <br />
            <span className="font-semibold">{book.subtitle}</span>
          </>
        )}
      </h1>

      {book.authors?.length > 0 && (
        <div className="flex -mt-6">
          {book.authors.map((author) => (
            <div className="text-xl bg-primary-100 py-1 px-2 m-2 rounded-md shadow-sm cursor-default">
              {author}
            </div>
          ))}
        </div>
      )}

      {book.text && <ReactMarkdown source={book.text} />}

      {book.summary?.map((entry) =>
        typeof entry.content === 'string' ? (
          <ChapterSummary entry={entry} />
        ) : (
          <>
            <h3>{entry.title}</h3>
            {entry.content.map((subEntry) => (
              <ChapterSummary entry={subEntry} />
            ))}
          </>
        )
      )}
    </div>
  )
}

export default BookContent
