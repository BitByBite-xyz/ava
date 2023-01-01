const { ipcRenderer } = require('electron');
  

const openai = require('openai');


let enterCounter = 0;

function initialize() {
    // Initialize openAI wrapper
    openai.api_key = "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";
    ipcRenderer.send('initialize');
  
    document.addEventListener('keypress', (e) => {
      // Determine if user press Enter key twice quickly
      if (e.key === 'Enter') {
        enterCounter++;
  
        if (enterCounter === 2) {
          const input = document.getElementById('input').value;
          console.log(input);
  
          // Copy user input to clipboard
          clipboard.writeText(input);
  
          openai.Completion.create(
            engine="davinci",
            prompt=input,
            temperature=0.9,
            max_tokens=20
          )
          .then(response => {
            // Handle response
            console.log(response);
          });
  
          enterCounter = 0;
        }
      }
    });
  }



initialize();

openai.api_key = "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";

