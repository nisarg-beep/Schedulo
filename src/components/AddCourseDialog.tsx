// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import { AddCourseForm } from "./AddCourseForm"

// export function AddCourseDialog() {
//   const [open, setOpen] = useState(false)

//   const handleSubmit = (data: any) => {
//     // Here you would typically save the course data
//     // For now, we'll just close the dialog
//     console.log("Course data:", data)
//     setOpen(false)
//   }

//   const handleCancel = () => {
//     setOpen(false)
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-200">
//           <Plus className="mr-2 h-4 w-4" />
//           Add Course
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//         <AddCourseForm onSubmit={handleSubmit} onCancel={handleCancel} />
//       </DialogContent>
//     </Dialog>
//   )
// }





import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddCourseForm } from "./AddCourseForm"
import type { CourseFormValues } from "./AddCourseForm" // reuse form types

export function AddCourseDialog() {
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState<CourseFormValues[]>([])

  const handleSubmit = (data: CourseFormValues) => {
    setCourses((prev) => [...prev, data])
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <AddCourseForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Show added courses */}
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p className="text-muted-foreground">No courses added yet.</p>
        ) : (
          courses.map((course, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-sm">
              <h3 className="font-semibold">{course.courseName}</h3>
              <p className="text-sm text-muted-foreground">
                {course.courseCode} — {course.teacherName} ({course.weeklyHours} hrs/week)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
