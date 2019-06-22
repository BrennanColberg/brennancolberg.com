import React from "react";

import Book from "./Book";
import Paren from "../Paren";
import EmailLink from "../EmailLink";

import uniqueBooks from "./books";
const books = [];
uniqueBooks.forEach(book =>
	// splits each book into multiple books, one for each date
	// that it was read, and recombines them into one array
	book.dates.forEach(date => {
		const singleBook = Object.assign({}, book);
		delete singleBook.dates;
		singleBook.date = date;
		books.push(singleBook);
	})
);

export default () => (
	<>
		<h1>My Reading</h1>
		<p>
			I read a lot. Since June 2018, I've finished {uniqueBooks.length}{" "}
			different books–from novels to political analyses, history to educational
			theory, classics to self-help books, I tend to pick up anything that
			piques my interest. All {books.length} reads{" "}
			<Paren>
				including some re-reads, notably Asimov's <em>Foundation</em> series
			</Paren>{" "}
			are listed below, in chronological order by finishing date{" "}
			<Paren>most recent first</Paren>.
		</p>
		<p>
			I've given each book a personal rating, shown by color: the greener a book
			is, the more I'd recommend it; the redder, the less.{" "}
			<Paren>
				Obviously, these are all purely my opinion, which often diverges from
				the norm; for instance, most people seem to love Gaiman's{" "}
				<em>American Gods</em>, while I could barely get through it.
			</Paren>{" "}
			<Paren>
				Recommending a book doesn't necessarily mean that I agree with
				everything it says; I just think that you should read it.
			</Paren>{" "}
			I've also written thoughts about and/or transcribed quotes from certain
			books; those ones have a shadow. Click on each to read more.
		</p>
		<div className="books">
			{books
				// descending chronological order of most recent read
				.sort((a, b) => a.date < b.date)
				.map((book, i) => (
					<Book key={i} book={book} />
				))}
		</div>
		<p>
			If you're interested in chatting about any of these books{" "}
			<Paren>
				whether from personal curiosity, wanting to hear my take on them, or
				just wanting to talk in more depth
			</Paren>
			, feel free to <EmailLink>shoot me an email!</EmailLink> I'll respond as
			fast as I can.
		</p>
	</>
);
