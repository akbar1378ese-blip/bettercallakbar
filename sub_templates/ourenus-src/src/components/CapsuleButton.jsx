import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const CapsuleButton = ({ isActive, onClick, icon }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      fullWidth
      sx={{
        borderRadius: "50px",
        paddingX: "1.5rem",
        backgroundColor: "transparent",
        color: isActive
          ? theme.colors.capsuleBtn.active[theme.palette.mode]
          : theme.colors.capsuleBtn.notActive[theme.palette.mode],
        textTransform: "capitalize",
      }}
    >
      {icon}
    </Button>
  );
};

CapsuleButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};

export default CapsuleButton;
