import { MapIcon, Timer } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleSettings({
  setShowPeriodsTime,
  setShowPlace
}) {
  return (
    <ToggleGroup type="multiple" defaultValue={["place"]} onValueChange={(value) => {
      setShowPeriodsTime(value.includes("time"));
      setShowPlace(value.includes("place"))
    }}>
      <ToggleGroupItem value="time" aria-label="Toggle time">
        <Timer className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="place" aria-label="Toggle place">
        <MapIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
