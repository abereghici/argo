import * as React from "react";
import { Link } from "remix";
import type { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Hidden from "@mui/material/Hidden";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SIDEBAR_WIDTH } from "./Constants";
import Logo from "../Logo";
import NavItem from "./NavItem";

const items = [
  {
    to: "/bookmarks",
    icon: <BookmarkIcon fontSize="small" />,
    title: "Bookmarks",
  },
  {
    to: "/account",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Account",
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
        <Box sx={{ p: 3 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              "&:focus": {
                backgroundColor: "action.focus",
              },
            }}
          >
            <Logo
              sx={{
                height: 42,
                width: 42,
              }}
            />
          </Button>
        </Box>
        <Divider
          sx={{
            my: 3,
          }}
        />
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
              color: "primary.contrastText",
              width: SIDEBAR_WIDTH,
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
              color: "primary.contrastText",
              width: SIDEBAR_WIDTH,
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
