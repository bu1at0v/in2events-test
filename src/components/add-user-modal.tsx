"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { User } from "@/schemas/user";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  name: z
    .string()
    .min(1, "Full name is required")
    .regex(/.*\s.*/, "Full name must contain at least one space"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Invalid URL").optional(),
});

type UserFormData = User;

interface AddUserModalProps {
  addUserToUsers: (newUser: User) => void;
}

const FormField: React.FC<{
  field: keyof UserFormData;
  label?: string;
  register: any;
  error: string | undefined;
  setValue?: (field: keyof UserFormData, value: any) => void;
}> = ({ field, label, register, error, setValue }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && setValue) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-field mb-3">
      <label className="form-label w-full text-white">
        {label || field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      {field === "avatar" ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input p-2 border rounded-md w-full mb-2 bg-gray-900"
        />
      ) : (
        <input
          {...register(field as keyof UserFormData)}
          className="form-input p-2 border rounded-md w-full mb-2 bg-gray-900"
        />
      )}
      {error && <p className="form-error text-danger">{error}</p>}
    </div>
  );
};

export const AddUserModal: React.FC<AddUserModalProps> = ({
  addUserToUsers,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (newUser: UserFormData) => {
    addUserToUsers(newUser);
    reset();
    setIsOpen(false);
  };

  const fields = Object.keys(userSchema.shape);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpen(true)}
        >
          Add User
        </button>
      </DialogTrigger>
      <DialogContent
        className="bg-black text-white"
        aria-describedby="add-user-description"
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogDescription id="add-user-description">
          Please fill out the form below to add a new user.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <FormField
              key={field}
              field={field as keyof UserFormData}
              label={field === "avatar" ? "Avatar URL" : undefined}
              register={register}
              error={errors[field as keyof UserFormData]?.message}
              setValue={setValue}
            />
          ))}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-blue-500"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
