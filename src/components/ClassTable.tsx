import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Course } from './ClassList';
import PaginationItems from './PaginationItems';

interface ClassTableProps {
  courses: Course[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

export const ClassTable: React.FC<ClassTableProps> = ({
  courses,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <>
      <Table className="w-full border rounded">
        <TableHeader>
          <TableRow>
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
              <TableCell>{course.開課序號}</TableCell>
              <TableCell>{course.中文課程名稱} ({course.英文課程名稱})</TableCell>
              <TableCell>{course.系所}</TableCell>
              <TableCell>{course.學分}</TableCell>
              <TableCell>{course.教師}</TableCell>
              <TableCell>{course.地點時間}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationItems
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
