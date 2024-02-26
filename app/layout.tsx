import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Image 2 Code',
	description: 'Transform your images to HTML/CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={`${inter.className} dark`}>{children}</body>
		</html>
	)
}