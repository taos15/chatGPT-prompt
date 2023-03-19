import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'

config()

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.setPrompt('Ask chatGPT something\n')
rl.prompt()
rl.on('line', async (input) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  })
  console.log(`${response.data.choices[0].message.content}\n`)

  rl.prompt()
})
