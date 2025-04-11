import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createPost } from "./mcp.tool.js";
import { z } from "zod";

const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();


// ... existing code ...
server.tool(
    "darkHumorJoke",
    "Generate a dark humor joke",
    {
        theme: z.string().optional().describe("Optional theme for the joke (e.g., 'death', 'life', 'relationships')")
    },
    async (arg) => {
        const darkJokes = [
            "Why don't cannibals eat clowns? Because they taste funny.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I used to think the brain was the most important organ. Then I thought, look what's telling me that.",
            "I'm on a seafood diet. I see food and I eat it... unless it's still moving.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I'm not lazy, I'm on energy-saving mode.",
            "I'm reading a book about anti-gravity. It's impossible to put down!",
            "I used to be a baker, but I couldn't make enough dough.",
            "I'm on a whiskey diet. I've lost three days already.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised."
        ];
        
        const randomJoke = darkJokes[Math.floor(Math.random() * darkJokes.length)];
        
        return {
            content: [
                {
                    type: "text",
                    text: randomJoke
                }
            ]
        }
    }
)
// ... existing code ...

server.tool(
    "createPost",
    "Create a post on X formally known as Twitter", {
    status: z.string().describe("The content of the tweet to post")
}, async (arg) => {
    try {
        const { status } = arg;
        if (!status || status.trim().length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: Tweet content cannot be empty"
                    }
                ]
            }
        }
        
        if (status.length > 280) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: Tweet content exceeds 280 characters limit"
                    }
                ]
            }
        }
        
        const result = await createPost(status);
        return result;
    } catch (error) {
        console.error("Error in createPost tool:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error creating post: ${error.message}`
                }
            ]
        }
    }
})


// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages', res);
    transports[ transport.sessionId ] = transport;
    res.on("close", () => {
        delete transports[ transport.sessionId ];
    });
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[ sessionId ];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});