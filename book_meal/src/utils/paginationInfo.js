export default function paginationInfo(page){

    if(!page){
        return{}
    }

    let currentPage = 1
    if(page.next_page)
         currentPage = page.next_page -1;
    else if (page.prev_page)
        currentPage = page.prev_page + 1;

    let pageCount = Math.ceil(page.total / page.per_paage);
    if(Number.isNaN(pageCount) || pageCount === 0)
      pageCount = 1; 

    return {
        pageCount,
        currentPage,
        total: page.total,
        perPage: page.per_page,
        hasNext: page.has_next,
        hasPrev: page.has_prev,
        nextPage: page.next_page,
        prevPage: page.prev_page,
        currentCount: page.current_count,
    };
}