"use client";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center p-5 bg-gray-100 shadow-md">
      {/* Left Side: Greeting or App Name */}
      <h1 className="text-xl font-semibold text-gray-800">
        {user ? `${user.firstName}'s Space` : "Admin Dashboard"}
      </h1>

      {/* Right Side: Sign In / User Button */}
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
