$(document).ready(() => {
	includeHTML()
	onResize()
	setTimeout(() => {
		fillData()
	}, 500)
})