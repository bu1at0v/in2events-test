import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import UsersTable from "./users-table";
import { User } from "@/schemas/user";

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@doe.com",
    avatar: "https://example.com/avatar1.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@smith.com",
    avatar: "https://example.com/avatar2.png",
  },
];

test("UsersTable renders a list of users", () => {
  const { getByText, getByAltText } = render(
    <UsersTable users={mockUsers} searchTerm="" />
  );
  mockUsers.forEach((user) => {
    expect(getByText(user.name)).toBeInTheDocument();
    expect(getByText(user.email)).toBeInTheDocument();
    expect(getByAltText(`${user.name}'s avatar`)).toBeInTheDocument();
  });
});

test("UsersTable handles empty user list", () => {
  render(<UsersTable users={[]} searchTerm="" />);
  expect(
    screen.getByText("No users found. Try another search.")
  ).toBeInTheDocument();
});

test("UsersTable filters users based on search term", () => {
  render(<UsersTable users={mockUsers} searchTerm="Jane" />);
  expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
});

test("UsersTable sorts users by name", () => {
  render(<UsersTable users={mockUsers} searchTerm="" />);
  const nameHeader = screen.getByText("Name");
  fireEvent(nameHeader, "click"); // Sort ascending
  const rows = screen.getAllByRole("row");
  expect(rows[1]).toHaveTextContent("Jane Smith");
  expect(rows[2]).toHaveTextContent("John Doe");

  fireEvent(nameHeader, "click"); // Sort descending
  expect(rows[1]).toHaveTextContent("John Doe");
  expect(rows[2]).toHaveTextContent("Jane Smith");
});

test("UsersTable opens user info modal on row click", () => {
  render(<UsersTable users={mockUsers} searchTerm="" />);
  const userRow = screen.getByText("John Doe").closest("tr");
  fireEvent(userRow, "click");
  expect(screen.getByText("User Info")).toBeInTheDocument(); // Assuming modal has "User Info" text
});
