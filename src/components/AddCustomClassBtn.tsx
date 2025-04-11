import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Copy, PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { classPeriods } from "@/constants/ClassPeriod"
import { useEffect, useState } from "react"
import { Course } from "./ClassList"

export const AddCustomClassBtn = ({
  handleAddCustomClass
}) => {
  const [data, setData] = useState<Course>({
    "開課序號": 0,
    "中文課程名稱": "",
    "地點時間": "",
    "系所": "",
    "教師": "",
    "學分": 0
  })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [day, setDay] = useState("");
  const [startP, setStartP] = useState("");
  const [endP, setEndP] = useState("");
  const [location, setLocation] = useState("");
  const DaySelect = () => {
    return (
      <Select onValueChange={(e) => setDay(e)} value={day}>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="星期" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>星期</SelectLabel>
            <SelectItem value="一">一</SelectItem>
            <SelectItem value="二">二</SelectItem>
            <SelectItem value="三">三</SelectItem>
            <SelectItem value="四">四</SelectItem>
            <SelectItem value="五">五</SelectItem>
            <SelectItem value="六">六</SelectItem>
            <SelectItem value="日">日</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  const comparePeriods = (startFrom, period) => {
    const periodId = parseInt(period, 10);
    const startId = parseInt(startFrom, 10);
    // 如果是字母，直接跟 startFrom 比較，字母大的会排在后面
    if (isNaN(periodId)) {
      return period >= startFrom;
    }
    return periodId >= startId;
  }
  const PeriodSelect = ({value, startFrom, onChange}:{startFrom?: string; onChange: (string) => void; value: string;}) => {
    const filteredPeriods = startFrom && startFrom !== "" ? classPeriods.filter((period) => {
      return comparePeriods(startFrom, period.id);
    }) : classPeriods;
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder="節" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>節</SelectLabel>
            {filteredPeriods.map((period) => (
              <SelectItem key={period.id} value={period.id}>
                {period.id}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  const changeData = (e, field) => setData((data) => {
    const rawdata = typeof e === "string" ? e : e.target.value;
    const newdata = {...data};
    const input = (field === "開課序號" || field === "學分") ? parseInt(rawdata) : rawdata;
    newdata[field] = input;
    return newdata;
  })

  useEffect(() => {
    if (!comparePeriods(startP, endP)){
      setEndP(startP)
    }
    changeData(`${day} ${startP}-${endP} ${location}`, "地點時間")
  }, [day, startP, endP, location])
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PlusIcon />
            自行建立課程資訊
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>自行建立課程資訊</DialogTitle>
            <DialogDescription>
              請輸入課程資訊
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="cid">
                課程序號
              </Label>
              <Input
                id="cid"
                type="number"
                placeholder="0000"
                value={data.開課序號}
                onChange={(e) => changeData(e, "開課序號")}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="cde">
                系所
              </Label>
              <Input
                id="cde"
                placeholder="XX系"
                value={data.系所}
                onChange={(e) => changeData(e, "系所")}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="cname">
                課程名稱
              </Label>
              <Input
                id="cname"
                placeholder="..."
                value={data.中文課程名稱}
                onChange={(e) => changeData(e, "中文課程名稱")}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="ct">
                時間地點
              </Label>
              <div className="flex gap-2">
                <DaySelect />
                <div className="flex gap-1">
                  <PeriodSelect value={startP} onChange={(e) => setStartP(e)} /> - <PeriodSelect value={endP} onChange={(e) => setEndP(e)} startFrom={startP} />
                </div>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="地點"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="ccredits">
                學分
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ccredits"
                  placeholder="學分"
                  defaultValue={3}
                  type="number"
                  min={0}
                  max={5}
                  value={data.學分}
                  onChange={(e) => changeData(e, "學分")}
                />
              </div>
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="cteacher">
                教師
              </Label>
              <div className="flex gap-2">
                <Input
                  id="cteacher"
                  placeholder="教師"
                  value={data.教師}
                  onChange={(e) => changeData(e, "教師")}
                />
              </div>
            </div>
          </div>
          <div>
            <textarea
              readOnly
              className="w-full"
              value={JSON.stringify(data)}
            />
          </div>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                取消
              </Button>
            </DialogClose>
            <Button onClick={() => {
              handleAddCustomClass(data);
              setDialogOpen(false);
            }} type="button" variant="default">
              建立
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
