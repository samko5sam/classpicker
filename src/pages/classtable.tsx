import { FC, useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/ui/Navbar";
import { classPeriods } from "@/constants/ClassPeriod";
import { ClassList } from "@/components/ClassList";
import { ClassTable } from "@/components/ClassTable";
import { useGlobalContext } from "@/context/GlobalContext";
import { ToggleSettings } from "@/components/ToggleSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ArrowBigDown, ArrowDownCircle, ArrowUpCircle, Download, MessageCircleWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SemesterDescription } from "@/constants/Metadata";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ScheduleData = {
  title: string;
  place?: string;
}

type ScheduleItem = {
  id: string;
  timeStartMain: string | null;
  timeEndMain: string | null;
  timeStartLinKou: string | null;
  timeEndLinKou: string | null;
  mon?: ScheduleData | null;
  tue?: ScheduleData | null;
  wed?: ScheduleData | null;
  thu?: ScheduleData | null;
  fri?: ScheduleData | null;
  sat?: ScheduleData | null;
};

const ClasstablePage: FC = () => {
  const { selectedClasses, selectedTag, setSelectedTag, courseTags } = useGlobalContext();
  const selectedFilteredClasses = selectedClasses.filter(course =>
    selectedTag ? courseTags[course.開課序號.toString()]?.includes(selectedTag) : true
  )
  const contentRef = useRef<HTMLDivElement>(null);
  const [classData, setClassData] = useState<ScheduleItem[]>(classPeriods);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showPeriodsTime, setShowPeriodsTime] = useState(false);
  const [showPlace, setShowPlace] = useState(true);
  const [scheduleConflict, setScheduleConflict] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const periodsTransformObj = {
    'A': '11',
    'B': '12',
    'C': '13',
    'D': '14'
  }

  const generateRange = (arr) => {
    arr = arr.map((item) => {
      return isNaN(parseInt(item)) ? periodsTransformObj[item] : item
    })
    // Convert the string values to integers
    const start = parseInt(arr[0], 10);
    const end = parseInt(arr[1]||arr[0], 10);

    // Generate and return the range of numbers from start to end (inclusive)
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i.toString());
    }
    return result.map((item) => {
      if (parseInt(item) > 10) {
        return Object.keys(periodsTransformObj).find(key => periodsTransformObj[key] === item)
      }
      return item
    });
  }

  const parseTimeAndPlace = (timeString: string) => {
    const days = {
      '一': 'mon',
      '二': 'tue',
      '三': 'wed',
      '四': 'thu',
      '五': 'fri',
      '六': 'sat'
    };

    const schedule: { day: string; periods: string[]; place: string; }[] = [];
    if (!timeString) return [];
    const parts = timeString.split(', ');
    parts.forEach(part => {
      if (part.match(/[一二三四五六]/)) {
        const day = days[part[0]];
        const periods = generateRange(part.slice(2).split(' ')[0].split("-"));
        const place = part.slice(2).split(' ').slice(1,3).join(" ");
        schedule.push({ day, periods, place });
      }
    });

    return schedule;
  };

  const populateSchedule = () => {
    const newClassData = [...classPeriods];
    let totalCredits = 0;

    setScheduleConflict(false);

    if (!selectedClasses) return;
    selectedFilteredClasses.forEach(course => {
      totalCredits += course.學分;
      const schedule = parseTimeAndPlace(course.地點時間);
      schedule.forEach(({ day, periods, place }) => {
        periods.forEach(period => {
          const periodIndex = newClassData.findIndex(item => item.id === period);
          if (periodIndex !== -1) {
            if (newClassData[periodIndex][day] !== undefined) setScheduleConflict(true);
            newClassData[periodIndex] = {
              ...newClassData[periodIndex],
              [day]: {
                title: course.中文課程名稱,
                place
              }
            };
          }
        });
      });
    });

    setClassData(newClassData);
    setTotalCredits(totalCredits);
  };

  useEffect(() => {
    populateSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClasses, selectedTag, courseTags]);

  // Print handler function
  const handlePrint = () => {
    generatePDF();
  };

  const generatePDF = async () => {
    const input = document.getElementById("classtable"); 
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 1.5,
      ignoreElements: function(element) {
        return element.classList.contains('print:hidden');
      }
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10; // Define a margin
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pageWidth - 2 * margin; // Subtract margins from page width
    const imgHeight = (canvas.height * imgWidth) / canvas.width; 

    pdf.addImage(imgData, "PNG", margin, (pageHeight - imgHeight) / 2, imgWidth, imgHeight); // Center the image vertically
    pdf.save(`${selectedTag ? ("classtable_" + selectedTag) : "classtable_all"}.pdf`); 
  };

  return (
    <SidebarProvider className="w-full flex-1 h-screen print:h-auto">
      <AppSidebar />
      <div className="container mx-auto py-8 flex-1 pt-[72px] print:p-0">
        <Navbar />
        <div>
          <Collapsible
            open={searchOpen}
            onOpenChange={setSearchOpen}
            className="p-1 rounded-lg border"
          >
            <CollapsibleTrigger className="w-full">
              <Alert className="bg-transparent border-none">
                {searchOpen ? <ArrowUpCircle className="h-6 w-6" /> : <ArrowDownCircle className="h-6 w-6" />}
                <AlertTitle>
                  {SemesterDescription}課程列表
                </AlertTitle>
                <AlertDescription className="text-gray-500">
                  課程相關資訊請以學校提供的資料為準。
                </AlertDescription>
              </Alert>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ClassList />
            </CollapsibleContent>
          </Collapsible>

          <div className="my-8">
            <Alert>
              <InfoCircledIcon className="h-4 w-4" />
              <AlertTitle>請注意</AlertTitle>
              <AlertDescription className="text-gray-500">
                網站中的資料可能會因時間而失效，並且我們不保證其正確性。如先前加入的課程資訊有更新，請刪除後再次加入。
              </AlertDescription>
            </Alert>
          </div>

          <h2>已選擇的課程</h2>
          <ClassTable
            courses={selectedClasses}
            totalPages={1}
          />

          <div ref={contentRef} className="max-w-[768px] mx-auto mt-8 mb-24 print:h-auto" id="classtable">
            <TheClassTable
              selectedTag={selectedTag}
              scheduleConflict={scheduleConflict}
              handlePrint={handlePrint}
              setSelectedTag={setSelectedTag}
              courseTags={courseTags}
              showPeriodsTime={showPeriodsTime}
              setShowPeriodsTime={setShowPeriodsTime}
              showPlace={showPlace}
              setShowPlace={setShowPlace}
              classData={classData}
              totalCredits={totalCredits}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const TheClassTable = ({
  selectedTag,
  scheduleConflict,
  handlePrint,
  setSelectedTag,
  courseTags,
  showPeriodsTime,
  setShowPeriodsTime,
  showPlace,
  setShowPlace,
  classData,
  totalCredits
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">課表 {selectedTag}</h1>
        <Button variant="outline" disabled={scheduleConflict} onClick={handlePrint} className="print:hidden"><Download /> 課表PDF</Button>
      </div>

      <p>{totalCredits ? totalCredits + "學分" : null}</p>

      {/* Tag */}
      <div id="tagSelect" className="print:hidden">
        <h2 className="mt-4">選擇標籤</h2>
        <select
          value={selectedTag || 'all'}
          onChange={(e) => setSelectedTag(e.target.value === 'all' ? null : e.target.value)}
          className="px-4 py-2 border rounded my-2"
        >
          <option value="all">顯示全部</option>
          {[...new Set(
            Object.keys(courseTags).flatMap((courseId) =>
              courseTags[courseId]
            )
          )].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {scheduleConflict && (
        <Alert variant="destructive" className="my-4">
          <MessageCircleWarning className="h-4 w-4" />
          <AlertTitle>發生衝堂</AlertTitle>
          <AlertDescription>
            有課程時間有衝突，請確認您選擇的課程安排是否正確。
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-2 print:hidden">
        <ToggleSettings setShowPeriodsTime={setShowPeriodsTime} setShowPlace={setShowPlace} />
      </div>
      <Table className="table-fixed rounded-lg border-collapse border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableCell className="print:p-1">節次</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期一</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期二</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期三</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期四</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期五</TableCell>
            <TableCell className="border-l border-gray-200 print:p-1">星期六</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classData.map((classItem) => (
            <TableRow key={classItem.id} className="text-center h-16 print:h-12">
              <TableCell className="print:p-1">{classItem.id} {showPeriodsTime && <><br/><span className="text-xs text-gray-500">{classItem.timeStartMain} - {classItem.timeEndMain}</span></>}</TableCell>
              <ClassTableCell showPlace={showPlace} data={classItem.mon} />
              <ClassTableCell showPlace={showPlace} data={classItem.tue} />
              <ClassTableCell showPlace={showPlace} data={classItem.wed} />
              <ClassTableCell showPlace={showPlace} data={classItem.thu} />
              <ClassTableCell showPlace={showPlace} data={classItem.fri} />
              <ClassTableCell showPlace={showPlace} data={classItem.sat} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

const ClassTableCell = ({data, showPlace}) => {
  return (
    <TableCell className="border-l border-gray-200 print:p-1">
      {data?.title.replace(/(?:\[.*?\]|\(.*?\))/g, '')}
      {showPlace && <>
        <br />
        <span className="text-xs text-gray-500">{data?.place}</span>
      </>}
    </TableCell>
  )
}

export default ClasstablePage;
