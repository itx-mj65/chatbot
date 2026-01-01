export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY;

    return res.status(200).json({
      success: true,
      apiKeyExists: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      message: apiKey
        ? "API key is set correctly on Vercel"
        : "API key is NOT set on Vercel"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
