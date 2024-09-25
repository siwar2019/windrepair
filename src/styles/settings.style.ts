import { InputLabel, styled } from "@mui/material";
import { primaryFont } from "../theme/typography";

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.grey['900'],
    fontFamily: primaryFont,
    fontSize: '0.9rem',
    fontWeight: "bold",
    
}))