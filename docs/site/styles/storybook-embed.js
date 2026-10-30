// Sizes each Storybook story iframe to its content. This reads the frame's document,
// so the story URL must be on the docs' origin; a cross-origin frame keeps its CSS height.
document.querySelectorAll('.sb-embed iframe').forEach((frame) => {
  const watch = () => {
    const doc = frame.contentDocument;
    if (!doc?.body || frame.dataset.sized) return;
    frame.dataset.sized = 'true';
    const fit = () => { frame.style.height = `${doc.documentElement.scrollHeight}px`; };
    new ResizeObserver(fit).observe(doc.body);
    fit();
  };
  frame.addEventListener('load', watch);
  // A frame can finish loading before this script runs. A lazy frame that hasn't
  // started also reports 'complete', on about:blank, and must wait for its load event.
  if (frame.contentDocument?.readyState === 'complete' && frame.contentDocument.URL !== 'about:blank') watch();
});
