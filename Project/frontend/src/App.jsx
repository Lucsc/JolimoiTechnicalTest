import { useState } from "react";
import axios from "axios";

function App() {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("");
        setError("");
        
        const nb = Number(number);
        
        if (isNaN(nb) || nb < 0 || nb > 100) {
            setError("Number is invalid. Please enter a number between 0 and 100.");
            return;
        }
        
        if (window.currentSSE) {
            window.currentSSE.close();
        }
        const evtSource = new EventSource(`http://localhost:3000/convertToRoman/${number}`);
        window.currentSSE = evtSource;
        
        evtSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.error) {
                setError(data.error);
                evtSource.close();
            } else if (data.result) {
                setResult(data.result);
                evtSource.close();
            }
        }
        
        evtSource.onerror = (e) => {
            console.error("Error occurred in SSE:", e);
            setError("An error occurred while fetching the result. Please try again.");
            evtSource.close();
        }
        
    };

    return (
        <div style={{ padding: "2rem", alignItems: "center", border: "1px solid black", width : "30%", margin: "auto", borderRadius: "10px", textAlign: "center", height : "100%"}}>
            <h1>Convert literal numbers to roman numbers</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onInvalid={handleSubmit}
                />
                <button type="submit">Convert</button>
            </form>
            {result && <h2>Result : {result}</h2>}
        </div>
    );
}

export default App;
