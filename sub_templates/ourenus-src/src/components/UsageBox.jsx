import { Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import BoxS from "./Box";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { useTranslation } from "react-i18next";

const UsageBox = ({ type, value, total, remaining, connectionLimit }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const parseValue = (input = "") => {
    const valueText = String(input || "");
    const numericMatch = valueText.match(/\d+/);
    const number = numericMatch ? numericMatch[0] : "0";
    const text = valueText.replace(/\d+/g, "").trim();
    return { number, text };
  };

  const getTypographyGradient = (v) => {
    if (v === Infinity || Number.isNaN(v)) {
      return `linear-gradient(0deg, ${theme.palette.mode === "dark" ? "#9CCFA8" : theme.palette.success.main}, ${theme.palette.mode === "dark" ? "#78B989" : theme.palette.success.dark})`;
    } else if (v <= 30) {
      return `linear-gradient(0deg, ${theme.palette.mode === "dark" ? "#9CCFA8" : theme.palette.success.main}, ${theme.palette.mode === "dark" ? "#78B989" : theme.palette.success.dark})`;
    } else if (v <= 70) {
      return `linear-gradient(0deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`;
    } else {
      return `linear-gradient(0deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`;
    }
  };

  const labels = {
    usage: {
      title: t("remaining_volume"),
      totaltitle: t("initial_volume"),
      unit: t("gigabytes"),
    },
    time: {
      title: t("remaining_time"),
      totaltitle: t("initial_time"),
      unit: t("days"),
    },
  };

  const getConnectionLimitDisplay = () => {
    if (type !== "time" || !connectionLimit?.matched) {
      return null;
    }

    const rawLimit = Number(
      connectionLimit?.limitIp ??
        connectionLimit?.limit ??
        connectionLimit?.value ??
        0
    );

    if (!connectionLimit?.hasLimit || !Number.isFinite(rawLimit) || rawLimit <= 0) {
      return {
        number: t("infinity"),
        text: "",
      };
    }

    return {
      number: String(rawLimit),
      text: t("ipUnit"),
    };
  };

  const { title, totaltitle } = labels[type];

  const remainingParsed = parseValue(remaining);
  const totalParsed = parseValue(total || "");
  const remainingIsInfinity = remainingParsed.text === t("infinity");
  const totalIsInfinity = totalParsed.text === t("infinity");
  const connectionDisplay = getConnectionLimitDisplay();

  return (
    <BoxS>
      <Grid item xs={4} display="flex" justifyContent="center">
        <CircularProgressWithLabel value={value} type={type} />
      </Grid>

      <Grid
        item
        xs={connectionDisplay ? 4 : type === "usage" ? 4 : 8}
        display="flex"
        flexDirection={"column"}
        textAlign={"center"}
        sx={{ gap: ".3rem" }}
      >
        <Typography
          variant="p"
          component="div"
          fontSize={"small"}
          sx={{
            fontWeight: "300",
            opacity: 0.6,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            background: getTypographyGradient(value),
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          {remainingIsInfinity
            ? remainingParsed.text
            : remainingParsed.number}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textAlign: "center",
            fontWeight: "300",
            fontSize: "medium",
            opacity: 0.6,
          }}
          fontWeight={"lighter"}
        >
          {remainingIsInfinity ? "" : remainingParsed.text}
        </Typography>
      </Grid>

      {connectionDisplay && (
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection={"column"}
          textAlign={"center"}
          sx={{
            gap: ".3rem",
            borderInlineStart: `1px solid ${theme.colors.glassColor}`,
            paddingInlineStart: ".6rem",
          }}
        >
          <Typography
            variant="p"
            component="div"
            fontSize={"small"}
            sx={{
              fontWeight: "300",
              opacity: 0.6,
            }}
          >
            {t("concurrentLimit")}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              background: `linear-gradient(0deg, ${theme.palette.mode === "dark" ? "#9CCFA8" : theme.palette.success.main}, ${theme.palette.mode === "dark" ? "#78B989" : theme.palette.success.dark})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            {connectionDisplay.number}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "300",
              fontSize: "medium",
              opacity: 0.6,
            }}
          >
            {connectionDisplay.text}
          </Typography>
        </Grid>
      )}

      {type === "usage" && (
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection={"column"}
          textAlign={"center"}
          sx={{ gap: ".3rem" }}
        >
          <Typography
            variant="p"
            component="div"
            fontSize={"small"}
            sx={{
              fontWeight: "300",
              opacity: 0.6,
            }}
          >
            {totaltitle}
          </Typography>
          <Typography variant="h6" component="div">
            {totalIsInfinity
              ? totalParsed.text
              : totalParsed.number}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "300",
              fontSize: "medium",
              opacity: 0.6,
            }}
          >
            {totalIsInfinity ? "" : totalParsed.text}
          </Typography>
        </Grid>
      )}
    </BoxS>
  );
};

UsageBox.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.string,
  remaining: PropTypes.string.isRequired,
  connectionLimit: PropTypes.shape({
    matched: PropTypes.bool,
    hasLimit: PropTypes.bool,
    limitIp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default UsageBox;
