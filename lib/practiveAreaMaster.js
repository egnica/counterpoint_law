export const practiceAreaMaster = {
  // Page title and H1
  title: "",
  
  // Short paragraph displayed beneath the H1
  // Also used on parent-page service cards
  summary: "",

  // null for a main practice area
  // string for one parent
  // array for multiple parents
  parent: null,

  // Only used for the five homepage practice areas
  homeOrder: null,

  // Primary card/hero image
  image: {
    src: "",
    alt: "",
  },

  // Ordered page sections
  content: [
    {
      type: "section",

      // Section H2
      title: "",

      // Each string renders as a separate paragraph
      body: [""],

      image: {
        src: "",
        alt: "",
      },
    },

    {
      type: "list-section",

      // Section H2
      title: "",

      // Introductory paragraphs before the list
      body: [""],

      items: [
        {
          // Optional bold lead-in
          lead: "",
          text: "",
        },
      ],

      image: {
        src: "",
        alt: "",
      },
    },

    {
      type: "steps-section",

      // Section H2
      title: "",

      // Introductory paragraphs before the steps
      body: [""],

      steps: [
        {
          // Optional H3
          heading: "",
          text: "",
        },
      ],

      image: {
        src: "",
        alt: "",
      },
    },

    {
      type: "practice-links-section",

      // Section H2
      title: "",

      // Introductory paragraphs before the generated links
      body: [""],
    },
  ],
};
