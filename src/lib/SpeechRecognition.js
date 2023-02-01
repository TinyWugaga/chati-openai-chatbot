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
    this.init(SpeechRecognition, config);
  }

  _bindEvents() {
    this._onSpeechStart = (e) => this._handleSpeechStart(e);
    this._onSpeechResult = (e) => this._handleSpeechResult(e);
  }

  init(SpeechRecognition, config) {
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
    this._recognition.addEventListener("speechstart", this._onSpeechStart);
  }

  _handleSpeechStart() {
    this._recognition.addEventListener("result", this._onSpeechResult);
    this._isListening = true;

    console.log("Speech has been detected.");
  }

  _handleSpeechResult(e) {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log("Text: " + text);

    this._currentText = text.trim();
  }

  _handleSpeechEnd(handler = null) {
    if (this.isListening) {
      this._recognition.stop();

      this._recognition.removeEventListener("result", this._onSpeechResult);
      this._isListening = false;

      handler && handler(this._currentText);
    }
  }

  _clearSpeechText() {
    this._currentText = "";
  }

  _removeEventListeners() {
    this._recognition.removeEventListener("speechstart", this._onSpeechStart);
  }

  async start() {
    if (!this.isListening) {
      this._recognition.start();
      return new Promise((resolve, reject) => {
        try {
          this._recognition.addEventListener(
            "speechend",
            () => {
              this._handleSpeechEnd(resolve);
            },
            {
              once: true,
            }
          );
        } catch (error) {
          reject(error.message);
        }
      });
    }
  }

  stop() {
    const result = this._recognition.stop();
    this._handleSpeechResult(result);

    this._recognition.removeEventListener("result", this._onSpeechResult);
    this._isListening = false;

    return this._currentText;
  }

  reset() {
    this._handleSpeechEnd();
    this._clearSpeechText();
  }

  destroy() {
    this._removeEventListeners();
    this._clearSpeechText();

    this._recognition = null;
  }

  get isListening() {
    return this._isListening;
  }

  get currentText() {
    return this._currentText;
  }
}

export default SpeechRecognition;
