export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
