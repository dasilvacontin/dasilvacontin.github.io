export default {
  title: 'Components/TextContent',
};

function createTextContent({ title, body, maxWidth = '580px' }) {
  const section = document.createElement('section');
  section.className = 'text-content';
  section.style.maxWidth = maxWidth;

  const heading = document.createElement('h2');
  heading.className = 'text-content-title';
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.className = 'text-content-body';
  paragraph.textContent = body;

  section.append(heading, paragraph);
  return section;
}

export const Tools = {
  render: () =>
    createTextContent({
      title: 'TOOLS',
      body: 'Cursor/Claude, Linear, Figma, Notion, TDD, Evals/Humanloop, FeatureFlags/LaunchDarkly, Storybook, Chromatic, React, TypeScript, Python, SASS, Git, GitHub, Loom, Miro, Relay.app, Pinecone, JSON, Loom',
    }),
};

export const AiConcepts = {
  render: () =>
    createTextContent({
      title: 'AI CONCEPTS LEVERAGED',
      body: 'RAG, Eval, Embeddings, Vector Databases, Tool Calling, Structured Outputs, Procedures, Generative UI, Intent-layer, Orchestration-layer, Command-layer',
    }),
};
