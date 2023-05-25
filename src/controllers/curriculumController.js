// importing modules required
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

// configuring dotenv 
dotenv.config();

// making configuration needed to interact with OPENAI API
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// fetch open ai api and create summary of the content
const create = async (request, response) => {
    try {
        if(!request.files && !request.files.pdfFile) {
            response.status(400);
            response.end();
        }
    
        const pdfText = await pdfParse(request.files.pdfFile).then(result => {
            return result.text;
        });
    
        await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful recruiter assistant that summarize PDF information."},
                {"role": "user", "content": `The following is some text extract from a PDF curriculum. Can you put all that together in a sentence with about 200 hundred words?: ${pdfText}`}
            ],
            temperature: 0.5,
        }).then((result) => {
            console.log(result.data.choices[0].message.content);
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

// export method created before
export default {
    create,
};