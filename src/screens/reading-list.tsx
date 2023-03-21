import * as React from 'react'
import {Link} from 'components/lib'
import {ListItemList} from 'components/list-item-list'

export function ReadingListScreen() {
	return (
		<ListItemList
			filterListItems={li => !li.finishDate}
			noListItems={
				<p>
					Добро пожаловать в список чтения на вашей книжной полке. Начните с того, что перейдите к{' '}
					<Link to="/discover">библиотеке</Link> чтобы добавить книги к вашему списку.
				</p>
			}
			noFilteredListItems={
				<p>
					Похоже, тебе нужно кое-что почитать! Проверьте их в
					своем <Link to="/list">списке книг</Link> или{' '}
					<Link to="/discover">найдите больше</Link>.
				</p>
			}
		/>
	)
}
