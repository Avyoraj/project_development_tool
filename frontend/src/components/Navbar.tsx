import { Search, Bell, User, Kanban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <Kanban className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Project Dev Tool
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search projects and tasks..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-gray-900 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
