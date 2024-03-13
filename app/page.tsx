import {GoogleSignInButton} from "@/components/googleSignInButton";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <GoogleSignInButton/>
    </div>
  );
}
