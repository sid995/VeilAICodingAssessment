"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, UserPlus, Smartphone, LogOut } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface TeamMember {
  id: string
  name: string
  email: string
  joinDate: string
  role: "Admin" | "Member" | "Viewer" | "Editor"
  avatarColor: string
}

interface PendingInvite {
  id: string
  email: string
  role: "Admin" | "Member" | "Viewer" | "Editor"
  sentDate: string
}

export default function ProfilePage() {
  const { t } = useLanguage()

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Julia Hudson",
      email: "julia@veilai.com",
      joinDate: "Oct 15, 2025",
      role: "Admin",
      avatarColor: "bg-teal-600",
    },
  ]

  const pendingInvites: PendingInvite[] = [
    {
      id: "1",
      email: "john@example.com",
      role: "Editor",
      sentDate: "Nov 1, 2025",
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Team Members Section */}
        <Card className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-medium text-foreground">Team Members</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {teamMembers.length} {teamMembers.length === 1 ? "member" : "members"}
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <UserPlus className="w-3.5 h-3.5 mr-2" />
              Add Member
            </Button>
          </div>

          {/* Team Members List */}
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-2.5 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <Avatar className={`w-9 h-9 ${member.avatarColor}`}>
                    <AvatarFallback className="text-white text-xs">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{member.name}</h3>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground mt-0.5">
                      <span>{member.email}</span>
                      <span>•</span>
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>
                </div>
                <Select defaultValue={member.role}>
                  <SelectTrigger className="w-[110px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Pending Invites Section */}
          {pendingInvites.length > 0 && (
            <div className="mt-4 pt-3 border-t">
              <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Pending Invites</h3>
              <div className="space-y-1.5">
                {pendingInvites.map((invite) => (
                  <div key={invite.id} className="flex items-center justify-between text-sm py-1.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-xs">{invite.email}</span>
                      <Badge variant="outline" className="text-xs h-5">
                        {invite.role}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">Sent {invite.sentDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Billing Section */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-medium text-foreground">Billing & Subscription</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Plan Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Plan Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Plan</span>
                    <Badge variant="outline" className="text-xs">
                      Pro
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Renewal Date</span>
                    <span className="text-sm">Dec 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Seats</span>
                    <span className="text-sm">5 of 10 used</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent h-8">
                Manage Plan
              </Button>
            </div>

            {/* Right Column - Payment Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Payment</span>
                    <span className="text-sm">Oct 15, 2025 — $120</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Card on file</span>
                    <span className="text-sm">Visa •••• 4242</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent h-8">
                Update Payment Method
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Billing is managed securely via Stripe.{" "}
              <a href="#" className="text-foreground hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </Card>

        {/* Authentication Section */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-base font-medium text-foreground">Authentication & Security</h2>
          </div>

          <div className="space-y-4">
            {/* Email / Password Login */}
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Email / Password Login</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">christine_zhang@college.harvard.edu</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Change Password
                </Button>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="pt-3 border-t">
              <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Connected Accounts</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://www.google.com/s2/favicons?domain=google.com&sz=32"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <img
                    src="https://www.google.com/s2/favicons?domain=slack.com&sz=32"
                    alt="Slack"
                    className="w-5 h-5"
                  />
                  <img
                    src="https://www.google.com/s2/favicons?domain=microsoft.com&sz=32"
                    alt="Microsoft"
                    className="w-5 h-5"
                  />
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Connect New Account
                </Button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="pt-3 border-t">
              <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Two-Factor Authentication (2FA)</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    Status:{" "}
                    <Badge variant="outline" className="ml-2 text-xs h-5">
                      Enabled
                    </Badge>
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Manage 2FA
                </Button>
              </div>
            </div>

            {/* Session Management */}
            <div className="pt-3 border-t">
              <h3 className="text-xs font-medium text-muted-foreground mb-2.5">Session Management</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last login: Nov 3, 2025</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Sign out of all devices
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
