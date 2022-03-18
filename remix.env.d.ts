/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
