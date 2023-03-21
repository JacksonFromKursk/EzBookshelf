/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import * as colors from 'styles/colors'
import {useBookSearch, useRefetchBookSearchQuery} from 'utils/books'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'
import {Profiler} from 'components/profiler'

interface FormData extends HTMLFormControlsCollection {
	search: HTMLInputElement
}
interface FormElement extends HTMLFormElement {
	readonly elements: FormData
}

export function DiscoverBooksScreen() {
	const [query, setQuery] = React.useState('')
	const [queried, setQueried] = React.useState(false)
	const {books, error, isLoading, isError, isSuccess} = useBookSearch(query)
	const refetchBookSearchQuery = useRefetchBookSearchQuery()


	React.useEffect(() => {
		
		return () =>
			(function cleanUp() {
				refetchBookSearchQuery()
			})()
	}, [refetchBookSearchQuery])

	function handleSearchSubmit(event: React.FormEvent<FormElement>) {
		event.preventDefault()
		setQueried(true)
		setQuery(event.currentTarget.elements.search.value)
	}

	return (
		<div>
			<div>
				<form onSubmit={handleSearchSubmit}>
					<Input
						placeholder="Найти книги"
						id="search"
						type="search"
						css={{width: '100%'}}
					/>
					<Tooltip label="Search Books">
						<label htmlFor="search">
							<button
								type="submit"
								css={{
									border: '0',
									position: 'relative',
									marginLeft: '-35px',
									background: 'transparent',
								}}
							>
								{isLoading ? (
									<Spinner />
								) : isError ? (
									<FaTimes
										aria-label="error"
										css={{color: colors.danger}}
									/>
								) : (
									<FaSearch aria-label="search" />
								)}
							</button>
						</label>
					</Tooltip>
				</form>
				{isError ? (
					<div css={{color: colors.danger}}>
						<p>Произошла ошибка:</p>
						<pre>{(error as Error).message}</pre>
					</div>
				) : null}
			</div>
			<div>
				{queried ? null : (
					<div
						css={{
							marginTop: 20,
							fontSize: '1.2em',
							textAlign: 'center',
						}}
					>
						<p>Добро пожаловать в библиотеку.</p>
						<p>Вот, позвольте мне загрузить для вас несколько книг...</p>
						{isLoading ? (
							<div css={{width: '100%', margin: 'auto'}}>
								<Spinner />
							</div>
						) : isSuccess && books.length ? (
							<p>
								Держите! Найдите больше книг с помощью строки поиска выше.
							</p>
						) : isSuccess && !books.length ? (
							<p>
								Хммм... Я не смог найти ни одной книги, которую можно было бы порекомендовать для вас. Извините.
							</p>
						) : null}
					</div>
				)}
				{books.length ? (
					<Profiler
						id="Discover Books Screen Book List"
						metadata={{query, bookCount: books.length}}
					>
						<BookListUL css={{marginTop: 20}}>
							{books.map(book => (
								<li key={book.id} aria-label={`${book.title}`}>
									<BookRow key={book.id} book={book} />
								</li>
							))}
						</BookListUL>
					</Profiler>
				) : queried ? (
					<div
						css={{
							marginTop: 20,
							fontSize: '1.2em',
							textAlign: 'center',
						}}
					>
						{isLoading ? (
							<div css={{width: '100%', margin: 'auto'}}>
								<Spinner />
							</div>
						) : (
							<p>
								Хммм... Я не смог найти ни одной книги с таким запросом
								"{query}." Пожалуйста, попробуйте другой.
							</p>
						)}
					</div>
				) : null}
			</div>
		</div>
	)
}
