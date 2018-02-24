import './env';
import request from './services/Base.request'
import _ from 'underscore'

const lastNotif = {}

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function bytesToSize(bytes) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return 'n/a'
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
	if (i === 0) return `${bytes} ${sizes[i]})`
	return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

const checkMetrics = async type => {

	console.log('checking '+type+' for ' + process.env.APP_NAME)

	// check cpu usage
	const metricUsage = await request({
	  method: 'GET',
	  uri: 'apps/' + process.env.APP_NAME + '/stats/'+ type +'/web'
	})


	const max = _.max(metricUsage, metric => metric.value)


	if (max.value >= process.env[type.toUpperCase() + '_THRESHOLD'] && lastNotif[type] !== max.time) {

		console.log('sending slack notif for '+type+' overload for ' + process.env.APP_NAME)

		const value = type === 'cpu' ? Math.round(max.value) + '%' : bytesToSize(Math.round(max.value))

		const slackNotif = await request({
	      method: 'POST',
	      baseUrl: process.env.SLACK_WEBHOOK,
	      uri: '',
	      body: {
	      	text: type + ' overload '+ value +' at ' + max.time
	      }
	    })

	    lastNotif[type] = max.time

	}

}


const cron = async () => {

	await checkMetrics('cpu')

	await checkMetrics('memory')

	await checkMetrics('swap')

	await sleep(process.env.CHECK_TIMER * 1000)

	cron()

}

cron()





