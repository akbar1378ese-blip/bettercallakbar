import { Button, Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import BoxS from "./Box";
import GetInfoRequest from "../utils/GetInfoRequest";

const JsonConfigBox = ({ isFirst }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [copying, setCopying] = useState(false);

  const writeClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const handleCopyJson = async () => {
    if (copying) {
      return;
    }

    setCopying(true);

    try {
      const response = await GetInfoRequest.getJsonConfig();
      const payload =
        typeof response?.data === "string"
          ? response.data
          : JSON.stringify(response?.data, null, 2);

      await writeClipboard(payload || "");
      toast.success(t("jsonCopied"));
    } catch (error) {
      console.error("Failed to copy JSON config:", error);
      toast.error(t("jsonCopyFailed"));
    } finally {
      setCopying(false);
    }
  };

  return (
    <BoxS marginBottom="calc(2rem + env(safe-area-inset-bottom, 0px))">
      <Grid item xs={3} display="flex" justifyContent="center" sx={isFirst ? { marginTop: "1rem" } : undefined}>
        <DataObjectIcon
          sx={{
            color: theme.colors.userBox.logoColor[theme.palette.mode],
            width: "2.4rem",
            height: "2.4rem",
          }}
        />
      </Grid>

      <Grid item xs={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" sx={{ color: theme.colors.BWColor[theme.palette.mode] }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: "1rem" }}>
          {t("jsonConfig")}
        </Typography>
      </Grid>

      <Grid item xs={3} display="flex" justifyContent="flex-end">
        <Button
          disabled={copying}
          onClick={handleCopyJson}
          sx={{
            background: theme.colors.glassColor,
            color: theme.colors.BWColor[theme.palette.mode],
            borderRadius: "16px",
            border: "1px solid #48444a4f",
            gap: ".4rem",
            textTransform: "none",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ContentCopyIcon fontSize="small" />
          {copying ? t("copying") : t("copyJson")}
        </Button>
      </Grid>
    </BoxS>
  );
};

JsonConfigBox.propTypes = {
  isFirst: PropTypes.bool,
};

export default JsonConfigBox;
