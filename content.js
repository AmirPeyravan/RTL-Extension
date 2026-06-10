const customCSS = `
  body, p, div, span, li, td, .model-response-text,
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Vazirmatn', 'Vazir', 'Tahoma', sans-serif !important;
  }

  p, .message-content, .query-content,
  h1, h2, h3, h4, h5, h6,
  ul, ol, li {
    direction: rtl !important;
    text-align: right !important;
  }

  ul, ol {
    margin-right: 20px !important; 
    padding-right: 20px !important;
    padding-left: 0 !important; 
  }

  pre, code, .code-block, .mat-mdc-chip,
  pre *, code * {
    direction: ltr !important;
    text-align: left !important;
    font-family: 'Consolas', 'Courier New', monospace !important;
  }
`;

const styleTag = document.createElement('style');
styleTag.textContent = customCSS;
document.head.appendChild(styleTag);