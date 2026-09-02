import { Modal, Fade, Backdrop, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import { handleCopyToClipboard } from "../utils/Helper";
import { useTheme } from "@emotion/react";

const QrModal = ({ open, handleClose, title, link, id }) => {
  const isDarkMode = useTheme().palette.mode === "dark";

  return (
    <Modal
      aria-labelledby={`qr-modal-title-${id}`}
      aria-describedby={`qr-modal-description-${id}`}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "16px",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid #ffffff6b",
            boxShadow: 24,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography
            id={`qr-modal-title-${id}`}
            variant="h6"
            component="h2"
            style={{
              marginBottom: ".8rem",
              background: isDarkMode
                ? "rgba(32, 37, 76, 0.76)"
                : "rgb(123 136 220 / 65%)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
            }}
          >
            {title}
          </Typography>
          <QRCode
            value={link}
            cursor={"pointer"}
            bgColor={"transparent"}
            fgColor={isDarkMode ? "#ffffff" : "#000"}
            style={{
              border: "1px solid #ffffff6b",
              padding: "1rem",
              borderRadius: "8px",
            }}
            onClick={() => handleCopyToClipboard(link)}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

QrModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default QrModal;
