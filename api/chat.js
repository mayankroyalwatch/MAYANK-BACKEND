export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  try {
    const body = await req.json?.() || req.body; // For local & Vercel compatibility

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer sk-or-v1-7d2...28f", // Replace with your working OpenRouter key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openchat/openchat-3.5-0106", // or gpt-3.5-turbo if you prefer
        messages: body.messages
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Something went wrong in the backend." });
  }
}
