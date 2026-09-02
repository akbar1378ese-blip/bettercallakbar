import { Box, Grid, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import i18n from "../utils/i18n";

const BoxS = ({ children, marginBottom = 0 }) => {
  const theme = useTheme();
  const language = i18n.language;

  return (
    <Grid item container justifyContent="space-around" xs={11} sx={{ marginBottom }}>
      <Box
        sx={{
          borderRadius: "16px",
          marginTop: "1rem",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.colors.box[theme.palette.mode],
          boxShadow: "0 0 3rem 10px rgba(0, 0, 0, 0.1)",
          direction: language === "fa" ? "rtl" : "ltr",
          width: "100%",
          border: theme.colors.box.border[theme.palette.mode],
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

BoxS.propTypes = {
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BoxS;
