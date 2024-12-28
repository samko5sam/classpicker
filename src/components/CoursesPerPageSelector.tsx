import { FC, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CoursesPerPageSelectorProps {
  coursesPerPage: number;
  setCoursesPerPage: (value: number) => void;
}

const CoursesPerPageSelector: FC<CoursesPerPageSelectorProps> = ({ coursesPerPage, setCoursesPerPage }) => {
  // Retrieve last saved search term from session storage
  useEffect(() => {
    const savedOption = localStorage.getItem('coursesPerPage');
    if (savedOption) {
      setCoursesPerPage(parseInt(savedOption));
    }
  }, [setCoursesPerPage]);
  // Save search term to session storage on update
  useEffect(() => {
    if (coursesPerPage === undefined) return
    localStorage.setItem('coursesPerPage', coursesPerPage.toString());
  }, [coursesPerPage]);
  console.log(coursesPerPage)
  const selectedStr = coursesPerPage !== undefined ? coursesPerPage.toString() : "";
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="coursesPerPage">一頁顯示數量</Label>
      <Select
        value={selectedStr}
        onValueChange={(value) => setCoursesPerPage(parseInt(value))}
      >
        <SelectTrigger className='w-24'>
          <SelectValue placeholder="一頁顯示數量" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CoursesPerPageSelector;
