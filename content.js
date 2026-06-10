const FONT_FAMILY = "'Vazirmatn', 'Vazir', 'Tahoma', sans-serif";
const MONO_FONT = "'Consolas', 'Courier New', monospace";

const MESSAGE_ROOTS = [
  // ChatGPT
  '[data-message-author-role="user"] .markdown',
  '[data-message-author-role="user"] .whitespace-pre-wrap',
  '[data-message-author-role="assistant"] .markdown',
  '[data-message-author-role="assistant"] .prose',

  // Claude
  '[data-testid="user-message"] .standard-markdown',
  '[data-testid="user-message"] .progressive-markdown',
  '[data-testid="user-message"] .markdown',
  '.font-user-message .standard-markdown',
  '.font-user-message .progressive-markdown',
  '.font-claude-response .standard-markdown',
  '.font-claude-response .progressive-markdown',
  '[data-testid="ai-message"] .standard-markdown',
  '[data-testid="ai-message"] .progressive-markdown',

  // Gemini
  'user-query .query-text',
  'user-query .markdown',
  'model-response .model-response-text',
  'model-response message-content',
  'model-response .markdown',
  '.response-content'
];

const roots = MESSAGE_ROOTS.join(', ');
const textElements = 'p, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote, td, th';
const codeSuffixes = ['pre', 'code', '.code-block', '[class*="code-block"]', '[class*="hljs"]'];
const codeSelectors = codeSuffixes
  .flatMap((suffix) =>
    MESSAGE_ROOTS.flatMap((root) => [`${root} ${suffix}`, `${root} ${suffix} *`])
  )
  .join(', ');

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap';
document.head.appendChild(fontLink);

const customCSS = `
  ${roots} {
    direction: rtl !important;
    text-align: right !important;
    font-family: ${FONT_FAMILY} !important;
    unicode-bidi: plaintext;
  }

  ${roots} ${textElements} {
    direction: rtl !important;
    text-align: right !important;
    font-family: ${FONT_FAMILY} !important;
  }

  ${roots} ul,
  ${roots} ol {
    margin-right: 1.25em !important;
    margin-left: 0 !important;
    padding-right: 1.25em !important;
    padding-left: 0 !important;
  }

  ${codeSelectors} {
    direction: ltr !important;
    text-align: left !important;
    font-family: ${MONO_FONT} !important;
    unicode-bidi: isolate;
  }
`;

const styleTag = document.createElement('style');
styleTag.id = 'rtl-extension-styles';
styleTag.textContent = customCSS;
document.head.appendChild(styleTag);
