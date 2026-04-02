"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getPosts, Post } from "@/service/post.service";
import useSWR from 'swr'
import { useState } from "react";
import { Card } from "./_components/molecules";
import { Button } from "@/components/attoms";
import Link from "next/link";


const DasboardPage = () => {
    const [page, setPage] = useState(1)
      const { data: posts, error, isLoading } = useSWR({page}, getPosts)
      const data = posts?.data;

  return <div>
    <div className="flex justify-end py-4">
        <div>

        </div>
        <div>
            <Link href="/dashboard/post/new" className="btn-primary">Tambah Post</Link>
        </div>

    </div>
    <div className="flex flex-wrap gap-4 py-4">

    {data?.map((post:Post)=>(<Card data={post} key={post.id} />))}
    </div>
  </div>;
};

export default DasboardPage;
