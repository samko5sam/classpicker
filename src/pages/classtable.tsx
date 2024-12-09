import { FC, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const { selectedClasses } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [classData, setClassData] = useState<ScheduleItem[]>(classPeriods);
  const [showPeriodsTime, setShowPeriodsTime] = useState(false);
  const [showPlace, setShowPlace] = useState(true);

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

    if (!selectedClasses) return;
    selectedClasses.forEach(course => {
      const schedule = parseTimeAndPlace(course.地點時間);
      schedule.forEach(({ day, periods, place }) => {
        periods.forEach(period => {
          const periodIndex = newClassData.findIndex(item => item.id === period);
          if (periodIndex !== -1) {
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
  };

  useEffect(() => {
    populateSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClasses]);

  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <div className="container mx-auto py-8 flex-1 pt-[72px]">
        <Navbar />
        <div>
          <ClassList />

          <h2>已選擇的課程</h2>
          <ClassTable
            courses={selectedClasses}
            totalPages={1}
          />
          <div className="max-w-[768px] mx-auto mt-4">
            <h1 className="text-2xl font-semibold">課表 {id}</h1>
            <div className="mb-2">
              <ToggleSettings setShowPeriodsTime={setShowPeriodsTime} setShowPlace={setShowPlace} />
            </div>
            <Table className="table-fixed rounded-lg border-collapse border border-gray-200">
              <TableHeader>
                <TableRow>
                  <TableCell>節次</TableCell>
                  <TableCell className="border-l border-gray-200">星期一</TableCell>
                  <TableCell className="border-l border-gray-200">星期二</TableCell>
                  <TableCell className="border-l border-gray-200">星期三</TableCell>
                  <TableCell className="border-l border-gray-200">星期四</TableCell>
                  <TableCell className="border-l border-gray-200">星期五</TableCell>
                  <TableCell className="border-l border-gray-200">星期六</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classData.map((classItem) => (
                  <TableRow key={classItem.id} className="text-center h-16">
                    <TableCell>{classItem.id} {showPeriodsTime && <><br/><span className="text-xs text-gray-500">{classItem.timeStartMain} - {classItem.timeEndMain}</span></>}</TableCell>
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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const ClassTableCell = ({data, showPlace}) => {
  return (
    <TableCell className="border-l border-gray-200">
      {data?.title.replace(/(?:\[.*?\]|\(.*?\))/g, '')}
      {showPlace && <>
        <br />
        <span className="text-xs text-gray-500">{data?.place}</span>
      </>}
    </TableCell>
  )
}

export default ClasstablePage;