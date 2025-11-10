import RegisterComponent from "@/components/auth/register";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <RegisterComponent />
    </Suspense>
  );
}
