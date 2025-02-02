
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://quicknoteai-d04d4-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const form = document.getElementById("main")
form.addEventListener("submit", function(e){
    e.preventDefault(); // Prevent form submission
    // call deepai api and set into a catagoy and then push to firebase
    
})

async function summarizeText(text) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: text })
        }
    );
    const result = await response.json();
    return result[0]?.summary_text || "Error summarizing text.";
}

// Example usage
summarizeText("Metaphysics is the branch of philosophy that examines the basic structure of reality. Some philosophers designate it as first philosophy to suggest that it is more fundamental than other forms of philosophical inquiry. It is traditionally seen as the study of mind-independent features of the world, but some theorists view it as an inquiry into the conceptual framework of human understanding. Metaphysics investigates the nature of existence, the features all entities have in common, and their division into categories of being. An influential division is between particulars and universals. Modal metaphysics examines what it means for something to be possible or necessary. Metaphysicians also explore the concepts of space, time, and change, and their connection to causality and the laws of nature. Other topics include how mind and matter are related, whether everything in the world is predetermined, and whether there is free will.").then(console.log);