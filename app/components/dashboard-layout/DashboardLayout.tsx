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
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

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
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
}
