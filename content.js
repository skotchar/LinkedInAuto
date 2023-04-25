function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
  
    if (element) {
      callback(element);
    } else {
      setTimeout(() => {
        waitForElement(selector, callback);
      }, 100);
    }
  }
  
  function populateMessage() {
    const nameElement = document.querySelector('h2[id="send-invite-modal"]');
    const messageBox = document.querySelector('#custom-message');
  
    if (nameElement && messageBox) {
      const name = nameElement.textContent.replace('Invite ', '').replace(' to connect', '').trim();
      const companyElement = document.querySelector('.pv-text-details__right-panel .pv-text-details__right-panel-item:first-child .inline-show-more-text');
      const company = companyElement ? companyElement.textContent.trim() : 'your company';
  
      if (messageBox && !messageBox.value) {
        chrome.storage.sync.get('messageTemplate', (data) => {
          const defaultMessage = `Hi {name}, I hope this message finds you well! I'm a graduate interested in learning more about working at {company}. Would you be available for an informational interview about your career path? Thank you!`;
          const messageTemplate = data.messageTemplate || defaultMessage;
          messageBox.value = messageTemplate.replace(/{name}/ig, name).replace(/{company}/ig, company);
        });
      }
    }
  }
  
  
  
  
  
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        populateMessage();
      }
    }
  });
  
  waitForElement('body', (body) => {
    observer.observe(body, { childList: true, subtree: true });
  });
  