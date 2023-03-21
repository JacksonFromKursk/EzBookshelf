//@ts-nocheck
import * as React from 'react'
import {client} from 'utils/api-client'

let queue = []

setInterval(sendProfileQueue, 5000)

function sendProfileQueue() {
	if (!queue.length) {
		return Promise.resolve({success: true})
	}
	const queueToSend = [...queue]
	queue = []
	return client('profile', {data: queueToSend})
}


export function Profiler({
	metadata,
	phases,
	...props
}: {metadata: any; phases?: any} & any) {
	function reportProfile(
		id,
		phase, 
		actualDuration, 
		baseDuration,
		startTime, 
		commitTime, 
		interactions, 
	) {
		if (!phases || phases.includes(phase)) {
			queue.push({
				metadata,
				id,
				phase,
				actualDuration,
				baseDuration,
				startTime,
				commitTime,
				interactions,
			})
		}
	}
	return <React.Profiler onRender={reportProfile} {...props} />
}
