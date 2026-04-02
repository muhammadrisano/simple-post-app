"use client";
import { Button } from "@/components/attoms";
import Modal, { ModalProps } from "@/components/molecules/Modal";
import { deletePost } from "@/service/post.service";
import { log } from "console";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonDelete = ({ id }: { id: string }) => {
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState<ModalProps>({
    title: "",
    description: "",
    btnName: "",
    type: "alert",
  });
   const router = useRouter()
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const showConfirmation = () => {
    setModal({
      title: "Delete Post",
      description: "Are you sure want to delete this post?",
      btnName: "Delete",
      type: "confirm",
      onClick: () => handleDetelePost(),
    });
    modalRef.current?.showModal();
  };
  const handleDetelePost = async () => {
    try {
      setLoading(true);
      await deletePost(id);
      setLoading(false);
      setModal({
        title: "Delete Post Success",
        description: "Selamat Anda sudah berhasil menghapus post",
        btnName: "Close",
        type: "alert",
        onClick: () => router.push('/dashboard')
      });
    } catch (error) {
        let errorDescription = ''
         if (error instanceof Response) {
         const resError = await error.json() as { message: string };
         errorDescription = resError.message
         
       }
       setLoading(false);
         setModal({
        title: "Delete Post Fail",
        description: errorDescription || "Maaf anda tidak berhasil menghapus post",
        btnName: "Close",
        type: "alert",
      });
    }
  };

  return (
    <>
      <Button className="btn-primary btn-outline" onClick={showConfirmation}>
        Delete Post
      </Button>
      <Modal isLoading={loading} ref={modalRef} {...modal} />
    </>
  );
};

export default ButtonDelete;
