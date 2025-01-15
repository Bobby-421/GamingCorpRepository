window.addEventListener('message', (event) => {
  const { type, data } = event.data;

  if (event.origin !== window.location.origin) {
    return; // Ignore untrusted origins
  }

  // Handle slot machine selection
  if (type === 'slot-machine-selected') {
    const iframeGame = document.getElementById('iframe-game') as HTMLIFrameElement;
    if (iframeGame && iframeGame.contentWindow) {
      iframeGame.contentWindow.postMessage({
        type: 'update-slot-machine',
        data: data
      }, '*');
    }
  }

  // Handle balance updates
  if (type === 'update-balance') {
    const iframeMain = document.getElementById('iframe-main') as HTMLIFrameElement;
    if (iframeMain && iframeMain.contentWindow) {
      iframeMain.contentWindow.postMessage({
        type: 'update-balance',
        data: data
      }, '*');
    }
  }

});


  