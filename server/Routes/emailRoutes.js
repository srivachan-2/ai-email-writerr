const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

// Initialize Gemini
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Generate AI Email
router.post("/generate", async (req, res) => {
    try {
        const { purpose, tone, keyPoints } = req.body;

        // Validate input
        if (!purpose || !tone || !keyPoints) {
            return res.status(400).json({
                message: "Purpose, tone and key points are required",
            });
        }

        // Create prompt
        const prompt = `
You are an expert professional email writer.

Write a polished email based on the following information:

Purpose:
${purpose}

Tone:
${tone}

Key points:
${keyPoints}

Requirements:
- Write a clear and natural email.
- Match the requested tone.
- Include a suitable subject line.
- Do not add explanations outside the email.
- Do not use placeholders unless absolutely necessary.
`;

        // Try Gemini up to 3 times
        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-3.6-flash",
                    contents: prompt,
                });

                break;
            } catch (error) {
                console.log(`Gemini attempt ${attempt} failed`);

                if (attempt === 3) {
                    throw error;
                }

                // Wait 2 seconds before retrying
                await new Promise((resolve) =>
                    setTimeout(resolve, 2000)
                );
            }
        }

        // Send generated email to frontend
        res.json({
            message: "Email generated successfully",
            email: response.text,
        });

    } catch (error) {
        console.error("Gemini error:", error);

        res.status(500).json({
            message: "Failed to generate email",
            error: error.message,
        });
    }
});

module.exports = router;