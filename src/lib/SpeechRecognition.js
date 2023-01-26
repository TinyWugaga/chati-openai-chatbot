const DEFAULT_CONFIG = {
  lang: "en-US",
  interimResults: true, // If true return result instantly
  continuous: false,
};

class SpeechRecognition {
  _recognition;
  _currentText = "";

  // status
  _isListening = false;

  constructor(config = DEFAULT_CONFIG) {
    // MDN Reference: https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this._bindEvents();
    this._init(SpeechRecognition, config);
  }

  _bindEvents() {
    this._onHandleSpeechStart = (e) => this._handleSpeechStart(e);
    this._onHandleSpeechResult = (e) => this._handleSpeechResult(e);
  }

  _init(SpeechRecognition, config) {
    this._recognition = new SpeechRecognition();

    this._setConfig(config);
    this._addEventListeners();
  }

  _setConfig({ lang, interimResults, continuous }) {
    if (this._recognition) {
      this._recognition.lang = lang || DEFAULT_CONFIG.lang;
      this._recognition.interimResults =
        interimResults || DEFAULT_CONFIG.interimResults;
      this._recognition.continuous = continuous || DEFAULT_CONFIG.continuous;
    }
  }

  _addEventListeners() {
    this._recognition.addEventListener(
      "speechstart",
      this._onHandleSpeechStart
    );
  }

  _handleSpeechStart() {
    this._recognition.addEventListener("result", this._onHandleSpeechResult);
    this._isListening = true;

    console.log("Speech has been detected.");
  }

  _handleSpeechResult(e) {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log("Confidence: " + e.results[0][0].confidence);
    console.log("Text: " + text);

    this._currentText = text.trim();
  }

  _handleSpeechEnd(handler = null) {
    this._recognition.stop();

    this._recognition.removeEventListener("result", this._onHandleSpeechResult);
    this._isListening = false;

    handler && handler(this._currentText);
  }

  _clearSpeechText() {
    this._currentText = "";
  }

  _unbindEvents() {
    this._onHandleSpeechStart = null;
    this._onHandleSpeechResult = null;
    this._onHandleSpeechEnd = null;
  }

  _removeEventListeners() {
    this._recognition.removeEventListener(
      "speechstart",
      this._onHandleSpeechStart
    );
  }

  async start() {
    this._recognition.start();
    return new Promise((resolve) => {
      this._recognition.addEventListener(
        "speechend",
        () => {
          this._handleSpeechEnd(resolve);
        },
        {
          once: true,
        }
      );
    });
  }

  reset() {
    this._handleSpeechEnd();
    this._clearSpeechText();
  }

  destroy() {
    this._unbindEvents();
    this._removeEventListeners();

    this._recognition = null;
  }

  get isListening() {
    return this._isListening;
  }
}

export default SpeechRecognition;
