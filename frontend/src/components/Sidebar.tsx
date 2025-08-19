import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Folder, Settings } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddProjectModal from "./AddProjectModal";

interface Project {
  _id: string;
  title: string;
}

export default function Sidebar() {
  const [isModalOpen, setModalState] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const location = useLocation();
  const currentProjectId = location.pathname.slice(1);
  const backendUrl = import.meta.env.VITE_API_URL;

  const openModal = useCallback(() => {
    setModalState(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalState(false);
  }, []);

  const projectData = useCallback(() => {
    if (!backendUrl) {
      console.error("Backend URL not configured");
      return;
    }
    
    axios
      .get(`${backendUrl}/projects/`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  }, [backendUrl]);

  useEffect(() => {
    projectData();
    
    const handleProjectUpdate = () => projectData();
    const handleOpenModal = () => setModalState(true);
    
    document.addEventListener("projectUpdate", handleProjectUpdate);
    document.addEventListener("openProjectModal", handleOpenModal);
    
    return () => {
      document.removeEventListener("projectUpdate", handleProjectUpdate);
      document.removeEventListener("openProjectModal", handleOpenModal);
    };
  }, [projectData]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <Button 
            onClick={openModal} 
            size="icon" 
            variant="default" 
            className="h-8 w-8 bg-gray-900 hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-1">
          {projects.map((project) => (
            <Link key={project._id} to={`/${project._id}`}>
              <div
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 ${
                  currentProjectId === project._id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700"
                }`}
              >
                <Folder className="h-4 w-4 mr-3" />
                <span className="truncate capitalize">{project.title}</span>
              </div>
            </Link>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="bg-gray-100 rounded-full p-6 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Folder className="h-6 w-6 opacity-50" />
              </div>
              <p className="text-sm font-medium">No projects yet</p>
              <p className="text-xs mt-1 text-gray-400">Click the + button to create your first project</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-gray-100">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
      
      <AddProjectModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
