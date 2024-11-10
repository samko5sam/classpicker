import React, { FC, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

type ScheduleItem = {
  id: string;
  timeStartMain: string | null;
  timeEndMain: string | null;
  timeStartLinKou: string | null;
  timeEndLinKou: string | null;
  mon?: string | null;
  tue?: string | null;
  wed?: string | null;
  thu?: string | null;
  fri?: string | null;
  sat?: string | null;
};

const ClasstablePage: FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [classData, setClassData] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    // Fetch class data from a backend API or local data source
    const fetchClassData = async () => {
      // const response = await fetch(`/api/classes?id=${id}`);
      // const data = await response.json();
      // setClassData(data);
      setClassData(classPeriods);
    };
    fetchClassData();
    console.log(id);
  }, [id]);

  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <div className="container mx-auto py-8 flex-1 pt-[72px]">
        <Navbar />
        <div>
          <h1>課表 {id}</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>節次</TableCell>
                <TableCell>星期一</TableCell>
                <TableCell>星期二</TableCell>
                <TableCell>星期三</TableCell>
                <TableCell>星期四</TableCell>
                <TableCell>星期五</TableCell>
                <TableCell>星期六</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classData.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell>{classItem.id}</TableCell>
                  <TableCell>{classItem.mon}</TableCell>
                  <TableCell>{classItem.tue}</TableCell>
                  <TableCell>{classItem.wed}</TableCell>
                  <TableCell>{classItem.thu}</TableCell>
                  <TableCell>{classItem.fri}</TableCell>
                  <TableCell>{classItem.sat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClasstablePage;
