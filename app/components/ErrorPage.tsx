import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  imageSrc?: string;
  subtitle?: string;
  cta?: React.ReactNode;
};

export default function ErrorPage({ title, subtitle, imageSrc, cta }: Props) {
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                align="center"
                color="textPrimary"
                variant="subtitle2"
              >
                {subtitle}
              </Typography>
            ) : null}
            {imageSrc ? (
              <Box sx={{ textAlign: "center" }}>
                <img
                  alt=""
                  src={imageSrc}
                  role="presentation"
                  style={{
                    marginTop: 50,
                    display: "inline-block",
                    maxWidth: "100%",
                    width: 560,
                  }}
                />
              </Box>
            ) : null}

            {cta}
          </Box>
        </Container>
      </Box>
    </>
  );
}
