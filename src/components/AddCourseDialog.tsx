import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddCourseForm } from "./AddCourseForm"

export function AddCourseDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (data: any) => {
    // Here you would typically save the course data
    // For now, we'll just close the dialog
    console.log("Course data:", data)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
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
  )
}

