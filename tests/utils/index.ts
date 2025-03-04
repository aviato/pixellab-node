export function createMockClientSettings() {
  const FAKE_API_KEY = "abc-super-secret-key-123";
  return {
    baseUrl: "https://api.pixellab.ai/v1",
    apiKey: FAKE_API_KEY,
    headers: {
      Authorization: `Bearer ${FAKE_API_KEY}`,
    },
  };
}

export const mockFetchSuccess = function <T extends Record<string, unknown>>(
  data: T
): void {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
      blob: () => Promise.resolve(new Blob([JSON.stringify(data)])),
      formData: () => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          const formValue =
            typeof value === "object" && value !== null
              ? new Blob([JSON.stringify(value)], { type: "application/json" })
              : String(value);
          formData.append(key, formValue);
        });
        return Promise.resolve(formData);
      },
      headers: new Headers({ "Content-Type": "application/json" }),
      status: 200,
      statusText: "OK",
    })
  );
};

// Mock error response
export const mockFetchError = (
  status = 500,
  statusText = "Internal Server Error",
  errorData = {}
) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve(errorData),
      text: () => Promise.resolve(JSON.stringify(errorData)),
      blob: () => Promise.resolve(new Blob([JSON.stringify(errorData)])),
      headers: new Headers({ "Content-Type": "application/json" }),
      status,
      statusText,
    })
  );
};

// Mock network error
export const mockFetchNetworkError = () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.reject(new Error("Network request failed"))
    );
};
