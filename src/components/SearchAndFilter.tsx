import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listorder } from '@/constants/listorder';

// Search bar component
export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      placeholder="搜尋課程名稱..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mr-4"
      type='search'
    />
  );
};

// Filter dropdown component
export const FilterDropdown = ({
  filterDepartment,
  setFilterDepartment,
  departmentSearchTerm,
  setDepartmentSearchTerm,
  showDropdown,
  setShowDropdown,
  departmentOptionsWithAll,
}) => {
  return (
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
          type='search'
        />
        <ScrollArea className="h-[200px] rounded-md border">
          <div className='p-4'>
            {departmentOptionsWithAll.length > 0 ? (
              departmentOptionsWithAll.map((dept, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    setFilterDepartment(dept === '全部系所' ? '' : dept); 
                    setShowDropdown(false);
                  }}
                >
                  {listorder.filter(item => item.key == dept)[0]?.id} {dept}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>無匹配項目</DropdownMenuItem>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
