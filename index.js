

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
summarizeText("Wikis are powered by wiki software, also known as wiki engines. Being a form of content management system, these differ from other web-based systems such as blog software or static site generators in that the content is created without any defined owner or leader. Wikis have little inherent structure, allowing one to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a lightweight markup language and sometimes edited with the help of a rich-text editor.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are free and open-source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Further rules may be imposed to organize content. In addition to hosting user-authored content, wikis allow those users to interact, hold discussions, and collaborate.").then(console.log);