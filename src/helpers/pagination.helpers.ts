import { TypePaginationRes } from "./contants";

/**
 * The function pagination request
 *
 * @param queryParams the params added: page & per_page or limite
 * @returns skipePage, limitPage, itemsPage of object numbers
 */
export const paginationResponse: TypePaginationRes = ({ page, per_page }) => {
    // convert to number
    const skipePage = parseInt(page as string, 10);
    const limitPage = parseInt(per_page as string, 10);
    // paginaton x page
    const itemsPage = skipePage > 0 ? limitPage * (skipePage - 1) : 0;

    return { skipePage, limitPage, itemsPage };
};
