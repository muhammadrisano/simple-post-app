"use client"
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
} from "@/components/molecules";

const SigninPage = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm = async (data: LoginSchema) => {
    const result = await login(data);
    if (result.success) {
      alert("success");
    } else {
      alert(result.error);
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
                    <Input placeholder="Email" type="email" label="Email" {...field} />
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
                    <Input placeholder="Password" type="password" label="Password" {...field} />
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
          <Button className="btn-primary mt-4 w-ful">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninPage;
