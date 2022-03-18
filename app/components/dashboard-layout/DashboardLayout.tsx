import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("md")]: {
    paddingLeft: 280,
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const openSidebar = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeSidebar = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <Navbar onSidebarOpen={openSidebar} />
      <Sidebar onClose={closeSidebar} open={open} />
    </>
  );
}
