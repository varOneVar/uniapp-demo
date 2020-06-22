import store from '../../store'
import constant from './constant.js'
function getEnv(name = 'java') {
	let env = {
		php: '',
		java: ''
	}
	if(process.env.NODE_ENV === 'production'){
		env = {
			php: '',
			java: ''
		}
	}
	return env[name]
}


function createRequest(url = '', method = 'GET', args = {}, config = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data: {
				// 固定参数
				...args
			},
			timeout: 60000,
			success(res) {
				const { data, data: { code, msg } } = res;
				if (code !== '0') {
					uni.showToast({
						title: msg || '操作失败！'
						icon:'none'
					})
				}
				resolve(data)
			},
			fail(err) {
				reject(err)
			}
			...config,
		})
	})
}

const server = {
	php: {
		post: (url = '', args = {}, config = {}) => createRequest(`${getEnv('php')}${url}`,'POST', args, config),
		get: (url = '', args = {}, config = {}) => createRequest(`${getEnv('php')}${url}`,'GET', args, config),
	},
	java: {
		post: (url = '', args = {}, config = {}) => createRequest(`${getEnv()}${url}`,'POST', args, config),
		get: (url = '', args = {}, config = {}) => createRequest(`${getEnv()}${url}`,'GET', args, config),
	}
}

export default function InstallApi (Vue) {
	Vue.prototype.$request = server;
	Vue.prototype.$apiUrl = constant;
}