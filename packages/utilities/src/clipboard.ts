function writeiOS(text: string) {
  let textArea: HTMLTextAreaElement;

  function createTextArea(text: string): void {
    textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText(): void {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(textArea);
    selection?.removeAllRanges();
    selection?.addRange(range);
    textArea.setSelectionRange(0, 999999);
  }

  function copyToClipboard(): void {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  return new Promise<void>((resolve, reject) => {
    try {
      createTextArea(text);
      selectText();
      copyToClipboard();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function write(text: string) {
  return new Promise<void>((resolve, reject) => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } else {
      reject();
    }
  });
}

export default { write: 'clipboard' in navigator ? write : writeiOS };
