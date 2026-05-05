import { Typography, Box } from "@mui/material";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <Box
      sx={{
        mb: 3,
        mt: 2,
        pb: 1.5,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;