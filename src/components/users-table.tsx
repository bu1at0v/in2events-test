"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/schemas/user";
import debounce from "lodash/debounce";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";

import { ShowUserInfoModal } from "./show-user-info-modal";
import Image from "next/image";

interface UsersTableProps {
  users: User[];
  searchTerm: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  searchTerm,
}) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      let updatedUsers = [...users];
      if (searchTerm !== "") {
        const lowercasedFilter = searchTerm.toLowerCase();
        updatedUsers = updatedUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(lowercasedFilter) ||
            user.name.toLowerCase().includes(lowercasedFilter) ||
            user.email.toLowerCase().includes(lowercasedFilter)
        );
      }
      setFilteredUsers(updatedUsers);
    }, 500);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [searchTerm, users]);

  useEffect(() => {
    if (sortConfig !== null) {
      setFilteredUsers((prevFilteredUsers) => {
        const sortedUsers = [...prevFilteredUsers];
        sortedUsers.sort((a, b) => {
          const key = sortConfig.key as keyof User;
          if (a[key] !== undefined && b[key] !== undefined) {
            if (a[key] < b[key]) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[key] > b[key]) {
              return sortConfig.direction === "asc" ? 1 : -1;
            }
          }
          return 0;
        });
        return sortedUsers;
      });
    }
  }, [sortConfig]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <CaretSortIcon className="display-inline" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpIcon className="display-inline" />
    ) : (
      <ArrowDownIcon className="display-inline" />
    );
  };

  return (
    <div className="py-10">
      {filteredUsers.length > 0 ? (
        <Table className="w-full border border-white">
          <TableCaption>A list of users.</TableCaption>
          <TableHeader className="border border-white">
            <TableRow>
              <TableHead className="text-white bg-black hidden sm:table-cell">
                Avatar
              </TableHead>
              <TableHead className="text-white bg-black hidden sm:table-cell">
                ID
              </TableHead>
              <TableHead
                className="text-white bg-black cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Name {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead
                className="text-white bg-black hidden sm:table-cell cursor-pointer"
                onClick={() => requestSort("username")}
              >
                <div className="flex items-center">
                  Username {getSortIcon("username")}
                </div>
              </TableHead>
              <TableHead
                className="text-white bg-black cursor-pointer"
                onClick={() => requestSort("email")}
              >
                <div className="flex items-center">
                  Email {getSortIcon("email")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="cursor-pointer bg-black hover:bg-gray-900"
              >
                <TableCell className="hidden sm:table-cell">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-600"></div>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-white py-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-white py-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.name}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-white py-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.username}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-white py-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.email}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-lg">
          No users found. Try another search.
        </div>
      )}

      {selectedUser && (
        <ShowUserInfoModal user={selectedUser} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default UsersTable;
