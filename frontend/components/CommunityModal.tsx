// components/CommunityModal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter, // Optional: if you need footer buttons
  DialogClose,  // Optional: for a manual close button
} from "@/components/ui/dialog"; // Adjust path if needed
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react'; // Import X for close button

// Define the structure for community data (can be expanded)
export interface CommunityDetails {
  icon: React.ReactNode;
  title: string;
  description: string;
  longDescription?: string; // Example additional detail
  meetingInfo?: string;    // Example additional detail
  coordinator?: string;     // Example additional detail
}

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: CommunityDetails | null; // Can be null when no community is selected
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, community }) => {
  if (!community) {
    return null; // Don't render anything if no community is selected
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[550px] bg-card border-border text-foreground p-0 rounded-xl shadow-lg">
        {/* Optional: Add a subtle gradient or background element */}
         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent -z-10 rounded-t-xl"></div>

        <DialogHeader className="p-6 pb-4 space-y-4">
          <div className="flex items-center space-x-4">
             <div className="text-primary w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                {React.cloneElement(community.icon as React.ReactElement, { size: 28 })}
             </div>
             <DialogTitle className="text-2xl font-bold font-display text-primary">{community.title} Community</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground pt-2">
            {community.description}
          </DialogDescription>
        </DialogHeader>

        {/* Modal Body Content */}
        <div className="px-6 pb-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Example: More detailed description */}
          {community.longDescription && (
            <div>
              <h4 className="font-semibold mb-1 text-foreground/90">About the Community</h4>
              <p className="text-sm text-muted-foreground">{community.longDescription}</p>
            </div>
          )}

          {/* Example: Meeting Info */}
           {community.meetingInfo && (
            <div>
               <h4 className="font-semibold mb-1 text-foreground/90">Meeting Schedule</h4>
               <p className="text-sm text-muted-foreground">{community.meetingInfo}</p>
            </div>
           )}

           {/* Example: Coordinator */}
           {community.coordinator && (
            <div>
               <h4 className="font-semibold mb-1 text-foreground/90">Lead Coordinator</h4>
               <p className="text-sm text-muted-foreground">{community.coordinator}</p>
            </div>
           )}

           {/* Placeholder for recent activities or gallery */}
           <div>
               <h4 className="font-semibold mb-1 text-foreground/90">Recent Activities</h4>
               <p className="text-sm text-muted-foreground italic">(Details about recent events or projects would go here...)</p>
           </div>
        </div>

        {/* Optional Footer with Close Button */}
        <DialogFooter className="p-6 pt-0">
          <Button type="button" variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>

         {/* Explicit Close Button (alternative to footer) */}
          <DialogClose asChild className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
             {/* <Button variant="ghost" size="icon">
               
               <span className="sr-only">Close</span>
             </Button> */}
             
             <X className="h-4 w-4" />
           </DialogClose>
      </DialogContent>
    </Dialog>
  );
};  