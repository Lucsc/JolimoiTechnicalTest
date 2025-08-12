import express from 'express';
import cors from 'cors';
import toRoman from "./toRoman.js";

const app = express();
app.use(cors());

app.get('/convertToRoman/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
    
    if (isNaN(number) || number < 0 || number > 100) {
        res.write(`data: ${JSON.stringify({ error: 'Number invalid, should be between 0 and 100' })}\n\n`);
        return res.end();
    }
    if (number === 0) {
        res.write(`data: ${JSON.stringify({ result: 'Zero is not represented in Roman numerals' })}\n\n`);
        return res.end();
    }
    const romanNumeral = toRoman(number);
    setTimeout(() => {
        res.write(`data: ${JSON.stringify({ result: romanNumeral })}\n\n`);
        res.end();
    }, 1000);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
