

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