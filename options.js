document.addEventListener('DOMContentLoaded', () => {
    const messageTemplate = document.getElementById('messageTemplate');
    const saveButton = document.getElementById('saveButton');
    const status = document.getElementById('status');
  
    chrome.storage.sync.get('messageTemplate', (data) => {
      messageTemplate.value = data.messageTemplate || '';
    });
  
    saveButton.addEventListener('click', () => {
      const message = messageTemplate.value;
      chrome.storage.sync.set({ messageTemplate: message }, () => {
        status.textContent = 'Message template saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 2000);
      });
    });
  });
  