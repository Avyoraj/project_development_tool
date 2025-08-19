import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Task {
  _id: string;
  title: string;
  description: string;
  stage: string;
  order: number;
  index: number;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  task: Task[];
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3"
    >
      <Card className="cursor-move hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task._id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600">{task.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  stage: string;
  onAddTask: (stage: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

function Column({ title, tasks, stage, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <div className="flex-1 min-w-80">
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {tasks.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onAddTask(stage)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div
            ref={setNodeRef}
            className={`space-y-3 min-h-96 p-2 rounded-lg transition-colors ${
              isOver ? 'bg-blue-50 border-2 border-blue-200 border-dashed' : ''
            }`}
          >
            <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </SortableContext>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  stage: string;
  onSave: (taskData: { title: string; description: string }) => void;
}

function TaskModal({ isOpen, onClose, task, stage, onSave }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>{task ? 'Edit Task' : `Add Task to ${stage}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {task ? 'Update' : 'Create'} Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Task() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalStage, setModalStage] = useState("");
  
  const backendUrl = import.meta.env.VITE_API_URL;
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Require 10px movement before starting drag
      },
    })
  );

  const stages = ["Requested", "To do", "In Progress", "Done"];

  const fetchProject = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const response = await axios.get(`${backendUrl}/project/${projectId}`);
      // Backend returns an array with one project, so take the first item
      const projectData = Array.isArray(response.data) ? response.data[0] : response.data;
      setProject(projectData);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId, backendUrl]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const getTasksByStage = (stage: string): Task[] => {
    if (!project) return [];
    return project.task
      .filter(task => task.stage === stage)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !project) return;

    const activeTask = project.task.find(t => t._id === active.id);
    if (!activeTask) return;

    let newStage = activeTask.stage;
    let newOrder = activeTask.order;

    // Check if we're dropping on a droppable zone (column) or another task
    if (stages.includes(over.id as string)) {
      // Dropping on a column
      newStage = over.id as string;
      if (newStage !== activeTask.stage) {
        // Moving to a different stage - put at the end
        const tasksInNewStage = getTasksByStage(newStage);
        newOrder = tasksInNewStage.length;
      }
    } else {
      // Dropping on another task - find the target task and its position
      const overTask = project.task.find(t => t._id === over.id);
      if (overTask) {
        newStage = overTask.stage;
        newOrder = overTask.order;
      }
    }

    // If nothing changed, don't update
    if (activeTask.stage === newStage && activeTask.order === newOrder) {
      return;
    }

    try {
      // Create updated tasks array with a simple approach
      let updatedTasks = [...project.task];
      
      // Find and update the specific task
      const taskIndex = updatedTasks.findIndex(t => t._id === activeTask._id);
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = { ...activeTask, stage: newStage, order: newOrder };
      }

      // Update local state first for immediate feedback
      setProject(prev => prev ? { ...prev, task: updatedTasks } : null);

      // Create the update payload for backend
      const stageGroups = stages.reduce((acc, stage) => {
        const stageTasks = updatedTasks
          .filter(t => t.stage === stage)
          .sort((a, b) => a.order - b.order);
        
        acc[stage] = {
          name: stage,
          items: stageTasks
        };
        return acc;
      }, {} as Record<string, { name: string; items: Task[] }>);

      // Only update backend if we have valid data
      if (Object.keys(stageGroups).length > 0) {
        await axios.put(`${backendUrl}/project/${projectId}/todo`, stageGroups);
      }
    } catch (error) {
      console.error("Failed to update task order:", error);
      // Revert the local state on error by refetching from server
      setTimeout(() => fetchProject(), 100);
    }
  };

  const handleAddTask = (stage: string) => {
    setModalStage(stage);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalStage(task.stage);
    setModalOpen(true);
  };

  const handleSaveTask = async (taskData: { title: string; description: string }) => {
    try {
      if (editingTask) {
        // Update existing task
        await axios.put(`${backendUrl}/project/${projectId}/task/${editingTask._id}`, taskData);
      } else {
        // Create new task
        await axios.post(`${backendUrl}/project/${projectId}/task`, taskData);
      }
      fetchProject(); // Refresh project data
    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await axios.delete(`${backendUrl}/project/${projectId}/task/${taskId}`);
      fetchProject(); // Refresh project data
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Project not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeTask = activeId ? project.task.find(t => t._id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map(stage => (
            <Column
              key={stage}
              title={stage}
              tasks={getTasksByStage(stage)}
              stage={stage}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <Card className="opacity-90 rotate-3 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{activeTask.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600">{activeTask.description}</p>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>

        <TaskModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          task={editingTask}
          stage={modalStage}
          onSave={handleSaveTask}
        />
      </div>
    </DndContext>
  );
}
