$(document).ready(() => {
	includeHTML()
	onResize()
	setTimeout(() => {
		$('.experience .col').hover(({ currentTarget: target, type }) => {
			let content = $(target)
			if (type == 'mouseenter') {
				content.find('img').css('transform','scale(1.2)')
				content.find('.hover-content').addClass('active')
			} else {
				content.find('img').css('transform','scale(1)')
				content.find('.hover-content').removeClass('active')
			}
		})
	}, 1000)
})