import { useState } from "react";
import axios from "axios";

function App() {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:3000/convertToRoman/${number}`);
            setResult(res.data.result);
        } catch (err) {
            setResult("Erreur: nombre invalide");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Convertisseur Nombres → Romains</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <button type="submit">Convertir</button>
            </form>
            {result && <h2>Résultat : {result}</h2>}
        </div>
    );
}

export default App;
