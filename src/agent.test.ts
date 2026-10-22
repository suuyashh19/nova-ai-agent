import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createAgent } from './agent';

const { mockAgentCreate, mockLLM } = vi.hoisted(() => ({
  mockAgentCreate: vi.fn(function (config) {
    return config;
  }),
  mockLLM: vi.fn(
    class {
      constructor(config) {
        return config;
      }
    },
  ),
}));
vi.mock('@livekit/agents', () => ({
  Agent: {
    create: mockAgentCreate,
  },
  dedent: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings.reduce((result, part, index) => result + part + (values[index] ?? ''), ''),
  inference: {
    LLM: mockLLM,
  },
}));

describe('Nova AI agent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configures Nova instructions and the expected language model', () => {
    const agent = createAgent();

    expect(agent.instructions).toContain('Nova');
    expect(agent.instructions).toContain('Ask one question at a time');
    expect(agent.instructions).toContain(
      'Never use bullet points, numbered lists, or lists of capabilities',
    );
    expect(mockLLM).toHaveBeenCalledWith({
      model: 'deepseek-ai/deepseek-v4.1-flash',
    });
    expect(mockAgentCreate).toHaveBeenCalledOnce();
  });
});
