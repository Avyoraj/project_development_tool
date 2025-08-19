import { Card, CardContent } from "@/components/ui/card";
import { Kanban, Plus, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const handleCreateProject = () => {
    // Trigger the sidebar's project creation modal
    document.dispatchEvent(new CustomEvent("openProjectModal"));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-6">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                <Kanban className="w-10 h-10 text-gray-700" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Project Development Tool
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              A clean, minimal interface for managing your projects and tasks. 
              Organize with drag-and-drop simplicity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                <Kanban className="w-6 h-6 text-gray-700 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-2">Drag & Drop</h3>
                <p className="text-sm text-gray-600">Intuitive task management interface</p>
              </div>
              
              <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                <Zap className="w-6 h-6 text-gray-700 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-2">Fast & Modern</h3>
                <p className="text-sm text-gray-600">Built with React 19 and Vite</p>
              </div>
              
              <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                <Shield className="w-6 h-6 text-gray-700 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-2">Secure</h3>
                <p className="text-sm text-gray-600">Zero vulnerabilities detected</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={handleCreateProject}
                variant="default" 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
              
              <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              Select a project from the sidebar to get started, or create a new one
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
