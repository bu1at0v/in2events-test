"use client";

import { UsersTable } from "../../components/users-table";

import { useUsers } from "@/services/use-users";
import { AddUserModal } from "@/components/add-user-modal";
import { useState } from "react";
import { User } from "@/schemas/user";
import SearchBar from "@/components/search-bar";
import Spinner from "@/components/spinner";

export default function UsersPage() {
  const { users, loading, addUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  const handleAddUser = (newUser: User) => {
    const emailExists = users.some((user) => user.email === newUser.email);

    if (emailExists) {
      alert("A user with this email already exists.");
      return;
    }
    addUser(newUser);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={clearSearch}
      />

      <UsersTable users={users} searchTerm={searchTerm} />

      <AddUserModal addUserToUsers={handleAddUser} />
    </div>
  );
}
