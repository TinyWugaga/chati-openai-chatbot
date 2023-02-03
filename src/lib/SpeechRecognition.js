import logger from "@/lib/logger";

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
    this._onSpeechStart = (e) => this._handleSpeechStart(e);
    this._onSpeechResult = (e) => this._handleSpeechResult(e);
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
    this._recognition.addEventListener("speechstart", this._onSpeechStart);
  }

  _handleSpeechStart() {
    this._recognition.addEventListener("result", this._onSpeechResult);
    this._isListening = true;

    logger.log("Speech has been detected.");
  }

  _handleSpeechResult(e) {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    logger.log("Text: " + transcript);

    this._currentText = transcript.trim();
  }

  _handleSpeechEnd(handler = null) {
    if (this._isListening) {
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

  initialApp(config = DEFAULT_CONFIG) {
    if (this._recognition) {
      this.destroy();
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this._init(SpeechRecognition, config);
  }

  async start() {
    if (this._recognition && !this._isListening) {
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
    return "";
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

  get currentLang() {
    return this._lang;
  }
}

export default SpeechRecognition;
