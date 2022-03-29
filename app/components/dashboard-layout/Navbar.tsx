import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";

import { SIDEBAR_WIDTH } from "./Constants";
import AccountMenu from "./AccountMenu";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
}));

type Props = {
  onSidebarOpen: () => void;
};

export default function Navbar({ onSidebarOpen }: Props) {
  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: SIDEBAR_WIDTH,
          },
          width: {
            lg: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Hidden mdUp implementation="css">
            <IconButton onClick={onSidebarOpen}>
              <MenuIcon fontSize="small" />
            </IconButton>
          </Hidden>
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu />
        </Toolbar>
      </NavbarRoot>
    </>
  );
}
