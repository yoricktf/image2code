'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Form = ({ transformUrlToCode }: { transformUrlToCode: (url: string) => void }) => {
	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(evt) => {
				evt.preventDefault()

				const form = evt.currentTarget as HTMLFormElement
				const url = form.elements.namedItem('url') as HTMLInputElement

				transformUrlToCode(url.value)
			}}
		>
			<Label htmlFor="url">Put your image URL:</Label>
			<Input name="url" id="url" type="url" placeholder="https://your-screenshot/image.jpg" />
			<Button>Generate code of the image</Button>
		</form>
	)
}
