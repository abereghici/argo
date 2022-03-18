import * as React from "react";
import { Link, useLocation } from "remix";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

type Props = {
  to: string;
  icon: React.ReactNode;
  title: string;
};
export default function NavItem({ to, icon, title }: Props) {
  const location = useLocation();
  const active =
    to === location.pathname || location.pathname.startsWith(`${to}/`);

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <Button
        component={Link}
        to={to}
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active ? "grey.50" : null,
          borderRadius: 1,
          color: active ? "secondary.main" : "grey.300",
          fontWeight: active ? "fontWeightBold" : "fontWeightRegular",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "grey.400",
          },
          "&:hover": {
            backgroundColor: "grey.50",
          },
          "&:focus": {
            backgroundColor: "action.focus",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
}
