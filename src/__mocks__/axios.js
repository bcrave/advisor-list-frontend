const mockResponse = {
  data: {
    results: [
      {
        firstName: "Brendon",
        lastName: "Crave",
        isOnline: true,
        languagesKnown: ["English", "Russian", "German"],
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
