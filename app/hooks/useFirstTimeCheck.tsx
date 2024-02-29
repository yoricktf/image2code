import { useEffect, useState } from 'react'

export const useFirstTimeCheck = () => {
	const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null)

	useEffect(() => {
		const storedValue = localStorage.getItem('firstTimeHere')

		if (!storedValue) {
			localStorage.setItem('firstTimeHere', 'true') // Establece que el usuario ya ha visitado
			setIsFirstTime(true) // Actualiza el estado a verdadero
		}
	}, [])

	return isFirstTime
}
