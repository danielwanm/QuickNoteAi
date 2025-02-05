import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: `https://quicknoteai-d04d4-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const notesRef = ref(database, `identity/${sessionStorage.getItem("key")}/notes`);
const topics = ref(database, `identity/${sessionStorage.getItem("key")}/topics`);
const localtopics = ["shopping", "cooking", "health", "travel"];

onValue(topics, function(snapshot){
    let topicsRef = Object.values(snapshot.val())[0]
    localtopics = topicsRef
}
)

const form = document.getElementById("main");

form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent form submission
    const textEl = document.getElementById("input").value; // Get the latest value
    try {
        const topic = await classifyText(textEl, localtopics); // Output: "shopping"
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
                    "Authorization": "Bearer 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", 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: text,
                    parameters: { candidate_labels: topics }
                })
            }
        );
        const result = await response.json();
        console.log(result);
        if (result.scores[0]<0.5){
            let newtopic = generateTopic(text)
            console.log(newtopic)
            localtopics.push(newtopic)
            console.log(localtopics)
            //push(topics, localtopics)
            classifyText(text, topics)
        }
        return result.labels[0]; // Return the most likely topic
    } catch (error) {
        console.error("Error classifying text:", error);
        throw error;
    }
}







async function generateTopic(sentence) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/google/gemma-2-2b-it", // Use a text generation model
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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", // Replace with your Hugging Face API key
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: `Generate a 1-3 word topic based on this sentence: "${sentence}"`,
                parameters: {
                    max_length: 50, // Limit the length of the generated text
                    num_return_sequences: 1 // Return only one topic
                }
            })
        }
    );
    const result = await response.json();
    return result[0]?.generated_text || "Error generating topic.";  
}