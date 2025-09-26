import { ConstraintsSection } from "@/components/ConstraintsSection"

const Settings = () => {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Customize your timetable preferences
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Constraints Section */}
        <div className="lg:col-span-2">
          <ConstraintsSection />
        </div>
        
        {/* Preferences Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">General Preferences</h2>
          
          <div className="space-y-4">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Time Format</h3>
              <p className="text-sm text-muted-foreground mb-4">Choose how times are displayed in your timetable</p>
              <select className="w-full p-2 border rounded-lg bg-background">
                <option>12-hour format (AM/PM)</option>
                <option>24-hour format</option>
              </select>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Week Start</h3>
              <p className="text-sm text-muted-foreground mb-4">Select which day your week starts on</p>
              <select className="w-full p-2 border rounded-lg bg-background">
                <option>Monday</option>
                <option>Sunday</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-2">Class Reminders</h3>
            <p className="text-sm text-muted-foreground mb-4">Get reminders about your classes</p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Enable class reminders</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Push notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;