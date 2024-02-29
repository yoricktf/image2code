const pageTransitionSpeed = 450

const pageTransitionAnim = {
	show: {
		opacity: 1,
		transition: {
			duration: pageTransitionSpeed / 800,
			delay: 0.2,
			ease: 'linear',
			when: 'beforeChildren',
		},
	},
	hide: {
		opacity: 0,
		transition: {
			duration: pageTransitionSpeed / 800,
			ease: 'linear',
			when: 'beforeChildren',
		},
	},
}

export { pageTransitionSpeed, pageTransitionAnim }
