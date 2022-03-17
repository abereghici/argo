import { Link as RemixLink } from "remix";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ErrorPage from "./ErrorPage";

export default function ForOhFour() {
  return (
    <ErrorPage
      title="The page you are looking for isn’t here"
      subtitle="You either tried some shady route or you came here by mistake.
    Whichever it is, try using the navigation"
      imageSrc="/images/404.svg"
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
