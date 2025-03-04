class AIAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.instagramAccessToken = null; // Store Instagram access token
  }

  // Generate post content using Gemini API
  async generatePostContent(preferences) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a social media post based on these preferences:
                    - Type of Content: ${preferences.type}
                    - Theme: ${preferences.theme}
                    - Audience: ${preferences.audience}
                    - Intrusive Thought: ${preferences.intrusiveThought}
                    
                    Keep it engaging and under 100 words.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating post content:", error);
      return "Unable to generate post content at this time.";
    }
  }

  async generateMedia(theme) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://source.unsplash.com/300x300/?${theme}`);
      }, 2000);
    });
  }

  async loginToInstagram(clientId, redirectUri) {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    window.location.href = authUrl;
  }

  async handleInstagramCallback(code, clientId, clientSecret, redirectUri) {
    try {
      const response = await fetch(
        "https://api.instagram.com/oauth/access_token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: code,
          }),
        }
      );

      const data = await response.json();
      this.instagramAccessToken = data.access_token;
      return data.access_token;
    } catch (error) {
      console.error("Error getting Instagram access token:", error);
      return null;
    }
  }

  async postToInstagram(caption, mediaUrl) {
    if (!this.instagramAccessToken) {
      throw new Error("Instagram access token is missing.");
    }

    try {
      const mediaResponse = await fetch(
        `https://graph.instagram.com/media?access_token=${this.instagramAccessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: mediaUrl,
            caption: caption,
          }),
        }
      );

      const mediaData = await mediaResponse.json();
      const mediaId = mediaData.id;

      // Step 2: Publish the media
      const publishResponse = await fetch(
        `https://graph.instagram.com/${mediaId}/publish?access_token=${this.instagramAccessToken}`,
        {
          method: "POST",
        }
      );

      const publishData = await publishResponse.json();
      return publishData;
    } catch (error) {
      console.error("Error posting to Instagram:", error);
      throw error;
    }
  }
}

export default AIAgent;
