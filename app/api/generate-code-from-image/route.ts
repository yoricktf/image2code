import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const SUPORTED_TECHNOLOGIES: any = {
  Tailwind: "<script src='https://cdn.tailwindcss.com'></script>",
	Bootstrap:
  "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH' crossorigin='anonymous'>",
	'Material Design':
  "<link href='https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css' rel='stylesheet'> <script src='https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'></script>",
}

const USER_PROMPT = 'Generate code for a web page that looks exactly like this'

const SYSTEM_PROMPT = (technology: string) => `You are an expert ${technology} developer
You take screenshots of a reference web page from the user, and then build single page apps
using ${technology} components, HTML and JS.

- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, text color, font size, font family,
padding, margin, border, etc. Match the colors and sizes exactly.
- Use the exact text from the screenshot.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.
- Make it responsive.
- Structure the HTML Code properly for Web Accessibility.
- Take your time for the answer.

In terms of libraries,
${technology === 'CSS' ? '' : `- Use this script to include ${technology}: ${SUPORTED_TECHNOLOGIES[technology]}`}
- You can use Google Fonts
- Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

Return first the background hexadecimals, put a ||| separator, and then all the code.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.`

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
})


export const runtime = 'edge'

export async function POST(req: Request) {
  console.log('================================================',process.env.OPENAI_API_TOKEN)
  const { url, img, technology } = await req.json()
	const technologySelected = technology ?? 'CSS'
	const imageUrl = url ?? img

	const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
		stream: true,
		max_tokens: 4096,
		messages: [
      {
        role: 'system',
				content: SYSTEM_PROMPT(technologySelected),
			},
			{
        role: 'user',
				content: [
          {
            type: 'text',
						text: USER_PROMPT,
					},
					{
            type: 'image_url',
						image_url: imageUrl,
					},
				],
			},
		],
	})

	const stream = OpenAIStream(response)
	return new StreamingTextResponse(stream)
}
