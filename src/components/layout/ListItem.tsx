
"use client"

import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import * as React from "react";
import Link from "next/link";

import * as Icons from "lucide-react";

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string, children: React.ReactNode, iconName?: string }
>(({ className, title, children, href, iconName, ...props }, ref) => {
  const Icon = iconName && (Icons as any)[iconName] ? (Icons as any)[iconName] : null;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref as any}
          className={cn(
            "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-navy/5 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="p-2 rounded-md bg-navy/5 group-hover:bg-white group-hover:shadow-sm transition-all duration-200 shrink-0">
                <Icon className="h-5 w-5 text-navy group-hover:text-gold transition-colors" />
              </div>
            )}
            <div>
              <div className="text-sm font-bold leading-none text-navy group-hover:text-primary transition-colors mb-2">{title}</div>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-gray-600">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
