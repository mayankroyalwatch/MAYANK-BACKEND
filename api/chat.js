export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  try {
    const body = req.body; // ✅ FIXED: Use this directly on Vercel

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // ✅ Your working key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openchat/openchat-3.5-0106", // or gpt-3.5-turbo
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

