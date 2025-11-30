import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { User, LogOut, Settings } from 'lucide-react';

export function Navigation({ currentUser, onLogout }) {
  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'admin': return 'bg-red-500';
      case 'host': return 'bg-green-500';
      case 'tourist': return 'bg-blue-500';
      case 'guide': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 'admin': return 'Administrator';
      case 'host': return 'Host';
      case 'tourist': return 'Tourist';
      case 'guide': return 'Guide';
      default: return userType;
    }
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">HomestayConnect</h2>
          <Badge variant="outline" className={`${getUserTypeColor(currentUser.userType)} text-white border-transparent`}>
            {getUserTypeLabel(currentUser.userType)}
          </Badge>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${getUserTypeColor(currentUser.userType)} text-white`}>
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}