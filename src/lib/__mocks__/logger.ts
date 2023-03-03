const mockLogger = {
  log: jest.fn(() => console.log("test logger")),
  error: jest.fn(() => console.log("test logger")),
};

export default mockLogger;
