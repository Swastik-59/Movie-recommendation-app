const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
dotenv.config()
app.use(bodyParser.json());

const api = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api", async (req, res) => {
    const { feeling, genre, favMovie } = req.body
    const prompt = `I am feeling ${feeling}, I want to watch movie from this genre ${genre}
        ,these are my fav/past watched movie ${favMovie} give me movies recommendations as many movies as you like 
        minimum should be 10 movies based on these give ONLY GIVE THE NAME OF THE MOVIE NOTHING ELSE`

    const result = await model.generateContent(prompt);
    const data = result.response.text()

    const movieArray = data
        .split('\n')
        .map(movie => movie.trim().replace(/^\d+\. /, '')) // Remove leading numbers and dots
        .filter(movie => movie !== '');
    res.send(movieArray);
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})