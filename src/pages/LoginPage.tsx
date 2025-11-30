import { LoginForm } from '../components/LoginForm';
import { Home } from 'lucide-react';

export function LoginPage({ onSwitchToSignup, onDemoMode }) {
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
            Discover authentic travel experiences
          </p>
        </div>

        {/* Login Form */}
        <LoginForm 
          onSwitchToSignup={onSwitchToSignup} 
          onDemoMode={onDemoMode}
        />
      </div>
    </div>
  );
}