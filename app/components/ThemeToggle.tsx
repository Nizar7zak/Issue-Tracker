"use client"

import { Button, DropdownMenu } from "@radix-ui/themes"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="2">
          {theme === "light" ? (
            <FaSun className="h-4 w-4" />
          ) : theme === "dark" ? (
            <FaMoon className="h-4 w-4" />
          ) : (
            <FaDesktop className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme("light")}>
          <FaSun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("dark")}>
          <FaMoon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("system")}>
          <FaDesktop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

