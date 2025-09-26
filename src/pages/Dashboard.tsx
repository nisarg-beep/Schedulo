const Dashboard = () => {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            My Timetable
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your schedule and courses efficiently
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-2xl font-bold text-primary">0</p>
          <p className="text-sm text-muted-foreground">No courses added yet</p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold mb-2">This Week</h3>
          <p className="text-2xl font-bold text-primary">0</p>
          <p className="text-sm text-muted-foreground">Classes scheduled</p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold mb-2">Study Hours</h3>
          <p className="text-2xl font-bold text-primary">0</p>
          <p className="text-sm text-muted-foreground">Hours this week</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
        <div className="p-8 rounded-lg border bg-card text-center">
          <p className="text-muted-foreground">No recent activity. Start by adding your first course!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;