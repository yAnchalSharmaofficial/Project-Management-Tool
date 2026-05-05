// import { Typography, Box } from "@mui/material";

// type Props = {
//   title: string;
// };

// const PageHeader = ({ title }: Props) => {
//   return (
//     <Box sx={{ mb:4,mt:2 }}>
//       <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//         {title}
//       </Typography>
//     </Box>
//   );
// };

// export default PageHeader;


import { Typography, Box } from "@mui/material";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <Box
      sx={{
        mb: 4,
        mt: 2,
        px: 3,
        py: 2,
        borderRadius: "16px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>


      <Typography>HELLO TEST</Typography>
    </Box>
  );
};

export default PageHeader;