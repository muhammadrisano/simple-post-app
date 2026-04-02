"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/attoms";
import Input from "@/components/attoms/input";
import { loginSchema, LoginSchema } from "@/utils/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/service/auth.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Modal,
} from "@/components/molecules";
import { ModalProps } from "@/components/molecules/Modal";
import { sessionLogin } from "@/app/actions";

const SigninPage = () => {
  const router = useRouter();
  const [modal, setModal] = React.useState<ModalProps>({
    title: "",
    description: "",
    btnName: "",
    btnShow: false,
  });
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm = async (data: LoginSchema) => {
    try {
      await login(data);
      await sessionLogin();
      router.push("/dashboard");
    } catch (error) {
       let errorDescription = ''
         if (error instanceof Response) {
         const resError = await error.json() as { message: string };
         errorDescription = resError.message
         
       }
         setModal({
        title: "Login Fail",
        description: errorDescription || "Terjadi kesalahan saat login",
        btnName: "Close",
        btnShow: true
      });
      (document.getElementById('my_modal') as HTMLDialogElement)?.showModal()
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
            Dont have an account?{" "}
            <Link href="/signup" className="text-primary">
              Signup
            </Link>
          </p>
          <Button isLoading={form.formState.isSubmitting} className="btn-primary mt-4 w-ful">Login</Button>
        </form>
      </Form>
      <Modal id="my_modal" {...modal} />
    </div>
  );
};

export default SigninPage;
