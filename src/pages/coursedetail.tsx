import { AppSidebar } from '@/components/AppSidebar';
import { Course } from '@/components/ClassList';
import FacebookComments from '@/components/FacebookComments';
import Navbar from '@/components/ui/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const CourseDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageUrl = `https://samko5sam.github.io${window.location.pathname}#${location.pathname}${location.search}`;
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const { classData } = useGlobalContext();
  const [courseData, setCourseData] = useState<Course | null>();

  useEffect(() => {
    if (courseId) {
      console.log(courseId)
      console.log(classData[0])
      const courseDetail = classData.filter(item => item.開課序號 === parseInt(courseId))[0]
      console.log(courseDetail)
      setCourseData(courseDetail);
      console.log(pageUrl)
    }
  }, [classData, courseId, pageUrl]);

  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <div className='container mx-auto py-8 flex-1 pt-[72px]'>
        <Navbar />
        {!courseData ? "載入中..." : <>
          <h1 className='text-xl my-4'>{courseData.中文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</h1>
          <p className='text-sm mb-8'>{courseData.英文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>系所</TableHead>
                <TableHead>學分</TableHead>
                <TableHead>教師</TableHead>
                <TableHead>時間地點</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{courseData.系所}</TableCell>
                <TableCell>{courseData.學分}</TableCell>
                <TableCell>{courseData.教師}</TableCell>
                <TableCell>{courseData.地點時間}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <FacebookComments pageUrl={pageUrl} />
        </>}
      </div>
    </SidebarProvider>
  );
};

export default CourseDetails;
