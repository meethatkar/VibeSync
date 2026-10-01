import React, { useState } from "react";
import { Search, CloudUpload, ChevronDown, Activity, Menu } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import UploadModal from "../modals/UploadModal";

const Navbar = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vibe-check");

  return (
    <header className="w-full bg-neutral border-b border-white/5 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1900px] px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-8 xl:gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white hidden sm:block">
              VibePulse
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center bg-white/5 rounded-full p-1.5 border border-white/5">
          <Button
            variant={activeTab === "vibe-check" ? "default" : "ghost"}
            onClick={() => setActiveTab("vibe-check")}
            className={`gap-2 font-semibold py-5 rounded-full transition-all ${
              activeTab === "vibe-check"
                ? "bg-primary text-neutral-900 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:bg-primary pl-5 pr-8"
                : "text-gray-300 hover:text-white hover:bg-white/5 px-5"
            }`}
          >
            Vibe Check
          </Button>
          <Button
            variant={activeTab === "terms" ? "default" : "ghost"}
            onClick={() => setActiveTab("terms")}
            className={`rounded-full py-5 transition-all ${
              activeTab === "terms"
                ? "bg-primary text-neutral-900 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:bg-primary pr-5 pl-8"
                : "text-gray-300 hover:text-white hover:bg-white/5 px-5"
            }`}
          >
            Terms
          </Button>
        </nav>
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-64 relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search songs, artists"
              className="h-10 w-full rounded-full bg-white/5 border-white/10 pl-9 pr-9 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-gray-300">
              ⌘K
            </div>
          </div>

          <Button
            className="gap-2 rounded-full bg-white/5 hover:bg-white/10 text-white border-none py-5"
            onClick={() => setIsUploadOpen(true)}
          >
            <CloudUpload className="w-4 h-4" />
            Upload Music
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none group">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                    alt="User"
                  />
                  <AvatarFallback className="bg-white/10 text-white font-medium">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div className="w-3 h-3 rounded-full bg-primary absolute bottom-0 -right-1 border-2 border-neutral"></div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
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

        {/* Mobile View: Avatar + Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-4">
          <div className="relative">
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                alt="User"
              />
              <AvatarFallback className="bg-white/10 text-white font-medium">
                ME
              </AvatarFallback>
            </Avatar>
            <div className="w-2.5 h-2.5 rounded-full bg-primary absolute bottom-0 -right-1 border-2 border-neutral"></div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full h-10 w-10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-neutral border-l-white/10 text-white p-6 flex flex-col gap-8 w-[300px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white text-xl font-bold tracking-wide">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                <Button
                  variant={activeTab === "vibe-check" ? "default" : "ghost"}
                  onClick={() => setActiveTab("vibe-check")}
                  className={`w-full gap-2 font-semibold py-6 rounded-xl transition-all ${
                    activeTab === "vibe-check"
                      ? "bg-primary text-neutral-900 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:bg-primary"
                      : "justify-start text-lg hover:bg-white/5"
                  }`}
                >
                  Vibe Check
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${
                      activeTab === "vibe-check"
                        ? "bg-neutral/80 text-primary"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    AI SCAN
                  </span>
                </Button>

                <Button
                  variant={activeTab === "music-player" ? "default" : "ghost"}
                  onClick={() => setActiveTab("music-player")}
                  className={`w-full py-6 rounded-xl transition-all ${
                    activeTab === "music-player"
                      ? "bg-primary text-neutral-900 justify-center font-semibold shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:bg-primary"
                      : "justify-start text-lg hover:bg-white/5"
                  }`}
                >
                  Music Player
                </Button>
                <Button
                  variant={activeTab === "terms" ? "default" : "ghost"}
                  onClick={() => setActiveTab("terms")}
                  className={`w-full py-6 rounded-xl transition-all ${
                    activeTab === "terms"
                      ? "bg-primary text-neutral-900 justify-center font-semibold shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:bg-primary"
                      : "justify-start text-lg hover:bg-white/5"
                  }`}
                >
                  Terms
                </Button>

                <div className="h-px w-full bg-white/10 my-2"></div>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg py-6 rounded-xl hover:bg-white/5 gap-3"
                  onClick={() => setIsUploadOpen(true)}
                >
                  <CloudUpload className="w-5 h-5" />
                  Upload Music
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg py-6 rounded-xl hover:bg-white/5 gap-3 text-secondary hover:text-secondary hover:bg-secondary/10"
                >
                  Log out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </header>
  );
};

export default Navbar;
