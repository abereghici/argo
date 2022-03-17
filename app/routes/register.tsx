import * as React from "react";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import {
  Form,
  Link as RemixLink,
  redirect,
  useSearchParams,
  json,
  useActionData,
} from "remix";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { getUserId, createUserSession } from "~/core/session.server";
import { createUser, getUserByEmail } from "~/core/user.server";
import { validateEmail } from "~/utils/email";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const redirectTo = formData.get("redirectTo");

  console.log({
    firstName,
    lastName,
  });
  if (typeof firstName !== "string" || !firstName.length) {
    return json<ActionData>(
      { errors: { firstName: "First name is required" } },
      { status: 400 }
    );
  }

  if (typeof lastName !== "string" || !lastName.length) {
    return json<ActionData>(
      { errors: { lastName: "Last name is required" } },
      { status: 400 }
    );
  }

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

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  const user = await createUser({
    email,
    password,
    firstName,
    lastName,
  });

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus();
    } else if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus();
    } else if (actionData?.errors?.email) {
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
              Create a new account
            </Typography>
          </Box>
          <TextField
            inputRef={firstNameRef}
            error={Boolean(actionData?.errors?.firstName)}
            fullWidth
            helperText={
              actionData?.errors?.firstName && actionData.errors.firstName
            }
            label="First Name"
            margin="normal"
            name="firstName"
            type="text"
            variant="outlined"
            autoFocus
          />
          <TextField
            inputRef={lastNameRef}
            error={Boolean(actionData?.errors?.lastName)}
            fullWidth
            helperText={
              actionData?.errors?.lastName && actionData.errors.lastName
            }
            label="Last Name"
            margin="normal"
            name="lastName"
            type="text"
            variant="outlined"
          />
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
            Already have an account?{" "}
            <Link
              component={RemixLink}
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Form>
      </Container>
    </Box>
  );
}
