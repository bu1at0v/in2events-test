// import { renderHook, act } from "@testing-library/react-hooks";
// import { useUsers } from "./use-users";

// global.fetch = jest.fn();

// describe("useUsers hook", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should fetch users successfully", async () => {
//     const mockUsers = [
//       { id: 1, name: "John Doe", username: "johndoe", email: "john@doe.com" },
//       {
//         id: 2,
//         name: "Jane Smith",
//         username: "janesmith",
//         email: "jane@smith.com",
//       },
//     ];

//     (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockUsers,
//     });

//     const { result, waitForNextUpdate } = renderHook(() => useUsers());

//     expect(result.current.loading).toBe(true);

//     await waitForNextUpdate();

//     expect(result.current.loading).toBe(false);
//     expect(result.current.users).toEqual(mockUsers);
//     expect(result.current.error).toBeNull();
//   });

//   it("should handle fetch error", async () => {
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: false,
//     });

//     const { result, waitForNextUpdate } = renderHook(() => useUsers());

//     await waitForNextUpdate();

//     expect(result.current.loading).toBe(false);
//     expect(result.current.users).toEqual([]);
//     expect(result.current.error).toBe("Failed to fetch users");
//   });

//   it("should add a new user", async () => {
//     const mockUsers = [
//       { id: 1, name: "John Doe", username: "johndoe", email: "john@doe.com" },
//     ];

//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockUsers,
//     });

//     const { result, waitForNextUpdate } = renderHook(() => useUsers());

//     await waitForNextUpdate();

//     act(() => {
//       result.current.addUser({
//         id: 0,
//         name: "Jane Smith",
//         username: "janesmith",
//         email: "jane@smith.com",
//       });
//     });

//     expect(result.current.users).toHaveLength(2);
//     expect(result.current.users[1]).toEqual({
//       id: 2,
//       name: "Jane Smith",
//       username: "janesmith",
//       email: "jane@smith.com",
//     });
//   });
// });
