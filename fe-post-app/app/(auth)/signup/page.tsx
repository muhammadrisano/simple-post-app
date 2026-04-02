"use client";
import { Button } from "@/components/attoms";
import Input from "@/components/attoms/input";
import { registerSchema, RegisterSchema } from "@/utils/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { register } from "@/service/auth.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Modal,
} from "@/components/molecules";
import React from "react";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/components/molecules/Modal";

const SignupPage = () => {
  const router = useRouter();
  const [modal, setModal] = React.useState<ModalProps>({
    title: "",
    description: "",
    btnName: "",
    btnShow: false,
  });
  // const modalRef = React.useRef<HTMLDialogElement>(null);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const submitForm = async (data: RegisterSchema) => {
    try {
      await register(data);
      setModal({
        title: "Register Success",
        description: "Silahkan Login untuk melanjutkannya",
        btnName: "Close",
        btnShow: true,
        onClick: () => router.push("/signin"),
      });
      (document.getElementById("my_modal") as HTMLDialogElement)?.showModal();
    } catch (error) {
       let errorDescription = ''
         if (error instanceof Response) {
         const resError = await error.json() as { message: string };
         errorDescription = resError.message
         
       }
      setModal({
        title: "Register Fail",
        description: errorDescription || "Terjadi kesalahan saat login",
        btnName: "Close",
        btnShow: true,
      });
      (document.getElementById("my_modal") as HTMLDialogElement)?.showModal();
    }
  };

  return (
    <div className="bg-base-200 border-base-300 rounded-box w-xs border p-6">
      <h2 className="text-lg">Login Page</h2>
      <Form {...form}>
        <form
          className="pt-6 flex flex-col gap-3"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl className="space-y-1">
                  <Input placeholder="Name" label="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl className="space-y-1">
                  <Input
                    placeholder="Email"
                    type="email"
                    label="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl className="space-y-1">
                  <Input
                    placeholder="Password"
                    type="password"
                    label="Password"
                    {...field}
                  />
                  <FormMessage />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-sm">
            do you have an account?
            <Link href="/signup" className="text-primary pl-1">
              Signin
            </Link>
          </p>
          <Button isLoading={form.formState.isSubmitting} className="btn-primary mt-4 w-ful">Register</Button>
        </form>
      </Form>

      <Modal id="my_modal" {...modal} />
    </div>
  );
};

export default SignupPage;
