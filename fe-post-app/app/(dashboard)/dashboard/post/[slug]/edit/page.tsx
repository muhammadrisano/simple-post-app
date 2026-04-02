"use client"
import React from "react";
import useSWR from 'swr'
import { zodResolver } from "@hookform/resolvers/zod";
import {Input, Select} from "@/components/attoms";
import { PostSchema, updatePostSchema, UpdatePostSchema } from "@/utils/schema/post";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Modal,
} from "@/components/molecules";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/components/molecules/Modal";
import { Button } from "@/components/attoms";
import { getPostDetails, updatePost } from "@/service/post.service";
import {Category, getCategory} from '@/service/category.service'
import { useParams } from 'next/navigation';


const EditPostPage = () => {
  const router = useRouter();
  const params = useParams();
  const { data: categories} = useSWR({}, getCategory)

  const listCategory = categories?.data.map((category:Category)=>({
    value: `${category.id}`,
    label: category.name
  })) || []
  const [modal, setModal] = React.useState<ModalProps>({
    title: "",
    description: "",
    btnName: "",
    btnShow: false,
  });
  const form = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: async()=> {
      const dataPost = await getPostDetails(params?.slug as string)
      return {
        id: dataPost?.data.id,
        title: dataPost?.data.title,
        description: dataPost?.data.description,
        category_id: `${dataPost?.data.category.id}`,
      }
    },
  });
  const submitForm = async ({id, ...data}: PostSchema & { id: number }) => {
    try {
      await updatePost(id, data);
      setModal({
        title: "Update Post Success",
        description: "Selamat Anda sudah berhasil mengupdate post",
        btnName: "Kembali ke Dashboard",
        btnShow: true,
        onClick: () => router.push(`/dashboard/post/${params.slug}`),
      });
      (document.getElementById("my_modal") as HTMLDialogElement)?.showModal();
    } catch (error) {
       let errorDescription = ''
         if (error instanceof Response) {
         const resError = await error.json() as { message: string };
         errorDescription = resError.message
         
       }
      setModal({
        title: "Update Post Fail",
        description: errorDescription ||"Silahkan Coba Kembali",
        btnName: "Close",
        btnShow: true,
      });
      (document.getElementById("my_modal") as HTMLDialogElement)?.showModal();
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-medium">Edit Post Page</h2>
      <div>
        <Form {...form}>
          <form
            className="pt-6 flex flex-col items-start gap-3"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="space-y-1 flex flex-col">
                    <Input placeholder="Title" label="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="space-y-1 flex flex-col">
                    <Input
                      placeholder="Description"
                      type="text"
                      label="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="space-y-1 flex flex-col">
                    <Select
                      options={listCategory}
                      label="Category"
                      {...field}
                    />
                    <FormMessage />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button isLoading={form.formState.isSubmitting} className="btn-primary mt-4">Update Post</Button>
          </form>
        </Form>
      </div>
       <Modal id="my_modal" {...modal}/>
    </div>
  );
};

export default EditPostPage;
