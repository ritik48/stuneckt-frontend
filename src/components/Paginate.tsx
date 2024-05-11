import Pagination from "@mui/material/Pagination";
import { usePost } from "../contexts/PostContext";

interface PaginateProp {
    totalPosts: number;
    limit: number;
    page: number;
}

export function Paginate({ totalPosts, limit, page }: PaginateProp) {
    const totalPage = Math.ceil(totalPosts / limit);
    const { changePage } = usePost();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        changePage(value);
    };
    return (
        <Pagination
            sx={{
                display: "flex",
                marginBlock: 3,
                marginTop: "auto",
                justifyContent: "center",
            }}
            color="primary"
            page={page}
            onChange={handleChange}
            count={totalPage}
        />
    );
}
