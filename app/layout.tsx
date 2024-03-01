import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PageTransitionComponent } from '@/components/pageTransition'
import { AuthProvider } from './hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Image 2 Code',
	description: 'Transform your images to HTML/CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={`${inter.className} dark`}>
				<AuthProvider>
					<PageTransitionComponent>{children}</PageTransitionComponent>
				</AuthProvider>
			</body>
		</html>
	)
}
