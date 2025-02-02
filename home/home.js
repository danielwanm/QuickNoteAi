if (!sessionStorage.getItem("key")) {
    window.location.href = "../index.html"
}


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
summarizeText("Your raw note here").then(console.log);