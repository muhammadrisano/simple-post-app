import { Post } from "@/service/post.service";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
interface CardProps extends React.ComponentProps<"div"> {
    data: Post;

}

const card = ({data, className, ...props}:CardProps) => {
  return (
    <div className={cn("card bg-base-100 w-80 shadow-sm", className)} {...props}>
      {/* <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure> */}
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p>
         {data.description}
        </p>
        <div className="card-actions justify-end">
          <Link href={`/dashboard/post/${data.slug}`} className="btn btn-primary">Show</Link>
        </div>
      </div>
    </div>
  );
};

export default card;
