import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddProjectModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function AddProjectModal({ isModalOpen, closeModal }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL;

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${backendUrl}/project`, {
        title: projectName,
        description: description || "No description provided"
      });
      
      // Trigger project list refresh
      document.dispatchEvent(new CustomEvent("projectUpdate"));
      
      setProjectName("");
      setDescription("");
      closeModal();
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Create New Project</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeModal}
            className="h-6 w-6"
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="projectName" className="text-sm font-medium text-gray-900">
                Project Name
              </label>
              <Input
                id="projectName"
                type="text"
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium text-gray-900">
                Description
              </label>
              <Input
                id="description"
                type="text"
                placeholder="Enter project description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={closeModal} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
