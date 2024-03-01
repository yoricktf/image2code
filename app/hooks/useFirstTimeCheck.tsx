import { useEffect, useState } from 'react'

const useFirstTimeCheck = (isAuthenticated: boolean) => {
	const [isFirstTime, setIsFirstTime] = useState<boolean>(false)

	useEffect(() => {
		if (isAuthenticated) {
			const isFirstTime = !localStorage.getItem('firstTimeHere')

			if (isFirstTime) {
				localStorage.setItem('firstTimeHere', 'true')
				setIsFirstTime(true)
			}
		}
	}, [isAuthenticated])
	return isFirstTime
}

export default useFirstTimeCheck
