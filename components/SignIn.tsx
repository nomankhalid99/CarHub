import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { CustomButton } from ".";

interface SignInProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const mockSignIn = (formData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        formData.email === "test@example.com" &&
        formData.password === "password"
      ) {
        resolve({ success: true });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 1000);
  });
};

const SignIn = ({ isOpen, closeModal }: SignInProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const inputStyles = `mb-5 w-full border-2 border-primary-blue rounded-lg
  px-5 py-3  focus:outline-none`;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = (await mockSignIn(data)) as ApiResponse;

      if (response.success) {
        console.log("Authentication successful");
      } else {
        console.error(
          "Authentication failed:",
          response.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterTo="opacity-100"
            enterFrom="opacity-0"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
            leaveFrom="opacity-100"
          >
            <div className="fixed inset-0 bg-black opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterTo="opacity-100 scale-100"
                enterFrom="opacity-0 scale-95"
                leave="ease-in duration-200"
                leaveTo="opacity-0 scale-95"
                leaveFrom="opacity-100 scale-100"
              >
                <Dialog.Panel
                  className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left 
                shadow-xl p-6 transition-all flex flex-col gap-5"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <button
                      className="absolute top-2 p-2 right-2 z-10 w-fit bg-primary-blue-100 rounded-full"
                      type="button"
                      onClick={closeModal}
                    >
                      <Image
                        src="/close.svg"
                        alt="close"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </button>
                    <div className="flex flex-1 flex-col gap-2">
                      <label>Email</label>
                      <input
                        className={inputStyles}
                        type="text"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email?.message &&
                        typeof errors.email.message === "string" && (
                          <span className="text-red-500">
                            {errors.email.message}
                          </span>
                        )}

                      <label>Password</label>
                      <input
                        className={inputStyles}
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      {errors.password?.message &&
                        typeof errors.password.message === "string" && (
                          <span className="text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                    </div>

                    <CustomButton
                      title={isLoading ? "Signing In..." : "Sign In"}
                      containerStyles="bg-primary-blue text-white rounded-full hover:bg-white hover:text-primary-blue border-2 border-primary-blue transition duration-200 ease-in"
                      btnType="submit"
                      isDisabled={isLoading}
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignIn;
