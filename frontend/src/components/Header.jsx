// src/components/Header.jsx
import React from 'react';
import { Diamond } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <Diamond className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">DocAI</h1>
      </div>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;