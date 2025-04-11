# X AI Agent MCP (Model Context Protocol)

A powerful AI agent that can interact with X (formerly Twitter) and perform various tasks using the Model Context Protocol (MCP). This project demonstrates the integration of AI capabilities with social media platforms.

## Features

- 🤖 AI-powered interactions using Gemini AI
- 🐦 X (Twitter) integration for posting content
- 😄 Dark humor joke generator
- 🔄 Real-time communication using Server-Sent Events (SSE)
- 🛠️ Extensible tool system for adding new capabilities

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Twitter Developer Account with API access
- Google Gemini API key

## Project Structure

```
X_AI_Agent_MCP/
├── client/                 # Client-side code
│   ├── index.js           # Main client application
│   └── package.json       # Client dependencies
├── server/                # Server-side code
│   ├── index.js          # Main server application
│   ├── mcp.tool.js       # Twitter integration tools
│   └── package.json      # Server dependencies
└── .env                  # Environment variables
```

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd X_AI_Agent_MCP
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.sample` to `.env` in both client and server directories
   - Fill in your API keys and tokens:
     ```
     # Server .env
     TWITTER_API_KEY=your_twitter_api_key
     TWITTER_API_SECRET=your_twitter_api_secret
     TWITTER_ACCESS_TOKEN=your_twitter_access_token
     TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

     # Client .env
     GEMINI_API_KEY=your_gemini_api_key
     ```

## Running the Application

1. Start the server:
   ```bash
   cd server
   npx nodemon
   ```

2. Start the client:
   ```bash
   cd client
   node index.js
   ```

3. The application will connect to the MCP server and you can start interacting with the AI agent.

## Available Tools

### Twitter Integration
- `createPost`: Create a new post on X (Twitter)
  - Parameters:
    - `status`: The content of the tweet (max 280 characters)

### Entertainment
- `darkHumorJoke`: Generate a random dark humor joke
  - Parameters:
    - `theme`: (Optional) Theme for the joke

## Error Handling

The application includes comprehensive error handling for:
- Twitter API authentication issues
- Rate limiting
- Invalid tweet content
- Connection issues
- API key validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Google Gemini AI](https://ai.google.dev/)
- [Express.js](https://expressjs.com/) 