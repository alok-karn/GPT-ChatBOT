const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

async function chat(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    return response.data.choices[0].text;
}

async function handleMessage(message) {
    message = message.trim();

    const response = await chat(message);

    return response;
};

const userMessage = "Hello, how are you?"; // this is the user input

(async () => {
    const response = await handleMessage(userMessage);
    console.log(response);
  })();