import { AddCourseDialog } from "@/components/AddCourseDialog"

const Courses = () => {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your academic courses and schedules
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <AddCourseDialog />
        </div>
        
        <div className="p-8 rounded-lg border bg-card text-center">
          <p className="text-muted-foreground mb-4">No courses added yet</p>
          <p className="text-sm text-muted-foreground">Click "Add Course" to get started with your timetable</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;