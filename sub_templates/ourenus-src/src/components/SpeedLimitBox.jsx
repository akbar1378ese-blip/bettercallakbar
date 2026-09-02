import { Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import SpeedIcon from "@mui/icons-material/Speed";
import BoxS from "./Box";
import { useTranslation } from "react-i18next";

const SpeedLimitBox = ({ speedLimits }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!speedLimits?.matched) {
    return null;
  }

  const formatLimit = (value) => {
    const numeric = Number(value);

    if (!speedLimits?.hasLimit || !Number.isFinite(numeric) || numeric <= 0) {
      return {
        number: t("infinity"),
        unit: "",
      };
    }

    return {
      number: String(numeric),
      unit: t("mbps"),
    };
  };

  const upload = formatLimit(speedLimits.uploadMbps);
  const download = formatLimit(speedLimits.downloadMbps);

  const valueSx = {
    background: `linear-gradient(0deg, ${theme.palette.mode === "dark" ? "#9CCFA8" : theme.palette.success.main}, ${theme.palette.mode === "dark" ? "#78B989" : theme.palette.success.dark})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    fontWeight: 700,
  };

  return (
    <BoxS>
      <Grid item xs={3} display="flex" justifyContent="center">
        <SpeedIcon
          sx={{
            color: theme.colors.userBox.logoColor[theme.palette.mode],
            width: "2.4rem",
            height: "2.4rem",
          }}
        />
      </Grid>

      <Grid item xs={4.5} display="flex" flexDirection="column" textAlign="center" sx={{ gap: ".25rem" }}>
        <Typography variant="p" component="div" fontSize={"small"} sx={{ fontWeight: 300, opacity: 0.6 }}>
          {t("uploadLimit")}
        </Typography>
        <Typography variant="h6" component="div" sx={valueSx}>
          {upload.number}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 300, fontSize: "medium", opacity: 0.6 }}>
          {upload.unit}
        </Typography>
      </Grid>

      <Grid item xs={4.5} display="flex" flexDirection="column" textAlign="center" sx={{ gap: ".25rem" }}>
        <Typography variant="p" component="div" fontSize={"small"} sx={{ fontWeight: 300, opacity: 0.6 }}>
          {t("downloadLimit")}
        </Typography>
        <Typography variant="h6" component="div" sx={valueSx}>
          {download.number}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 300, fontSize: "medium", opacity: 0.6 }}>
          {download.unit}
        </Typography>
      </Grid>
    </BoxS>
  );
};

SpeedLimitBox.propTypes = {
  speedLimits: PropTypes.shape({
    matched: PropTypes.bool,
    hasLimit: PropTypes.bool,
    uploadMbps: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    downloadMbps: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default SpeedLimitBox;
