import { Pagination, Stack, alpha } from "@mui/material";
interface CustomPaginationProps {
  totalCount: number;
  itemsPerPage: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPage: number;
}

const CustomPagination = (
  {
  totalCount,
  itemsPerPage,
  page,
  handleChangePage,
  currentPage,
}: CustomPaginationProps
) => {

    return (
        <Stack
            sx={{
          justifyContent: "flex-end",
          flexDirection: "row",
            }}
            spacing={2}
        >
            <Pagination
                count={Math.ceil(totalCount / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
                sx={{
            "& .MuiPaginationItem-root": {
                        color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.15),
                    },
            "& .MuiPaginationItem-root.Mui-selected": {
                        color: (theme) => theme.palette.common.white,
              backgroundColor: (theme) => theme.palette.primary.main,
            },
                }}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
  };
export default CustomPagination;
