import {GoogleSignInButton} from "@/components/googleSignInButton";

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <GoogleSignInButton/>
      </div>
    </>
  );
}
