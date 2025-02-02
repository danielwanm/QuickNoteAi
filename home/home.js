import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: `https://quicknoteai-d04d4-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const notesRef = ref(database, `identity/${sessionStorage.getItem("key")}/notes`);
const topics = ["shopping", "cooking", "health", "travel"];
const form = document.getElementById("main");

form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent form submission
    const textEl = document.getElementById("text").value; // Get the latest value
    try {
        const topic = await classifyText(textEl, topics); // Output: "shopping"
        console.log(topic)
        await push(notesRef, { "topic": topic, "text": textEl });
    } catch (error) {
        console.error("Error:", error);
    }
});

async function classifyText(text, topics) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer YOUR_API_KEY", // Replace with your Hugging Face API key
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: text,
                    parameters: { candidate_labels: topics }
                })
            }
        );
        const result = await response.json();
        return result.labels[0]; // Return the most likely topic
    } catch (error) {
        console.error("Error classifying text:", error);
        throw error;
    }
}
