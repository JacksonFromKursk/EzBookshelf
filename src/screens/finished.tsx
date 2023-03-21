import * as React from 'react'
import {Link} from 'components/lib'
import {ListItemList} from 'components/list-item-list'
import {CommonBook} from 'types'

export function FinishedScreen() {
	return (
		<ListItemList
			filterListItems={(li: CommonBook) => Boolean(li.finishDate)}
			noListItems={
				<p>
					Именно сюда отправятся книги, когда вы закончите
					их читать. Начните с перехода к{' '}
					<Link to="/discover">библиотеке</Link> чтобы добавить книги к вашему списку
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
