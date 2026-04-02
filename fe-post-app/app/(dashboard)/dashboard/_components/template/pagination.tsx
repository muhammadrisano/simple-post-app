import { Button } from "@/components/attoms";
import React from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react'

interface PaginationProps {
    links: {
        active: boolean;
        label: string;
        url?: string | null;
        page?: number | null;
        
    }[],
    onChangePage: (page: number) => void;
}
const Pagination = ({ links, onChangePage }:PaginationProps) => {
  return (
    <div className="join">
        {links?.map((item, i)=>(
             <Button 
                key={i} 
                disabled={item.active || !item.page} 
                onClick={() => item.page && onChangePage(item.page)} 
                className="join-item btn"
              >
                {item.label.includes('Previous') ? <ChevronLeft size={20}/> : 
                 item.label.includes('Next') ? <ChevronRight size={20}/> : 
                 item.label}
              </Button>

        ))}
    </div>
  );
};

export default Pagination;
