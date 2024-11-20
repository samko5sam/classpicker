import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Course } from './ClassList';
import PaginationItems from './PaginationItems';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/GlobalContext';

interface ClassTableProps {
  courses: Course[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  enableAddClasses?: boolean;
}

export const ClassTable: React.FC<ClassTableProps> = ({
  courses,
  currentPage,
  totalPages,
  handlePageChange,
  enableAddClasses
}) => {
  const { selectedClasses, setSelectedClasses } = useGlobalContext();
  const [actionClasses, setActionClasses] = useState([]);

  const handleCourseSelect = (course: Course) => {
    if (actionClasses.includes(course)) {
      setActionClasses(actionClasses.filter((c) => c !== course));
    } else {
      setActionClasses([...actionClasses, course]);
    }
  };

  const handleAddSelectedCourses = () => {
    // Perform action with selected courses, e.g. add to class table
    console.log('Adding selected courses:', actionClasses);

    // Persist selected courses to localStorage
    localStorage.setItem('selectedCourses', JSON.stringify([...selectedClasses, ...actionClasses]));
    setSelectedClasses([...selectedClasses, ...actionClasses])
  };

  useEffect(() => {
    setActionClasses([]);
  }, [currentPage, courses])

  return (
    <>
      <Table className="w-full border rounded">
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                checked={actionClasses.length === courses.length && actionClasses.length !== 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setActionClasses(courses);
                  } else {
                    setActionClasses([]);
                  }
                }}
              />
            </TableHead>
            <TableHead>開課序號</TableHead>
            <TableHead>課程名稱</TableHead>
            <TableHead>系所</TableHead>
            <TableHead>學分</TableHead>
            <TableHead>教師</TableHead>
            <TableHead>時間地點</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.開課序號}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={actionClasses.includes(course)}
                  onChange={() => handleCourseSelect(course)}
                />
              </TableCell>
              <TableCell>{course.開課序號}</TableCell>
              <TableCell>{course.中文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</TableCell>
              <TableCell>{course.英文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</TableCell>
              <TableCell>{course.系所}</TableCell>
              <TableCell>{course.學分}</TableCell>
              <TableCell>{course.教師}</TableCell>
              <TableCell>{course.地點時間}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {enableAddClasses && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleAddSelectedCourses}
            disabled={actionClasses.length === 0}
          >
            加入課表
          </Button>
        </div>
      )}

      {totalPages > 1 && <PaginationItems
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
    </>
  );
};
