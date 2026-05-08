import { Link, useRouterState } from "@tanstack/react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, Apple, Dumbbell, ArrowUpFromLine, LineChart, Flame, RotateCcw } from "lucide-react";
import { useFitness } from "@/lib/fitness-context";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Diet", url: "/diet", icon: Apple },
  { title: "Workout", url: "/workout", icon: Dumbbell },
  { title: "Height", url: "/height", icon: ArrowUpFromLine },
  { title: "Progress", url: "/progress", icon: LineChart },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state, resetProfile } = useFitness();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[var(--glow-primary)]">
            <Flame className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl tracking-widest">FITFORGE</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display tracking-widest">NAVIGATE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold">
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {state.profile && (
          <div className="px-2 pb-2">
            <div className="rounded-md bg-sidebar-accent p-3 text-xs">
              <div className="font-display text-base tracking-wider text-primary">{state.profile.name.toUpperCase()}</div>
              <div className="text-muted-foreground">{state.profile.weight}kg · {state.profile.height}cm</div>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-start text-xs text-muted-foreground" onClick={() => { if (confirm("Reset all data?")) resetProfile(); }}>
              <RotateCcw className="mr-2 h-3 w-3" /> Reset
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
