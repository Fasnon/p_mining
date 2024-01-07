import OpenAI from "openai";
// import dotenv from 'dotenv';

// dotenv.config();

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true, // Replace with your actual OpenAI API key
});
let Gptresponse = "";

async function getOpenAIResponse() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    Gptresponse = completion.choices[0].message.content;
    return Gptresponse;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Propagate the error
  }
}
export { getOpenAIResponse };
