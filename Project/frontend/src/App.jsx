import { useState } from "react";
import axios from "axios";

function App() {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleErrorInvalid = (e) => {
        e.preventDefault();
        const nb = Number(number);
        if (isNaN(nb) || nb < 0 || nb > 100)
            setError("Number is invalid. Please enter a number between 0 and 100.");
    };
    
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
            window.currentSSE = null;
        }
        const evtSource = new EventSource(`http://localhost:3000/convertToRoman/${number}`);
        setLoading(true);
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
            setLoading(false);
        }
        
        evtSource.onerror = (e) => {
            console.error("Error occurred in SSE:", e);
            setError("An error occurred while fetching the result. Please try again.");
            evtSource.close();
            setLoading(false);
        }
        
    };

    return (
        <div style={{ padding: "2rem", alignItems: "center", border: "1px solid black", width : "30%", margin: "auto", borderRadius: "10px", textAlign: "center", height : "100%"}}>
            <h1>Convert literal numbers between 0 and 100 to roman numbers</h1>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="number"
                    min="0"
                    max="100"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onInvalid={handleErrorInvalid}
                    onError={handleErrorInvalid}
                    title="Please enter a number between 0 and 100"
                />
                <button type="submit">Convert</button>
            </form>
            {result && <h2>Result : {result}</h2>}
            {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
            {loading && <h2>Loading...</h2>}
        </div>
    );
}

export default App;
