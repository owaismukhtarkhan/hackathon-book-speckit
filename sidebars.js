// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'doc',
      id: 'physical-ai-concepts',
    },
    {
      type: 'doc',
      id: 'digital-vs-embodied-ai',
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'doc',
          id: 'modules',
        },
        {
          type: 'doc',
          id: 'module1', // Placeholder for Module 1 content
        },
        {
          type: 'doc',
          id: 'module2', // Placeholder for Module 2 content
        },
      ],
    },
    {
      type: 'doc',
      id: 'simulations',
    },
    {
      type: 'doc',
      id: 'validation-checklist',
    },
  ],
};

module.exports = sidebars;