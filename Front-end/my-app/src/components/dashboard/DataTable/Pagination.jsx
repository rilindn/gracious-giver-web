import React, { useEffect, useMemo, useState } from 'react'

export const Pagination = ({total=10,itemsPerPage=10,currentPage=1,onPageChange}) => {

    const [totalPages,setTotalPages] = useState(0)

    useEffect(()=>{
        if(total>0 && itemsPerPage>0)
            setTotalPages(Math.ceil(total/itemsPerPage))
    },[total,itemsPerPage])

    const paginationItems = useMemo(()=>{
        const pages = [];
        for(let i=1;i<=totalPages;i++){
            pages.push(
                <Pagination.Item 
                    key={i} 
                    active={i===currentPage}
                    onClick={()=>onPageChange(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages
    },[totalPages,currentPage,onPageChange]);

    if(totalPages===0) return null;

    return (
        <div>
            <Pagination>
                <Pagination.Prev
                onClick={()=>onPageChange(currentPage-1)}
                disabled={currentPage===1}
                 />
                {paginationItems}
                <Pagination.Next
                onClick={()=>onPageChange(currentPage+1)}
                disabled={currentPage===total}
                />
            </Pagination>
        </div>
    )
}

export default Pagination
