import type { LoaderFunction } from "remix";
import { json, redirect } from "remix";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { getUserId } from "~/core/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>Argo</Box>
    </Container>
  );
}
