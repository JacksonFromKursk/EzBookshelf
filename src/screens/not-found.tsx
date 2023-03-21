/** @jsx jsx */
import {jsx} from '@emotion/core'

import {Link} from 'components/lib'

export function NotFoundScreen() {
	return (
		<div
			css={{
				height: '100%',
				display: 'grid',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div>
				<p>Извините, ничего нет</p>
				<Link to="/discover">Вернитесь в библиотеку</Link>
			</div>
		</div>
	)
}
