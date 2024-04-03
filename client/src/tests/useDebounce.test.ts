import { expect, it, describe, afterEach, vitest } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useDebounce from "../hooks/useDebounce";

describe("useDebounce", () => {
  afterEach(() => {
    vitest.useRealTimers();
  });

  it("should return value after a delay", () => {
    vitest.useFakeTimers();
    const items = "Could be anything";

    const { result } = renderHook(() => useDebounce(items, 5000));

    expect(result.current).toBe("Could be anything");
  });
});
