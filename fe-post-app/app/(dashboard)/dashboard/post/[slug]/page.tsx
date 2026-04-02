import React from "react";
import { getPostDetails } from "@/service/post.service";
import Link from "next/link";
import ButtonDelete from "./_components/template/ButtonDelete";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  //   const data = await getCategory();
  const data = await getPostDetails(slug);
  //   console.log(data);

  const post = data?.data;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-3 py-4 flex-wrap">
        <p>
          Category :{" "}
          <span className="badge badge-primary"> {post?.category.name}</span>
        </p>
        <div className="flex gap-3">
          <ButtonDelete id={post.id} />

          <Link
            href={`/dashboard/post/${post.slug}/edit`}
            className="btn btn-primary"
          >
            Edit Post
          </Link>
        </div>
      </div>
      <div className="py-4">
        <h3 className="text-2xl font-medium">{post?.title}</h3>
      </div>
      <div>
        <p>{post?.description}</p>
      </div>

      {/* {JSON.stringify(data)} */}
    </div>
  );
};

export default DetailPage;
