import type { LoaderFunction } from "remix";
import { json } from "remix";

import { requireUser } from "~/core/session.server";
import { DashboardLayout } from "~/components/dashboard-layout";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json({});
};

export default function Account() {
  return <DashboardLayout>Account</DashboardLayout>;
}
