


import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://quicknoteai-d04d4-default-rtdb.asia-southeast1.firebasedatabase.app/`
}



const app = initializeApp(appSettings)
const database = getDatabase(app)
const notes = ref(database, `identity/${sessionStorage.getItem("key")}/notes`)
let textEl = document.getElementById("input").value
const topics = ["shopping", "cooking", "health", "travel"];
const form = document.getElementById("main")
form.addEventListener("submit", function(e){
    e.preventDefault(); // Prevent form submission
    // call deepai api and set into a catagoy and then push to firebase
    let topic=  classifyText(textEl, topics) // Output: "shopping"
    push(notes, {"topic": topic, "text": textEl})
})

async function classifyText(text, topics) {
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
}
