'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
          <div className="container py-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
          </div>
          <div className="container flex gap-6">
            <aside className="relative w-64">
              <nav className="grid items-start gap-1">
                <Button variant="secondary" className="w-full justify-start bg-muted text-foreground">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                  Appearance
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                  Display
                </Button>
              </nav>
            </aside>
            <main className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Profile</h2>
                <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Username
                  </label>
                  <Input defaultValue="shadcn" className="bg-muted border-input" />
                  <p className="text-xs text-muted-foreground">
                    This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Select>
                    <SelectTrigger className="bg-muted border-input">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-input">
                      <SelectItem value="email">email@example.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Bio
                  </label>
                  <Textarea
                    defaultValue="I own a computer."
                    className="min-h-[100px] resize-none bg-muted border-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    URLs
                  </label>
                  <div className="space-y-2">
                    <Input defaultValue="https://shadcn.com" className="bg-muted border-input" />
                    <Input defaultValue="http://twitter.com/shadcn" className="bg-muted border-input" />
                  </div>
                  <Button variant="secondary" size="sm" className="mt-2 bg-muted text-foreground hover:bg-gray-700">
                    Add URL
                  </Button>
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update profile</Button>
            </main>
          </div>
        </div>
      )
    }

