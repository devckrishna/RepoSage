import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100">
      <SignUp />
    </div>
  );
}
