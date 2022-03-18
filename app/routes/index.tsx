import type { LoaderFunction } from "remix";
import { json, redirect } from "remix";

import { getUserId } from "~/core/session.server";
import { DashboardLayout } from "~/components/dashboard-layout";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export default function Index() {
  return <DashboardLayout>Test</DashboardLayout>;
}
