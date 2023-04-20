require("dotenv").config({ path: "../config.env" });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.APPSETTING_OPENAI_API_SECRET,
});
const openai = new OpenAIApi(configuration);

//summarize text
exports.summarize = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this: \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (response.data) {
      if (response.data.choices[0].text) {
        return res.status(200).json(response.data.choices[0].text);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//summarize text
exports.buildtest = async (req, res) => {
  const { type, level, questionNo, subject } = req.body;

  switch (type) {
    case "multiplechoice":
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Create a ${type} test for ${level} intellegence with ${questionNo} questions about ${subject}. Do not repeat questions. Output in JSON format. Example: { "questions": [ { "question": "This is a Question?", "options": [ "A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4" ], "answer": 0 ,"type": "multiplechoice" }]}`,
          max_tokens: 2000,
          temperature: 0.5,
        });
        if (response.data) {
          if (response.data.choices[0].text) {
            return res.status(200).json(response.data.choices[0].text);
          }
        }
      } catch (err) {
        return res.status(404).json({ message: err.message });
      }

      break;

    default:
      break;
  }
};

//generate a paragraph
exports.paragraph = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a detailed paragraph about: \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (response.data) {
      if (response.data.choices[0].text) {
        return res.status(200).json(response.data.choices[0].text);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//generate a yoda-like chatbot
exports.chatbot = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer questions similar to how Yoda from Star Wars would.
            Me: "What is your name?"
            Yoda: "Yoda my name is."
            Me: "How old are you?"
            Yoda: "Old I am. 900 years old I am."
            Me: "What is your favorite color?"
            Yoda: "Blue my favorite color is."
            Me; ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (response.data) {
      if (response.data.choices[0].text) {
        return res.status(200).json(response.data.choices[0].text);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//convert english into javscript
exports.jsConverter = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `/* Convert these instruction into JavaScript code: \n${text} */`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (response.data) {
      if (response.data.choices[0].text) {
        return res.status(200).json(response.data.choices[0].text);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//generate a sci-fi image
exports.scifi = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createImage({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (response.data) {
      if (response.data.data[0].url) {
        return res.status(200).json(response.data.data[0].url);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
