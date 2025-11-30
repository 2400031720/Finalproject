import { SignupForm } from '../components/SignupForm';
import { Home } from 'lucide-react';

export function SignupPage({ onSwitchToLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center">
              <Home className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-primary">HomestayConnect</h1>
          <p className="text-muted-foreground">
            Join our community of travelers, hosts, and local guides
          </p>
        </div>

        {/* Signup Form */}
        <SignupForm onSwitchToLogin={onSwitchToLogin} />
      </div>
    </div>
  );
}