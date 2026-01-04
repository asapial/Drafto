type VPAS = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

const ALLOWED_SORT_FIELDS = [
  "created_at",
  "published_at",
  "view_count",
] as const;

type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

export const validationPaginationAndSorting = ({
  page,
  limit,
  sortBy,
  sortOrder,
}: VPAS) => {
  /* ------------------ Pagination ------------------ */
  const parsedPage = page ? Number(page) : 1;
  const parsedLimit = limit ? Number(limit) : 10;

  if (
    Number.isNaN(parsedPage) ||
    parsedPage < 1 ||
    !Number.isInteger(parsedPage)
  ) {
    throw new Error("Page must be a positive integer");
  }

  if (
    Number.isNaN(parsedLimit) ||
    parsedLimit < 1 ||
    parsedLimit > 100 ||
    !Number.isInteger(parsedLimit)
  ) {
    throw new Error("Limit must be an integer between 1 and 100");
  }

  const parsedSkip = (parsedPage - 1) * parsedLimit;

  /* ------------------ Sorting ------------------ */
  const parsedSortBy: SortField = ALLOWED_SORT_FIELDS.includes(
    sortBy as SortField
  )
    ? (sortBy as SortField)
    : "created_at";

  const parsedSortOrder =
    sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "desc";

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip: parsedSkip,
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
