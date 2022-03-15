type Pagination = { skipePage: number; limitPage: number; itemsPage: number };
type PaginationResponse = (page: string | number, per_page: string | number) => Pagination;

/**
 * The funtion for pagination
 *
 * @param page the page add type string or number
 * @param per_page the per_page add type string or number
 * @returns Pagination of types numbers
 */
export const paginationResponse: PaginationResponse = (page, per_page) => {
    // convert to number
    const skipePage = parseInt(page as string, 10);
    const limitPage = parseInt(per_page as string, 10);
    // calculate paginaton x page
    const itemsPage = skipePage > 0 ? limitPage * (skipePage - 1) : 0;

    return { skipePage, limitPage, itemsPage };
};
