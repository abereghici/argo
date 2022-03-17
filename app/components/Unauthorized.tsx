import { Link as RemixLink } from "remix";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ErrorPage from "./ErrorPage";

export default function ForOhFour() {
  return (
    <ErrorPage
      title=" Oops! "
      subtitle="Looks like you tried to visit a page that you do not have access to."
      imageSrc="/images/error.png"
      cta={
        <Button
          to="/"
          component={RemixLink}
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{ mt: 3 }}
          variant="contained"
        >
          Go back to main page
        </Button>
      }
    />
  );
}
