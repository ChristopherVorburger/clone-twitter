import { DesktopAccessDisabled } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ClassicButton from "../../buttons/ClassicButton";

export default function InformationActionButton({
  title,
  details,
  buttonText,
  buttonLink,
}) {
  return (
    <Box
      maxWidth="400px"
      display="flex"
      flexDirection="column"
      alignItems="left"
      style={{
        margin: "5em",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "mainBold",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 1.5,
          mb: 3,
        }}
      >
        {details}
      </Typography>
      <ClassicButton text={buttonText} path={buttonLink} />
    </Box>
  );
}
