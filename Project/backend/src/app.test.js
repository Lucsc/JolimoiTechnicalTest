import request from 'supertest';
import app from './app.js';

describe('GET /convertToRoman/:number', () => {
    test('send invalid response for number lesser than 0', async () => {
        const res = await request(app).get('/convertToRoman/-1');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toMatch(/text\/event-stream/);
        // On récupère le corps sous forme de texte (supertest ne parse pas SSE), on vérifie la chaîne
        expect(res.text).toContain('Number invalid, should be between 0 and 100');
    });

    test('renvoie le résultat correct pour 10', async () => {
        const res = await request(app).get('/convertToRoman/10');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toMatch(/text\/event-stream/);
        expect(res.text).toContain('X');
    });

    test('renvoie message pour 0', async () => {
        const res = await request(app).get('/convertToRoman/0');
        expect(res.text).toContain('Zero is not represented in Roman numerals');
    });

    test('send invalid response for number greater than 100', async () => {
        const res = await request(app).get('/convertToRoman/101');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toMatch(/text\/event-stream/);
        // On récupère le corps sous forme de texte (supertest ne parse pas SSE), on vérifie la chaîne
        expect(res.text).toContain('Number invalid, should be between 0 and 100');
    });
    
    test('send invalid response for not number', async () => {
        const res = await request(app).get('/convertToRoman/abc');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toMatch(/text\/event-stream/);
        // On récupère le corps sous forme de texte (supertest ne parse pas SSE), on vérifie la chaîne
        expect(res.text).toContain('Number invalid, should be between 0 and 100');
    });
});