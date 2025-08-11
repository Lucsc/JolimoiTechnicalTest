import express from 'express';
import cors from 'cors';
import toRoman from "./toRoman.js";

const app = express();
app.use(cors());

app.get('/convertToRoman/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number) || number < 0 || number > 100) {
        return res.status(400).json({ error: 'Number invalid, should be between 0 and 100' });
    }
    if (number === 0) {
        return res.json({ result : 'Zero is not represented in Roman numerals' });
    }
    const romanNumeral = toRoman(number);
    res.json({ result: romanNumeral });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
