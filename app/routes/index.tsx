import type { LoaderFunction } from "remix";
import { json, Outlet } from "remix";

import { requireUser } from "~/core/session.server";
import { DashboardLayout } from "~/components/dashboard-layout";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json({});
};

export default function Index() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
