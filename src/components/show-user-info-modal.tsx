import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User } from "@/schemas/user";
import Image from "next/image";
interface ShowUserInfoModalProps {
  user: User | null;
  onClose: () => void;
}

export const ShowUserInfoModal: React.FC<ShowUserInfoModalProps> = ({
  user,
  onClose,
}) => {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <button style={{ display: "none" }}>Open Dialog</button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white rounded-md max-w-md">
        <>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription className="text-white" asChild>
            <div>
              <div className="my-5">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="rounded-full"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div
                    className="rounded-full bg-orange-600"
                    style={{ width: "100px", height: "100px" }}
                  ></div>
                )}
              </div>
              <p className="py-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="py-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="py-2">
                <strong>ID:</strong> {user.id}
              </p>
            </div>
          </DialogDescription>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ok
          </button>
        </>
      </DialogContent>
    </Dialog>
  );
};
