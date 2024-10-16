import { useState, useEffect } from 'react';
import { Table, Form, InputGroup, FormControl, Spinner, Dropdown } from 'react-bootstrap';

export const ClassList = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(classes);
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Get unique departments from the course data
  const departmentOptions = [...new Set(classes.map(course => course.系所).filter(Boolean))];

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

  // Filtering logic with loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = classes.filter(course => {
        const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
      const matchesSearch = 
        (course.中文課程名稱 && course.中文課程名稱.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (course.英文課程名稱 && course.英文課程名稱.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (course.開課序號 && course.開課序號.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
        (course.教師 && course.教師.toLowerCase().includes(lowerCaseSearchTerm));
        const matchesDepartment = filterDepartment ? course.系所 === filterDepartment : true;
        return matchesSearch && matchesDepartment;
      });
      setFilteredCourses(filtered);
      setLoading(false);
    }, 500); // Simulate a delay for loading

    return () => clearTimeout(timer); // Clean up the timeout on unmount or on filter change
  }, [debouncedSearchTerm, filterDepartment, classes]);

  return (
    <div>
      {/* <h3>課程列表</h3> */}

      {/* 搜尋欄位 */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="搜尋課程名稱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* 篩選條件 */}
      {/* <Form.Group controlId="filterDepartment">
        <Form.Label>篩選系所</Form.Label>
        <Form.Control
          as="select"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">全部系所</option>
          {departmentOptions.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </Form.Control>
      </Form.Group> */}

      {/* Custom Department Select with Filter */}
      <Form.Group controlId="filterDepartment">
        <Form.Label>篩選系所</Form.Label>
        <Dropdown onToggle={setShowDropdown} show={showDropdown}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {filterDepartment || "全部系所"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <InputGroup className="p-2">
              <FormControl
                placeholder="搜尋系所..."
                value={departmentSearchTerm}
                onChange={(e) => setDepartmentSearchTerm(e.target.value)}
              />
            </InputGroup>
            {departmentOptionsWithAll.length > 0 ? (
              departmentOptionsWithAll.map((dept, index) => (
                <Dropdown.Item 
                  key={index}
                  onClick={() => {
                    setFilterDepartment(dept === '全部系所' ? '' : dept); 
                    setShowDropdown(false);
                  }}
                >
                  {dept}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>無匹配項目</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      {/* Loading Indicator */}
      {loading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>開課序號</th>
              <th>課程名稱</th>
              <th>系所</th>
              <th>學分</th>
              <th>教師</th>
              <th>時間地點</th>
              {/* <th>已選人數/限修人數</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <ClassRow course={course} key={course.開課序號} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const ClassRow = ({ course }) => (
  <tr key={course.開課序號}>
    <td>{course.開課序號}</td>
    <td>{course.中文課程名稱} ({course.英文課程名稱})</td>
    <td>{course.系所}</td>
    <td>{course.學分}</td>
    <td>{course.教師}</td>
    <td>{course.地點時間}</td>
    {/* <td>{course.選修人數}/{course.限修人數}</td> */}
  </tr>
 )