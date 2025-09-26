import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Generate time slots for each day of the week
const generateTimeSlots = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = []
  
  for (const day of days) {
    for (let hour = 8; hour < 18; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      timeSlots.push({
        value: `${day.toLowerCase()}-${hour}`,
        label: `${day} ${startTime} - ${endTime}`,
        day,
        time: startTime
      })
    }
  }
  
  return timeSlots
}

const timeSlots = generateTimeSlots()

const constraintsSchema = z.object({
  unavailableSlots: z
    .array(z.string())
    .max(20, { message: "Cannot select more than 20 unavailable time slots" }),
  avoidBackToBack: z.boolean(),
})

type ConstraintsFormValues = z.infer<typeof constraintsSchema>

export function ConstraintsSection() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<ConstraintsFormValues>({
    resolver: zodResolver(constraintsSchema),
    defaultValues: {
      unavailableSlots: [],
      avoidBackToBack: false,
    },
  })

  const watchedSlots = form.watch("unavailableSlots")

  const handleSubmit = (data: ConstraintsFormValues) => {
    // Validate the data
    const validationResult = constraintsSchema.safeParse(data)
    
    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: "Please check your selections and try again.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Constraints Updated",
      description: `Updated ${data.unavailableSlots.length} unavailable time slots and back-to-back preference.`,
    })
  }

  const removeTimeSlot = (slotToRemove: string) => {
    const currentSlots = form.getValues("unavailableSlots")
    const updatedSlots = currentSlots.filter(slot => slot !== slotToRemove)
    form.setValue("unavailableSlots", updatedSlots)
  }

  const getSelectedSlotLabels = () => {
    return watchedSlots.map(slotValue => {
      const slot = timeSlots.find(ts => ts.value === slotValue)
      return slot ? { value: slotValue, label: slot.label } : null
    }).filter(Boolean)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Schedule Constraints
        </CardTitle>
        <CardDescription>
          Set your availability preferences and scheduling constraints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="unavailableSlots"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Unavailable Time Slots</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            !field.value.length && "text-muted-foreground"
                          )}
                        >
                          {field.value.length > 0
                            ? `${field.value.length} time slot${field.value.length !== 1 ? 's' : ''} selected`
                            : "Select unavailable time slots"
                          }
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command className="max-h-64">
                        <CommandInput placeholder="Search time slots..." />
                        <CommandList className="max-h-48 overflow-y-auto">
                          <CommandEmpty>No time slots found.</CommandEmpty>
                          <CommandGroup>
                            {timeSlots.map((slot) => (
                              <CommandItem
                                key={slot.value}
                                value={slot.label}
                                onSelect={() => {
                                  const currentValue = field.value
                                  const isSelected = currentValue.includes(slot.value)
                                  
                                  if (isSelected) {
                                    field.onChange(currentValue.filter(v => v !== slot.value))
                                  } else {
                                    if (currentValue.length < 20) {
                                      field.onChange([...currentValue, slot.value])
                                    }
                                  }
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(slot.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {slot.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select time slots when you are not available for classes. Maximum 20 selections.
                  </FormDescription>
                  <FormMessage />
                  
                  {/* Selected slots display */}
                  {watchedSlots.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Selected unavailable slots:</p>
                      <div className="flex flex-wrap gap-2">
                        {getSelectedSlotLabels().map((slot) => (
                          <Badge
                            key={slot?.value}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {slot?.label}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeTimeSlot(slot?.value || '')}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avoidBackToBack"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Avoid back-to-back classes
                    </FormLabel>
                    <FormDescription>
                      Automatically add buffer time between consecutive classes to avoid scheduling conflicts
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-200"
            >
              Save Constraints
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}