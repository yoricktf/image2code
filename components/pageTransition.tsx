'use client'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface TransitionComponent {
	children: ReactNode
}

export function PageTransitionComponent({ children }: TransitionComponent) {
	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence
				mode="wait"
				onExitComplete={() => {
					document.body.classList.remove('overflow-hidden')
				}}
			>
				{children}
			</AnimatePresence>
		</LazyMotion>
	)
}
