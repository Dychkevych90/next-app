import {GoogleSignInButton} from "@/components/googleSignInButton";
import {useSession} from "next-auth/react";

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <GoogleSignInButton />
      </div>
    </>
  );
}
