import React, { useState } from 'react'

export enum ButtonColors {
	blue = 'blue',
	red = 'red',
	green = 'green',
	purple = 'purple',
	// yellow = 'yellow',
	// orange = 'orange',
}

interface ToggleButtonProps {
	children: React.ReactNode
	color: keyof typeof ButtonColors
	isActive: boolean
	onClick: () => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ children, color, isActive, onClick }) => {
	const getColorClasses = (isActive: boolean) => {
		const baseColor = {
			blue: 'bg-blue-700 hover:bg-blue-500',
			red: 'bg-red-700 hover:bg-red-500',
			green: 'bg-green-700 hover:bg-green-500',
			purple: 'bg-purple-700 hover:bg-purple-500',
			yellow: 'bg-yellow-700 hover:bg-yellow-500',
			orange: 'bg-orange-700 hover:bg-orange-500',
		}

		const pressedColor = {
			blue: 'bg-blue-500 border-blue-700',
			red: 'bg-red-500 border-red-700',
			green: 'bg-green-500 border-green-700',
			purple: 'bg-purple-500 border-purple-700',
			yellow: 'bg-yellow-500 border-yellow-700',
			orange: 'bg-orange-500 border-orange-700',
		}

		return isActive ? `${pressedColor[color]} border-4 shadow-inner` : `${baseColor[color]} shadow-lg`
	}

	return (
		<button
			onClick={onClick}
			className={`mr-2 mb-2 cursor-pointer rounded px-2 py-1 text-white transition-all duration-100 ${getColorClasses(isActive)}`}
		>
			{children}
		</button>
	)
}

export default ToggleButton
