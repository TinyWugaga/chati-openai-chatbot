//import io from 'socket.io-client';

//const socket = io.connect('/');

/**
* =============================================================================
* = 開始接收語音內容
* =============================================================================
*
* 功能說明
*
**/
export function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = true;//即時回傳結果，Listen and return onChange

    recognition.start();

    recognition.addEventListener('speechstart', () => {
        console.log('Speech has been detected.');
      });

    recognition.addEventListener('result', (e) => {
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
      
        console.log('Confidence: ' + e.results[0][0].confidence);
    });

    recognition.addEventListener('speechend', () => {
        recognition.stop();
      });
      
}