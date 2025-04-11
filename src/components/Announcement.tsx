import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { announcements } from "@/constants/Announcements";
import { BellIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AnnouncementModal = () => {
  const [unseenAnnouncements, setUnseenAnnouncements] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState(announcements);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch unseen announcements on mount
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("viewedAnnouncements")) || [];
    const unseen = announcements.filter((announcement) => !viewed.includes(announcement.id));
    setUnseenAnnouncements(unseen);

    if (unseen.length > 0) {
      setIsOpen(true); // Automatically open modal for unseen announcements
    }
  }, []);

  const markAsSeen = () => {
    const viewed = JSON.parse(localStorage.getItem("viewedAnnouncements")) || [];
    const unseenIds = unseenAnnouncements.map((announcement) => announcement.id);
    localStorage.setItem("viewedAnnouncements", JSON.stringify([...viewed, ...unseenIds]));
    setUnseenAnnouncements([]); // Clear unseen announcements
    setIsOpen(false);
  };

  return (
    <>
      {/* Notification button */}
      <div onClick={() => setIsOpen(true)} className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer flex flex-row space-x-2">
        <BellIcon width={24} height={24} /> {unseenAnnouncements.length ? <>({unseenAnnouncements.length})</> : null}
      </div>

      {/* Modal for announcements */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>通知中心</DialogTitle>
            <DialogDescription>
              {unseenAnnouncements.length > 0
                ? "新通知！"
                : "您已查看所有通知！"}
            </DialogDescription>
          </DialogHeader>

          {/* Show all announcements */}
          <ScrollArea className="max-h-[300px]">
            <div className="space-y-4">
              {allAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border p-4 rounded-md">
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <p className="whitespace-pre-line">{announcement.content}</p>
                  <p className="text-sm text-gray-500">{new Date(announcement.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end mt-4">
            <Button onClick={markAsSeen}>知道了！已讀全部</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementModal;
