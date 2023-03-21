import * as React from 'react'
import reportWebVitals from './reportWebVitals'

import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import {createRoot} from 'react-dom/client'
import {Profiler} from 'components/profiler'
import {App} from './App'
import {AppProviders} from './context'

loadDevTools(() => {
	createRoot(document.getElementById('root') as HTMLElement).render(
		<Profiler id="App Root" phases={['mount']}>
			<AppProviders>
				<App />
			</AppProviders>
		</Profiler>,
	)
})

reportWebVitals()
