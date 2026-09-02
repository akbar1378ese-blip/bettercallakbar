import { Grid, useTheme } from "@mui/material";
import BoxS from "./Box";
import { useTranslation } from "react-i18next";

const LogoBox = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <BoxS>
      <Grid
        item
        xs={3}
        display="flex"
        justifyContent="center"
        sx={{ padding: ".3rem", paddingX: ".5rem" }}
      >
        <img
          src={
            import.meta.env.VITE_LOGO_SRC ||
            "https://raw.githubusercontent.com/MatinDehghanian/public-assets/refs/heads/main/icons/uranus.svg"
          }
          alt="Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>
      <Grid
        item
        xs={9}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        sx={{
          color: theme.colors.BWColor[theme.palette.mode],
          fontSize: "1.2rem",
        }}
      >
        <Grid
          item
          sx={{
            color: theme.colors.BWColor[theme.palette.mode],
            fontSize: "1.2rem",
            paddingBottom: ".7rem",
          }}
        >
          {t("userPanelTitle").replace(
            "{brandName}",
            import.meta.env.VITE_BRAND_NAME || "Ourenus"
          )}
        </Grid>
        <Grid
          sx={{
            color: theme.colors.grayColor[theme.palette.mode],
            fontSize: ".9rem",
          }}
        >
          {t("userPanelWelcome").replace(
            "{brandName}",
            import.meta.env.VITE_BRAND_NAME || "Ourenus"
          )}
        </Grid>
      </Grid>
    </BoxS>
  );
};

export default LogoBox;
