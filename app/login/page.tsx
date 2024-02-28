'use client'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
} from 'firebase/auth'
import Swal from 'sweetalert2'

export default function Login() {
	const router = useRouter()

	async function handleSubmit(e: FormEvent<any>) {
		e.preventDefault()
		const auth = getAuth()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData)

		try {
			await setPersistence(auth, data.remember ? browserLocalPersistence : browserSessionPersistence)
			await signInWithEmailAndPassword(auth, data.email.toString(), data.password.toString())
			router.push('/')
		} catch (error) {
			console.error(error)
			Swal.fire({
				icon: 'error',
				title: 'Something went wrong!',
				text: "Your e-mail it's not registered.",
				footer: 'Contact the App Admin to get an account.',
			})
		}
	}

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
					Code 2 Image - Login
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Login with your account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											name="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
											Remember me
										</label>
									</div>
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
