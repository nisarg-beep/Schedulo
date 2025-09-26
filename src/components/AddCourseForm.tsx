import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const courseSchema = z.object({
  courseName: z
    .string()
    .trim()
    .min(1, { message: "Course name is required" })
    .max(100, { message: "Course name must be less than 100 characters" }),
  courseCode: z
    .string()
    .trim()
    .min(1, { message: "Course code is required" })
    .max(20, { message: "Course code must be less than 20 characters" })
    .regex(/^[A-Za-z0-9\s-]+$/, { message: "Course code can only contain letters, numbers, spaces, and hyphens" }),
  teacherName: z
    .string()
    .trim()
    .min(1, { message: "Teacher name is required" })
    .max(100, { message: "Teacher name must be less than 100 characters" }),
  weeklyHours: z
    .number()
    .min(1, { message: "Weekly hours must be at least 1" })
    .max(40, { message: "Weekly hours cannot exceed 40" })
    .int({ message: "Weekly hours must be a whole number" })
})

type CourseFormValues = z.infer<typeof courseSchema>

interface AddCourseFormProps {
  onSubmit?: (data: CourseFormValues) => void
  onCancel?: () => void
}

export function AddCourseForm({ onSubmit, onCancel }: AddCourseFormProps) {
  const { toast } = useToast()
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
      courseCode: "",
      teacherName: "",
      weeklyHours: 1,
    },
  })

  const handleSubmit = (data: CourseFormValues) => {
    // Validate one more time before submission
    const validationResult = courseSchema.safeParse(data)
    
    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: "Please check your input and try again.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Course Added Successfully",
      description: `${data.courseName} has been added to your timetable.`,
    })

    onSubmit?.(data)
    form.reset()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Add New Course
        </CardTitle>
        <CardDescription>
          Fill in the details below to add a new course to your timetable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Introduction to Computer Science"
                      {...field}
                      className="transition-all duration-200 focus:shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., CS-101"
                      {...field}
                      className="transition-all duration-200 focus:shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Dr. Sarah Johnson"
                      {...field}
                      className="transition-all duration-200 focus:shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weeklyHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Hours</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="1"
                      max="40"
                      placeholder="e.g., 3"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      className="transition-all duration-200 focus:shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-200"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Adding Course..." : "Add Course"}
              </Button>
              
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  className="px-8"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}