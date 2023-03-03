import { renderHook, act } from "@testing-library/react";
import useLoadingTimer from "../useTimer";

describe("useLoadingTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Should start and pause timer correctly", async () => {
    const { result } = renderHook(() => useLoadingTimer());

    expect(result.current.time).toBe(0);

    await act(async () => {
      result.current.start();

      jest.advanceTimersByTime(2000);

      result.current.pause();

      jest.advanceTimersByTime(2000);
    });

    expect(result.current.time).toBe(2);
  });

  it("Should start and stop timer correctly", async () => {
    const { result } = renderHook(() => useLoadingTimer());

    expect(result.current.time).toBe(0);

    await act(async () => {
      result.current.start();

      jest.advanceTimersByTime(3000);

      result.current.stop();
    });

    expect(result.current.time).toBe(0);
  });
});
