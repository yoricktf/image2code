import React from 'react'

const ReloadButton: React.FC = () => {
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<button
			onClick={reloadPage}
			className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none
				focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-all"
			aria-label="Reload Page"
			title="Restart the application."
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 mx-auto"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={1}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"
				/>
			</svg>
		</button>
	)
}

export default ReloadButton
