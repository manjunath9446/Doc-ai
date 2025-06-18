// src/App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DocParserPage from './pages/DocParserPage';

// --- THIS IS THE CORRECT, PRODUCTION-READY WAY ---
// 1. Get the key from Vite's environment variables object.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 2. This check is a crucial safeguard. If the environment variable is not found
//    (either locally or in production), the app will fail immediately with a clear error.
if (!PUBLISHABLE_KEY) {
  throw new Error("ERROR: Missing VITE_CLERK_PUBLISHABLE_KEY. Check your .env.local file (for local dev) or your Vercel project settings (for deployment).");
}
// --- END OF CODE ---


// This helper component ensures that the `useNavigate` hook is used inside the Router context.
function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/app" element={ <SignedIn> <DashboardPage /> </SignedIn> } />
        <Route path="/app/doc-parser" element={ <SignedIn> <DocParserPage /> </SignedIn> } />

        <Route path="/app/*" element={
            <SignedOut>
                <div className="p-8 text-center">Redirecting to sign-in...</div>
            </SignedOut>
        }/>
      </Routes>
    </ClerkProvider>
  );
}

// The main App component sets up the router.
function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;