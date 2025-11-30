import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserSelection } from './components/UserSelection';
import { Navigation } from './components/Navigation';
import { AdminDashboard } from './components/AdminDashboard';
import { HostDashboard } from './components/HostDashboard';
import { TouristDashboard } from './components/TouristDashboard';
import { GuideDashboard } from './components/GuideDashboard';

function AppContent() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [demoUser, setDemoUser] = useState(null);

  // Handle demo mode
  const handleDemoMode = () => {
    setAuthMode('demo');
  };

  const handleDemoUserSelect = (user) => {
    setDemoUser(user);
  };

  const handleLogout = () => {
    logout();
    setDemoUser(null);
    setAuthMode('login');
  };

  // Determine current user (authenticated or demo)
  const currentUser = user || demoUser;

  // Render dashboard based on user type
  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.userType) {
      case 'admin':
        return <AdminDashboard />;
      case 'host':
        return <HostDashboard />;
      case 'tourist':
        return <TouristDashboard />;
      case 'guide':
        return <GuideDashboard />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  // Show authentication or demo selection
  if (!currentUser) {
    if (authMode === 'demo') {
      return <UserSelection onUserSelect={handleDemoUserSelect} />;
    }

    if (authMode === 'signup') {
      return (
        <SignupPage 
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }

    return (
      <LoginPage 
        onSwitchToSignup={() => setAuthMode('signup')}
        onDemoMode={handleDemoMode}
      />
    );
  }

  // Show main application
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} onLogout={handleLogout} />
      <main className="min-h-[calc(100vh-4rem)]">
        {renderDashboard()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}