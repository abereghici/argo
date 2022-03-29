import * as React from "react";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import {
  Form,
  json,
  Link as RemixLink,
  useActionData,
  redirect,
  useSearchParams,
} from "remix";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { createUserSession, getUserId } from "~/core/session.server";
import { verifyLogin } from "~/core/user.server";
import { validateEmail } from "~/utils/email";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || !password.length) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <Form method="post" noValidate>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
          </Box>
          <TextField
            inputRef={emailRef}
            error={Boolean(actionData?.errors?.email)}
            fullWidth
            helperText={actionData?.errors?.email && actionData.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            type="email"
            variant="outlined"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={passwordRef}
            error={Boolean(actionData?.errors?.password)}
            fullWidth
            helperText={
              actionData?.errors?.password && actionData.errors.password
            }
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            autoComplete="new-password"
          />

          <FormControlLabel
            control={<Checkbox id="remember" name="remember" />}
            label="Remember me"
          />

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>

          <Typography color="textSecondary" variant="body2">
            {`Don't nave an account? `}
            <Link
              component={RemixLink}
              to={{
                pathname: "/register",
                search: searchParams.toString(),
              }}
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Form>
      </Container>
    </Box>
  );
}
