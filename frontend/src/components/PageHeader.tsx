import { Typography, Box } from "@mui/material";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <Box sx={{ mb:4,mt:2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;