import LoginComponent from "@/components/auth/login";
import { Suspense } from "react";
export default function Page() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <LoginComponent />
    </Suspense>
  );
}
