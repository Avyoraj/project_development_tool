import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import Task from "./components/Task";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Router>
      <AppLayout>
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
        <Routes>
          <Route path="/:projectId" element={<Task />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
