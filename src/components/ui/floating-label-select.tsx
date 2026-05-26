
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FloatingLabelSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label: string
    placeholder?: string
    children: React.ReactNode
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, children, label, placeholder, value, onValueChange, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative">
      <SelectPrimitive.Root 
        value={value} 
        onValueChange={onValueChange}
        onOpenChange={(open) => setIsFocused(open)}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border border-[#E3E0D6] bg-[#F7F5EE] px-4 text-base text-[#24362F] placeholder:text-[#7A8A82] focus:outline-none focus:ring-2 focus:ring-[#8CC84B] focus:border-[#8CC84B] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            isFocused || hasValue ? "pt-6 pb-2" : "py-3",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          <SelectPrimitive.Value 
            placeholder={placeholder || `Choose ${label.toLowerCase()}...`}
          />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {/* Floating Label */}
        <label
          className={cn(
            "absolute left-4 text-[#506259] transition-all duration-200 pointer-events-none",
            isFocused || hasValue
              ? "top-1 text-xs font-medium"
              : "top-3 text-base"
          )}
        >
          {label}
        </label>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="relative z-[1000] max-h-80 min-w-[8rem] overflow-hidden rounded-xl border border-[#E3E0D6] bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
              <ChevronDown className="h-4 w-4 rotate-180" />
            </SelectPrimitive.ScrollUpButton>
            
            <SelectPrimitive.Viewport className="p-1">
              {children}
            </SelectPrimitive.Viewport>
            
            <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
})
FloatingLabelSelect.displayName = "FloatingLabelSelect"

const FloatingLabelSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-3 px-4 text-base text-[#24362F] outline-none focus:bg-[#8CC84B]/10 hover:bg-[#8CC84B]/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 min-h-[44px]",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-4 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#8CC84B]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
FloatingLabelSelectItem.displayName = "FloatingLabelSelectItem"

export { FloatingLabelSelect, FloatingLabelSelectItem }
