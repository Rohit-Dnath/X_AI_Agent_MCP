import { config } from "dotenv"
import { TwitterApi } from "twitter-api-v2"
config()


const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

export async function createPost(status) {
    try {
        console.log("Attempting to create tweet with status:", status);
        console.log("Using Twitter API credentials:", {
            appKey: process.env.TWITTER_API_KEY ? "Present" : "Missing",
            appSecret: process.env.TWITTER_API_SECRET ? "Present" : "Missing",
            accessToken: process.env.TWITTER_ACCESS_TOKEN ? "Present" : "Missing",
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET ? "Present" : "Missing"
        });

        const newPost = await twitterClient.v2.tweet(status);
        console.log("Tweet created successfully:", newPost);

        return {
            content: [
                {
                    type: "text",
                    text: `Successfully tweeted: ${status}`
                }
            ]
        }
    } catch (error) {
        console.error("Error creating tweet:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to create tweet. Error: ${error.message}`
                }
            ]
        }
    }
}