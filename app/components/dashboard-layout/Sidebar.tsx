import * as React from "react";
import type { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Hidden from "@mui/material/Hidden";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavItem from "./NavItem";

const items = [
  {
    to: "/",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    to: "/customers",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Customers",
  },
  {
    to: "/products",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Products",
  },
  {
    to: "/account",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Account",
  },
  {
    to: "/settings",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Settings",
  },
  {
    to: "/login",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Login",
  },
  {
    to: "/register",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Register",
  },
  {
    to: "/404",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Error",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    defaultMatches: false,
  });

  const [transition, setTransition] = React.useState<number | undefined>(
    undefined
  );

  const close = React.useCallback(
    (force?: boolean) => {
      setTransition(force ? 0 : undefined);
      onClose();
    },
    [onClose]
  );

  React.useEffect(() => {
    if (open && mdUp) {
      close(true);
    }

    if (!open && mdUp) {
      setTransition(undefined);
    }
  }, [open, mdUp, close]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              to={item.to}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Hidden mdDown implementation="css">
        <Drawer
          anchor="left"
          open
          PaperProps={{
            sx: {
              backgroundColor: "grey.900",
              color: "#FFFFFF",
              width: 280,
            },
          }}
          variant="permanent"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          anchor="left"
          transitionDuration={transition}
          onClose={() => close()}
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "grey.900",
              color: "#FFFFFF",
              width: 280,
            },
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}
