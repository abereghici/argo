import * as React from "react";
import { useNavigate, useSubmit } from "remix";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/divider";
import { useUser } from "~/hooks/useUser";

export default function AccountMenu() {
  const user = useUser();
  const submit = useSubmit();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | undefined>(
    undefined
  );

  const open = Boolean(anchorEl);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const navigateToAccount = () => {
    handleClose();
    navigate("/account");
  };

  const logout = () => {
    handleClose();
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sizes="32">{user.firstName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 1.5,
            overflow: "visible",
            boxShadow: (theme) => theme.shadows[5],
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={navigateToAccount}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText>My account</ListItemText>
        </MenuItem>

        <Divider light />

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
