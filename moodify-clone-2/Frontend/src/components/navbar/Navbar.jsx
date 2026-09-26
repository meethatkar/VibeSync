import React from "react";
import { Search, CloudUpload, ChevronDown, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="w-full bg-neutral border-b border-white/5 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1900px] px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white hidden sm:block">VibePulse</span>
        </div>

        {/* Middle: Navigation Links (Pill) */}
        <nav className="hidden lg:flex items-center bg-white/5 rounded-full p-1.5 border border-white/5">
          <Button 
            className="gap-2 font-semibold bg-primary text-neutral-900 px-5 py-5 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] rounded-full hover:bg-primary"
          >
            Vibe Check
            <span className="text-[10px] font-bold bg-neutral/80 text-primary px-2 py-0.5 rounded-full tracking-wider">
              AI SCAN
            </span>
          </Button>
          <Button variant="ghost" className="rounded-full text-gray-300 hover:text-white hover:bg-white/5 px-4 py-5">Music Player</Button>
          <Button variant="ghost" className="rounded-full text-gray-300 hover:text-white hover:bg-white/5 px-4 py-5">Terms</Button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden md:block w-64 relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search songs, artists" 
              className="h-10 w-full rounded-full bg-white/5 border-white/10 pl-9 pr-9 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-gray-300">
              ⌘K
            </div>
          </div>
          
          <Button className="gap-2 hidden sm:flex rounded-full bg-white/5 hover:bg-white/10 text-white border-none py-5">
            <CloudUpload className="w-4 h-4" />
            Upload Music
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none group">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                  <AvatarFallback className="bg-white/10 text-white font-medium">ME</AvatarFallback>
                </Avatar>
                <div className="w-3 h-3 rounded-full bg-primary absolute bottom-0 -right-1 border-2 border-neutral"></div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              align="end"
              sideOffset={8}
              className="z-50 min-w-[8rem] overflow-hidden rounded-xl border border-white/10 bg-neutral/95 backdrop-blur-md p-1.5 text-white shadow-xl"
            >
              <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white rounded-md transition-colors">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white rounded-md transition-colors">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-secondary text-secondary rounded-md transition-colors">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
