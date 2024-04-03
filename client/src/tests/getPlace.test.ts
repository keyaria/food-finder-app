import { renderHook } from "@testing-library/react-hooks";
import { expect, it, describe, beforeAll, vi, afterAll } from "vitest";
import { fetchPlace } from "../helpers/helpers";

describe("getPlace", () => {
  //Spy on the global fetch function
  const fetchSpy = vi.spyOn(global, "fetch");

  //Run before all the tests
  beforeAll(() => {
    //Mock the return value of the global fetch function
    const mockResolveValue = {
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            restaurant: { place_id: "HDAONSK_SD" },
            photoStream: "A IMAGE ARRAY BUFFER",
          }),
        ),
    };

    fetchSpy.mockReturnValue(mockResolveValue as any);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  // FIX: currently when mocked the promise does not resolve the current result
  it("should fetch A Restaurant Place", async () => {
    const { result, waitFor } = renderHook(() => fetchPlace());
    await waitFor(() => {
      expect(result.current).toEqual({
        restaurant: { place_id: "HDAONSK_SD" },
        photoStream: "A IMAGE ARRAY BUFFER",
      });
    });
  });
});
