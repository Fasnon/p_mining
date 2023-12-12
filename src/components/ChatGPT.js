// import React, { useEffect, useState } from 'react';

// const key = "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"
// const STP_prompt = "25%"

// const express = require("express");
// const cors = require("cors")
// const bodyParser = require("body-parser");
// const app = express()

// const { Configuration, OpenAIApi} = require("openai");
// const body = " In the recent performance metrics analysis, we observed significant changes across four key indicators.\
//     irst, the Mean Throughput Time (Days) experienced a notable improvement as an additional 40 cases were processed within a swift timeframe of 2 days or less, \
//     resulting in a 23.8% decrease, reflecting enhanced efficiency in processing times. However, the STP Cases metric showed a contrasting trend with 29 more cases being processed \
//     through Straight Through Processing (STP) this week, but it marked a considerable 71.2% decrease. \
//     This discrepancy may warrant further investigation to understand the underlying factors influencing the STP process. \
//     On a positive note, the metric for Additional Manual Actions revealed a 25% decrease, \
//     indicating a reduction in the need for manual interventions in case processing, although this saw a slight uptick of 14.0%. \
//     Finally, Trade Volume experienced a substantial decline with 24,639 fewer cases processed this week, translating to a significant 41.2% decrease, \
//     reflecting a noteworthy shift in overall workload. These metrics collectively provide valuable insights into process efficiency, STP effectiveness, \
//     manual intervention requirements, and overall workload management, allowing us to make informed decisions to optimize our operational processes further."

// const YourComponent = () => {
//     const prompts = ["Straight through Put rate  = ${STP_prompt}", "prompt2", "prompt3"]; // Replace with your actual prompts
//     const [answer, setAnswer] = useState('');

//     const generateResponse = async () => {
//     const apiKey = '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';
//     const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Check the latest API endpoint

//     try {
//         const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//             prompt: prompts,
//             max_tokens: 150, // Adjust as needed
//         }),
//         });

//         const data = await response.json();
//         setAnswer(data.choices[0]?.text || 'No response');
//     } catch (error) {
//         console.error('Error generating response:', error);
//     }
//     };

//     useEffect(() => {
//     generateResponse();
//     }, []); // This will generate the response on component mount

//     return (
//     <div>
//         <div>
//         <h3>Generated Response:</h3>
//         <pre>{answer}</pre>
//         </div>
//     </div>
//     );
// };

// export default YourComponent;

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Replace with your actual OpenAI API key
});
let Gptresponse = '';

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
    console.error('Error:', error.message);
    throw error; // Propagate the error
  }
}
export { getOpenAIResponse };