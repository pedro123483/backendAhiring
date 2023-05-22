import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const create = async (request, response) => {
    try {
        const { jobTitle, industry, keyWords, tone, numberWords } = request.body;

        if(!jobTitle && !industry && !keyWords && !tone && !numberWords) {
            response.status(400).send({
                message: "Please submit all the fields required",
            });
        }

        await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful assistant who write job descriptions."},
                {"role": "user", "content": `Write a job description for a ${jobTitle} role in the ${industry} industry. Containing around ${numberWords} words in a ${tone} tone. Incorporate the following keyword: ${keyWords}. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits.`}
            ],
            temperature: 0.5,
        }).then((result) => {
            response.send(result.data.choices[0].message.content);
        }).catch((error) => {
            console.log(error);
        });
    } catch (error) {
        response.status(500).send({
            message: error.message,
        });
    }
};

export default {
    create,
};