"use client";
import { getPosts, Post } from "@/service/post.service";
import useSWR from "swr";
import { useState } from "react";
import { Card } from "./_components/molecules";
import Link from "next/link";
import Pagination from "./_components/template/pagination";

const DasboardPage = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading } = useSWR({ page }, getPosts);
  const data = posts?.data;
  const links = posts?.meta.links;
  return (
    <div>
      <div className="flex justify-end py-4">
        <div></div>
        <div>
          <Link href="/dashboard/post/new" className="btn btn-primary">
            Tambah Post
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-4">
        {isLoading && <span className="loading loading-spinner loading-xl"></span>}
        {data?.map((post: Post) => (
          <Card data={post} key={post.id} />
        ))}
      </div>
      <div className="flex justify-center py-3 mt-3">
        <Pagination links={links} onChangePage={setPage} />
      </div>
    </div>
  );
};

export default DasboardPage;
