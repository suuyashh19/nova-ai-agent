
import {
  ServerOptions,
  cli,
  defineAgent,
  inference,
  voice,
} from '@livekit/agents';

import {
  EnhancerModel,
  audioEnhancement,
} from '@livekit/plugins-ai-coustics';

import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createAgent } from './agent.ts';

// Load environment variables
dotenv.config({ path: '.env.local' });

export default defineAgent({
  entry: async (ctx) => {
    const session = new voice.AgentSession({
      // Speech recognition
      stt: new inference.STT({
        model: 'assemblyai/universal-3-6-pro',
        language: 'en',
      }),

      // Help recognize important terms
      keytermsOptions: {
        keyterms: ['LiveKit', 'Nova AI'],
        keytermDetection: {
          enabled: true,
        },
      },

      // Text-to-speech
      tts: new inference.TTS({
        model: 'fishaudio/s2.1-pro',
        voice: 'fa4c9eb3dccc4806b382b40d61c6b10a',
      }),

      // Conversation timing
      turnHandling: {
        turnDetection: new inference.TurnDetector(),

        endpointing: {
          mode: 'fixed',
          minDelay: 300,
          maxDelay: 2000,
        },

        preemptiveGeneration: {
          enabled: true,
          preemptiveTts: true,
        },
      },

      expressive: true,
    });

    // Start the voice session
    await session.start({
      agent: createAgent(),
      room: ctx.room,
      inputOptions: {
        noiseCancellation: audioEnhancement({
          model: EnhancerModel.QuailVfS,
        }),
      },
    });

    // Connect to the room
    await ctx.connect();

    // Greet the user
    session.generateReply({
      instructions:
        'Greet the user as Nova AI in a friendly, concise way.',
    });
  },
});

// Start the agent server
cli.runApp(
  new ServerOptions({
    agent: fileURLToPath(import.meta.url),
    agentName: 'my-agent',
  }),
);