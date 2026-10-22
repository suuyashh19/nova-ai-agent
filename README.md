# Nova AI — Real-Time Voice Assistant

Nova AI is an AI-powered voice assistant built with LiveKit Agents and TypeScript. It is designed for natural, conversational voice interactions through a web interface.

The project combines speech recognition, a large language model, and text-to-speech to create a voice assistant that can listen, respond, and communicate naturally.

## Features

- Real-time voice interaction through a web interface
- Speech-to-text using AssemblyAI
- AI-generated responses using DeepSeek
- Text-to-speech using Fish Audio
- Turn detection for natural conversation flow
- Audio noise cancellation
- Conversational instructions designed for concise, beginner-friendly responses
- Automated tests and conversation simulations with GitHub Actions

## Tech Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| TypeScript     | Agent development                      |
| LiveKit Agents | Voice-agent framework                  |
| LiveKit Cloud  | Real-time communication infrastructure |
| AssemblyAI     | Speech recognition                     |
| DeepSeek       | Language model                         |
| Fish Audio     | Speech generation                      |
| Ai-coustics    | Audio enhancement                      |
| Vitest         | Automated tests                        |
| GitHub Actions | Continuous integration                 |

## Architecture

1. **Audio input:** The user speaks through the web interface.
2. **Speech recognition:** AssemblyAI converts the user's speech into text.
3. **AI processing:** DeepSeek generates a response according to Nova's instructions.
4. **Speech generation:** Fish Audio converts the response into spoken audio.
5. **Audio output:** LiveKit delivers the assistant's response to the user.

The agent and web interface are maintained in separate repositories.

## Project Repositories

- **Voice agent:** [nova-ai-agent](https://github.com/suuyashh19/nova-ai-agent)
- **Web interface:** [nova-ai-voice-assistant](https://github.com/suuyashh19/nova-ai-voice-assistant)

## Getting Started

### Prerequisites

- Node.js compatible with the project configuration
- pnpm
- LiveKit CLI
- A LiveKit Cloud project and the required credentials

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/suuyashh19/nova-ai-agent.git
cd nova-ai-agent
pnpm install
```

Create a local environment file by copying `.env.example` to `.env.local`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Add your LiveKit Cloud credentials to `.env.local`:

```dotenv
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

Use your actual credentials locally. Never commit `.env.local` or expose your API secret.

### Run the Agent

Authenticate with LiveKit Cloud if needed, then start the development agent:

```bash
lk cloud auth
lk agent dev
```

Keep the agent running while connecting the web interface.

## Testing

Run the automated tests:

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm exec prettier --check .
```

Run the conversation simulations:

```bash
lk agent simulate text --scenarios scenarios.yaml
```

The GitHub Actions workflows run the project's automated checks and conversation simulations. The current repository has successfully passed both workflows.

## Security

- Keep credentials in local environment files or GitHub Actions secrets.
- Never commit API keys, API secrets, or other private credentials.
- Use `.env.example` only for placeholder values.

## Future Improvements

- Improve interruption handling and conversational responsiveness.
- Add more conversation simulation scenarios.
- Improve error handling and connection status in the web interface.
- Add a live demo and project screenshots.

## Author

**Suyash Bhuyar**

BCA Graduate | AI Voice Agents | TypeScript

GitHub: [@suuyashh19](https://github.com/suuyashh19)

---

This project is built using [LiveKit Agents](https://docs.livekit.io/agents/) and [LiveKit Cloud](https://cloud.livekit.io/).
