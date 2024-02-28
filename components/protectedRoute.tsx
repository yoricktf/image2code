import { ReactNode, useEffect } from 'react'
import { useAuth } from '../app/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login')
		}
	}, [loading, user, router])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!user) {
		return null
	}

	return <>{children}</>
}

export default ProtectedRoute
