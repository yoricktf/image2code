'use client'
import { MouseEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from './form'
import { useState } from 'react'
import { DragAndDrop } from './draganddrop'
import ProtectedRoute from '@/components/protectedRoute'

const STEPS = {
	INITIAL: 'INITIAL',
	LOADING: 'LOADING',
	PREVIEW: 'PREVIEW',
	ERROR: 'ERROR',
}

const toBase64 = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
}

async function* streamReader(res: Response) {
	const reader = res.body?.getReader()
	const decoder = new TextDecoder()
	if (reader == null) return

	while (true) {
		const { done, value } = await reader.read()
		const chunk = decoder.decode(value)
		yield chunk
		if (done) break
	}
}

export default function Home() {
	const [result, setResult] = useState('')
	const [step, setStep] = useState(STEPS.INITIAL)
	const [copySuccess, setCopySuccess] = useState(false)

	const transformToCode = async (body: string) => {
		setStep(STEPS.LOADING)
		const res = await fetch('/api/generate-code-from-image', {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok || res.body == null) {
			setStep(STEPS.ERROR)
			throw new Error('Error trying to generate code.')
		}

		setStep(STEPS.PREVIEW)

		// leer el streaming de datos
		for await (const chunk of streamReader(res)) {
			setResult((prev) => prev + chunk)
		}
	}

	const copyToClipboard = (e: MouseEventHandler) => {
		const codeBlock = document.getElementById('code-block')

		if (codeBlock) {
			const range = document.createRange()
			window.getSelection()?.removeAllRanges()
			range.selectNode(codeBlock)
			window.getSelection()?.addRange(range)

			try {
				const successful = document.execCommand('copy')
				setCopySuccess(successful)
				setTimeout(() => {
					setCopySuccess(false) // Reset the success message after 2 seconds
				}, 2000)
			} catch (err) {
				console.error('Error al copiar el texto: ', err)
			}
		}
	}

	const transformImageToCode = async (file: File) => {
		const img = await toBase64(file)
		await transformToCode(JSON.stringify({ img }))
	}

	const transformUrlToCode = async (url: string) => {
		await transformToCode(JSON.stringify({ url }))
	}

	const [background, html = ''] = result.split('|||')

	return (
		<ProtectedRoute>
			<div className="grid grid-cols-[400px_1fr]">
				<aside className="flex flex-col justify-between min-h-screen p-4 bg-gray-900">
					<header className="text-center">
						<h1 className="text-3xl font-semibold">Image 2 Code</h1>
						<h2 className="text-sm opacity-75">Transform your images to code in just seconds!</h2>
					</header>

					<section>
						<div className="flex flex-wrap items-center">
							<div className="mr-2 mb-2 cursor-pointer rounded bg-blue-500 px-2 py-1 text-white">React Component</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-red-500 px-2 py-1 text-white">Angular Component</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-green-500 px-2 py-1 text-white">Vue Component</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-purple-500 px-2 py-1 text-white">Bootstrap</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-blue-500 px-2 py-1 text-white">Tailwind</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-red-800 px-2 py-1 text-white">Material</div>
							<div className="mr-2 mb-2 cursor-pointer rounded bg-blue-600 px-2 py-1 text-white">CSS</div>
						</div>
					</section>

					<footer>
						Developed with ❤️ by <a href="https://github.com/jamoragar">Jamoragar</a>
					</footer>
				</aside>

				<main className="bg-gray-950">
					<section className="max-w-5xl w-full mx-auto p-10">
						{step === STEPS.LOADING && (
							<div className="flex justify-center items-center">
								<div role="status">
									<svg
										aria-hidden="true"
										className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						)}

						{step === STEPS.INITIAL && (
							<div className="flex flex-col gap-4">
								<DragAndDrop transformImageToCode={transformImageToCode} />
								<Form transformUrlToCode={transformUrlToCode} />
							</div>
						)}

						{step === STEPS.PREVIEW && (
							<div className="rounded flex flex-col gap-4">
								<div
									className="w-full h-full border-4 rounded border-gray-700 aspect-video"
									style={{ backgroundColor: `#${background ? background.trim() : 'fff'}` }}
								>
									<iframe srcDoc={html} className="w-full h-full" />
								</div>
								<pre className="pt-10">
									<div className="w-full max-w-full max-h-full">
										<div className="mb-2 flex justify-between items-center">
											<p className="text-sm font-medium text-gray-900 dark:text-white">Your html code:</p>
										</div>
										<div className="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4 h-80">
											<div className="overflow-scroll max-h-full">
												<pre>
													<code id="code-block" className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre">
														{html}
													</code>
												</pre>
											</div>
											<div className="absolute top-2 end-2 bg-gray-50 dark:bg-gray-700">
												<button
													onClick={(e) => copyToClipboard}
													className="text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border"
												>
													{copySuccess ? (
														<span id="success-message" className="inline-flex items-center">
															<svg
																className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
																aria-hidden="true"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 16 12"
															>
																<path
																	stroke="currentColor"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M1 5.917 5.724 10.5 15 1.5"
																/>
															</svg>
															<span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
														</span>
													) : (
														<span id="default-message" className="inline-flex items-center">
															<svg
																className="w-3 h-3 me-1.5"
																aria-hidden="true"
																xmlns="http://www.w3.org/2000/svg"
																fill="currentColor"
																viewBox="0 0 18 20"
															>
																<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
															</svg>
															<span className="text-xs font-semibold">Copy code</span>
														</span>
													)}
												</button>
											</div>
										</div>
									</div>
								</pre>
							</div>
						)}
					</section>
				</main>
			</div>
		</ProtectedRoute>
	)
}
