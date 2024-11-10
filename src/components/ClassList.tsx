import { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useGlobalContext } from '@/context/GlobalContext';
import { FilterIcon, Loader2 } from 'lucide-react';
import PaginationItems from './PaginationItems';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Course {
  開課序號: number;
  中文課程名稱: string;
  英文課程名稱: string;
  系所: string;
  學分: number;
  教師: string;
  地點時間: string;
}

interface ClassTableProps {
  courses?: Course[];
}

export const ClassList: React.FC<ClassTableProps> = () => {
  const { classData: courses, loading, setLoading } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get unique departments from the course data
  const departmentOptions = [...new Set(courses.map(course => course.系所).filter(Boolean))];

  // Filter department options based on the department search term
  const filteredDepartmentOptions = departmentOptions.filter(department => 
    department.toLowerCase().includes(departmentSearchTerm.toLowerCase())
  );

  const departmentOptionsWithAll = ['全部系所', ...filteredDepartmentOptions];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler); // Clean up the timeout on component unmount or when searchTerm changes
  }, [searchTerm]);

  // Calculate the courses to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCourses = courses.filter(course => {
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    const matchesSearch = 
      (course.中文課程名稱 && course.中文課程名稱.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (course.英文課程名稱 && course.英文課程名稱.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (course.開課序號 && course.開課序號.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (course.教師 && course.教師.toLowerCase().includes(lowerCaseSearchTerm));
    const matchesDepartment = filterDepartment ? course.系所 === filterDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    handlePageChange(1);
  }, [totalPages])

  return (
    <div>
      <div className="flex items-center mb-4">
        <Input
          placeholder="搜尋課程名稱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4"
        />
        <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
          <DropdownMenuTrigger asChild>
            <Button className="px-4 py-2 rounded-md">
              {filterDepartment || "全部系所"} <FilterIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Input
              placeholder="搜尋系所..."
              value={departmentSearchTerm}
              onChange={(e) => setDepartmentSearchTerm(e.target.value)}
              className="mb-2"
            />
            <ScrollArea className="h-[200px] rounded-md border p-4">
              {departmentOptionsWithAll.length > 0 ? (
                departmentOptionsWithAll.map((dept, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      setFilterDepartment(dept === '全部系所' ? '' : dept); 
                      setShowDropdown(false);
                    }}
                  >
                    {dept}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>無匹配項目</DropdownMenuItem>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="flex justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
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
              {currentCourses.map((course) => (
                <TableRow key={course.開課序號}>
                  <TableCell>{course.開課序號}</TableCell>
                  <TableCell>{course.中文課程名稱} ({course.英文課程名稱})</TableCell>
                  <TableCell>{course.系所}</TableCell>
                  <TableCell>{course.學分}</TableCell>
                  <TableCell>{course.教師}</TableCell>
                  <TableCell>{course.時間地點}</TableCell>
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
      )}
    </div>
  );
};
