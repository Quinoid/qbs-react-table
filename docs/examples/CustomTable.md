### Custom Table

Affix the table header to the specified position on the page

<!--start-code-->

```js
const App = () => {
  const handleRow = row => {
    const cell = <div>{row?.city}</div>;
    const tooltip = 'Some useful string';
    return { cell, tooltip };
  };
  const [expandedRowKeys,setExpandedRowKeys]=React.useState([])
  const tableBodyRef = React.useRef(null);
  const childRef = React.useRef(null);

  const [columns, setColumns] = React.useState([
    {
      title: 'Name',
      field: 'name',
      resizable: true,
      isVisible: true,
      fixed: 'left',
      renderCell: row => {
        const cell = <span>{row.city}</span>;
        const toolTip = 'Some useful string';
        return { cell, toolTip };
      },
      link: true,
      rowClick: rowData => console.log(rowData),
      customCell: true
    },
    // {
    //   grouped: true,
    //   groupHeader: 'Group Header',
    //   isVisible: true,
    //   children: [
    //     { title: 'Sub Header', field: 'city', resizable: true, isVisible: true },
    //     { title: 'Sub Header2', field: 'country', resizable: true, isVisible: true }
    //   ]
    // },
    { title: 'City', field: 'city', resizable: true, isVisible: true },
    { title: 'Country', field: 'country', resizable: true, isVisible: true },
    {
      title: 'Date of Birth',
      field: 'date_of_birth',
      resizable: true,
      type: 'date',
      customCell: true
    },
    { title: 'Age', field: 'age', resizable: true, isVisible: true },
    { title: 'Named', field: 'email', resizable: true, isVisible: true },
    { title: 'Emaild', field: 'email', resizable: true, isVisible: true },
    { title: 'Cityd', field: 'city', resizable: true, isVisible: true },
    { title: 'Countdry', field: 'country', resizable: true, isVisible: true },
    {
      title: 'Datde of Birth',
      field: 'date_of_birth',
      resizable: true,
      isVisible: false,
      type: 'date',
      customCell: true
    },
    { title: 'Agde', field: 'age', resizable: true, isVisible: false }
  ]);
  const handleColumns = data => {
    console.log(data);
  };
   const handleRowExpand=()=>{
    return(
      <QbsTable
      tableKey={'child'}
        dataTheme="light"
        tableBodyRef={childRef}
        columns={columns}
        headerHeight={40}
        isLoading={false}
        dataRowKey="id"
        data={[
          {
            name: 'John Doe',
            email: 'johndoe@example.com',
            city: 'New York',
            country: 'United States',
            date_of_birth: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            age: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            id: '1'
          },
          {
            name: 'David Johnson',
            email: 'davidjohnson@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'United Kingdom',
            date_of_birth: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            age: 29,
            id: '2'
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
            {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
            {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
          {
            name: 'Michael Garcia',
            email: 'michaelgarcia@example.com',
            city: 'Madrid',
            country: 'Spain',
            date_of_birth: '3/30/2023 10:30 am',
            age: 26,
            id: 4
          },
          {
            name: 'Olivia Wang',
            email: 'oliviawang@example.com',
            city: 'Beijing',
            country: 'China',
            date_of_birth: '1983-11-12',
            age: 38,
            id: 5
          },
          {
            name: 'Liam Martinez',
            email: 'liammartinez@example.com',
            city: 'Mexico City',
            country: 'Mexico',
            date_of_birth: '1998-07-17',
            age: 23,
            id: 6
          },
          {
            name: 'Ava Kim',
            email: 'avakim@example.com',
            city: 'Seoul',
            country: 'South Korea',
            date_of_birth: '1991-04-25',
            age: 30,
            id: 7
          },
          {
            name: 'Noah Kowalski',
            email: 'noahkowalski@example.com',
            city: 'Warsaw',
            country: 'Poland',
            date_of_birth: '1987-02-08',
            age: 34,
            id: 8
          },
          {
            name: 'Isabella Novak',
            email: 'isabellanovak@example.com',
            city: 'Vienna',
            country: 'Austria',
            date_of_birth: '1993-06-14',
            age: 28,
            id: 9
          },
          {
            name: 'James Lee',
            email: 'jameslee@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Japan',
            date_of_birth: '1984-09-30',
            age: 37,
            id: 10
          },
          {
            name: 'Sophia Bianchi',
            email: 'sophiabianchi@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Italy',
            date_of_birth: '1996-12-03',
            age: 25,
            id: 11
          },
          {
            name: 'Logan Smith',
            email: 'logansmith@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Canada',
            date_of_birth: '1999-01-18',
            age: 22,
            id: 12
          },
          {
            name: 'Mia Andersson',
            email: 'miaandersson@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Sweden',
            date_of_birth: '1994-07-06',
            age: 27,
            id: 13
          },
          {
            name: 'Benjamin Nguyen',
            email: 'benjaminnguyen@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'France',
            date_of_birth: '1997-10-22',
            age: 24,
            id: 14
          },
          {
            name: 'Emma Hernandez',
            email: 'emmahernandez@example.com',
            city: 'Barcelona',
            country: 'Spain',
            date_of_birth: '1990-03-09',
            age: 31,
            id: 15
          },
          {
            name: 'Alexander Wu',
            email: 'alexanderwu@example.com',
            city: 'Shanghai',
            country: 'China',
            date_of_birth: '1986-11-04',
            age: 35,
            id: 16
          },
          {
            name: 'Sofia Russo',
            email: 'sofiarusso@example.com',
            city: 'Milan',
            country: 'Italy',
            date_of_birth: '1989-08-28',
            age: 32,
            id: 17
          },
          {
            name: 'William García',
            email: 'williamgarcia@example.com',
            city: 'Bogotá',
            country: 'Colombia',
            date_of_birth: '1991-02-12',
            age: 30,
            id: 18
          },
          {
            name: 'Ava dos Santos',
            email: 'avasantos@example.com',
            city: 'São Paulo',
            country: 'Brazil',
            date_of_birth: '1987-05-31',
            age: 34,
            id: 19
          },
          {
            name: 'Liam Dubois',
            email: 'liamdubois@example.com',
            city: 'Montreal',
            country: 'Canada',
            date_of_birth: '1994-09-16',
            age: 27,
            id: 20
          },
          {
            name: 'Amelia Wei',
            email: 'ameliawei@example.com',
            city: 'Beijing',
            country: 'China',
            date_of_birth: '1998-04-11',
            age: 23,
            id: 21
          },
          {
            name: 'Ethan Moreau',
            email: 'ethanmoreau@example.com',
            city: 'Paris',
            country: 'France',
            date_of_birth: '1993-07-29',
            age: 28,
            id: 22
          },
          {
            name: 'Olivia Silva',
            email: 'oliviasilva@example.com',
            city: 'Lisbon',
            country: 'Portugal',
            date_of_birth: '1985-01-05',
            age: 36,
            id: 23
          },
          {
            name: 'Noah Varga',
            email: 'noahvarga@example.com',
            city: 'Budapest',
            country: 'Hungary',
            id: 24
          }
         ]} 
        
        height={300}
        rowExpandedHeight={317}
        loading={true}
        columnToggle
        actionProps={[
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },

          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hide:(row) =>  false,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          }
        ]}
      />
    )
   }
  return (
    <div>
      <QbsTable
        selection={true}
        tableKey={'parent'}
        dataTheme="light"
        pagination={true}
        tableBodyRef={tableBodyRef}
        columns={columns}
        rowExpand={true}
        expandedRowKeys={expandedRowKeys}
        setExpandedRowKeys={setExpandedRowKeys}
        headerHeight={40}
        tableBodyHeight={`calc(100vh - 300px)`}
        isLoading={false}
        dataRowKey="id"
        handleRowExpanded={handleRowExpand}
       
        data={[
          {
            name: 'John Doe',
            email: 'johndoe@example.com',
            city: 'New York',
            country: 'United States',
            date_of_birth: '11/28/2023',
            age: 'In publishing and graphic design , Lorem ipsum is a placeholder text commonly used to demonstrate the',
            id: '1',
            childDetail: (
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            )
          },
          {
            name: 'David Johnson',
            email: 'davidjohnson@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'United Kingdom',
            date_of_birth: '1/30/2021',
            age: 29,
            id: '2'
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Australia',
            date_of_birth: '30/1/2023',
            age: 33,
            id: '3'
          },
          {
            name: 'Michael Garcia',
            email: 'michaelgarcia@example.com',
            city: 'Madrid',
            country: 'Spain',
            date_of_birth: '3/30/2023 10:30 am',
            age: 26,
            id: 4
          },
          {
            name: 'Olivia Wang',
            email: 'oliviawang@example.com',
            city: 'Beijing',
            country: 'China',
            date_of_birth: '1983-11-12',
            age: 38,
            id: 5
          },
          {
            name: 'Liam Martinez',
            email: 'liammartinez@example.com',
            city: 'Mexico City',
            country: 'Mexico',
            date_of_birth: '1998-07-17',
            age: 23,
            id: 6
          },
          {
            name: 'Ava Kim',
            email: 'avakim@example.com',
            city: 'Seoul',
            country: 'South Korea',
            date_of_birth: '1991-04-25',
            age: 30,
            id: 7
          },
          {
            name: 'Noah Kowalski',
            email: 'noahkowalski@example.com',
            city: 'Warsaw',
            country: 'Poland',
            date_of_birth: '1987-02-08',
            age: 34,
            id: 8
          },
          {
            name: 'Isabella Novak',
            email: 'isabellanovak@example.com',
            city: 'Vienna',
            country: 'Austria',
            date_of_birth: '1993-06-14',
            age: 28,
            id: 9
          },
          {
            name: 'James Lee',
            email: 'jameslee@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Japan',
            date_of_birth: '1984-09-30',
            age: 37,
            id: 10
          },
          {
            name: 'Sophia Bianchi',
            email: 'sophiabianchi@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Italy',
            date_of_birth: '1996-12-03',
            age: 25,
            id: 11
          },
          {
            name: 'Logan Smith',
            email: 'logansmith@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Canada',
            date_of_birth: '1999-01-18',
            age: 22,
            id: 12
          },
          {
            name: 'Mia Andersson',
            email: 'miaandersson@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'Sweden',
            date_of_birth: '1994-07-06',
            age: 27,
            id: 13
          },
          {
            name: 'Benjamin Nguyen',
            email: 'benjaminnguyen@example.com',
            city: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the',
            country: 'France',
            date_of_birth: '1997-10-22',
            age: 24,
            id: 14
          },
          {
            name: 'Emma Hernandez',
            email: 'emmahernandez@example.com',
            city: 'Barcelona',
            country: 'Spain',
            date_of_birth: '1990-03-09',
            age: 31,
            id: 15
          },
          {
            name: 'Alexander Wu',
            email: 'alexanderwu@example.com',
            city: 'Shanghai',
            country: 'China',
            date_of_birth: '1986-11-04',
            age: 35,
            id: 16
          },
          {
            name: 'Sofia Russo',
            email: 'sofiarusso@example.com',
            city: 'Milan',
            country: 'Italy',
            date_of_birth: '1989-08-28',
            age: 32,
            id: 17
          },
          {
            name: 'William García',
            email: 'williamgarcia@example.com',
            city: 'Bogotá',
            country: 'Colombia',
            date_of_birth: '1991-02-12',
            age: 30,
            id: 18
          },
          {
            name: 'Ava dos Santos',
            email: 'avasantos@example.com',
            city: 'São Paulo',
            country: 'Brazil',
            date_of_birth: '1987-05-31',
            age: 34,
            id: 19
          },
          {
            name: 'Liam Dubois',
            email: 'liamdubois@example.com',
            city: 'Montreal',
            country: 'Canada',
            date_of_birth: '1994-09-16',
            age: 27,
            id: 20
          },
          {
            name: 'Amelia Wei',
            email: 'ameliawei@example.com',
            city: 'Beijing',
            country: 'China',
            date_of_birth: '1998-04-11',
            age: 23,
            id: 21
          },
          {
            name: 'Ethan Moreau',
            email: 'ethanmoreau@example.com',
            city: 'Paris',
            country: 'France',
            date_of_birth: '1993-07-29',
            age: 28,
            id: 22
          },
          {
            name: 'Olivia Silva',
            email: 'oliviasilva@example.com',
            city: 'Lisbon',
            country: 'Portugal',
            date_of_birth: '1985-01-05',
            age: 36,
            id: 23
          },
          {
            name: 'Noah Varga',
            email: 'noahvarga@example.com',
            city: 'Budapest',
            country: 'Hungary',
            id: 24
          }
         ]} 
        actionProps={[
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },
          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hidden:true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          },

          {
            title: 'Delete',
            action: rowData => console.log(rowData),
            hide:(row) =>  false,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
            toolTip: 'Tooltip'
          }
        ]}
        search
        height={550}
        toolbar
        loading={true}
        columnToggle
        handleColumnToggle={handleColumns}
      />
      <div style={{ height: 100 }}>
        <hr />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->

<!-- # `QbsTable` Component

`QbsTable` is a versatile and customizable table component designed for multiple use cases. Below are the props it accepts:

### Props

#### `handleColumnSort: (sortColumn: any, sortType: any) => void`

A function to handle the column sorting. It receives `sortColumn` and `sortType` as parameters.

```jsx
<QbsTable handleColumnSort={(sortColumn, sortType) => console.log(sortColumn, sortType)} />
```

#### `data: any[]`

An array containing the data to be displayed in the table.

```jsx
<QbsTable data={[{ id: 1, name: 'John Doe' }]} />
```

#### `columns: Column[]`

An array defining the columns of the table.

```jsx
<QbsTable columns={[{ title: 'Name', field: 'name' }]} />
```

#### `sortColumn: string`

Defines the column that is currently sorted.

```jsx
<QbsTable sortColumn="name" />
```

#### `sortType: string`

Defines the current sort type.

```jsx
<QbsTable sortType="asc" />
```

#### `selection: boolean`

Enables or disables row selection using checkboxes.

```jsx
<QbsTable selection={true} />
```

#### `onSelect: (selectedKeys: number[]) => void`

Callback fired when a row is selected.

```jsx
<QbsTable onSelect={selectedKeys => console.log(selectedKeys)} />
```

#### `title: string`

Sets the title of the table.

```jsx
<QbsTable title="My Custom Table" />
```

#### `search: boolean`

Enables or disables the search functionality.

```jsx
<QbsTable search={true} />
```

#### `asyncSearch: boolean`

If true, activates asynchronous search.

```jsx
<QbsTable asyncSearch={true} />
```

#### `searchValue: string`

Controls the value of the search input.

```jsx
<QbsTable searchValue="John" />
```

#### `onSearch: (value: string) => void`

Callback fired when the search value changes.

```jsx
<QbsTable onSearch={value => console.log(value)} />
```

#### `handleSearchValue: (value: string) => void`

A function to handle the search value, usually used for controlled components.

```jsx
<QbsTable handleSearchValue={value => console.log(value)} />
```

#### `paginationProps: object`

Props to be passed to the `Pagination` component.

```jsx
<QbsTable paginationProps={{ total: 100, pageSize: 10 }} />
```

#### `pagination: boolean`

Enables or disables the pagination.

```jsx
<QbsTable pagination={true} />
```

#### `cellBordered: boolean`

If true, displays borders around cells.

```jsx
<QbsTable cellBordered={true} />
```

#### `bordered: boolean`

If true, displays a border around the table.

```jsx
<QbsTable bordered={true} />
```

#### `minHeight: number`

Sets the minimum height of the table.

```jsx
<QbsTable minHeight={300} />
```

#### `height: number`

Sets the height of the table.

```jsx
<QbsTable height={550} />
```

#### `onExpandChange: (rowData: any) => void`

Callback fired when the expanded state of a row is changed.

```jsx
<QbsTable onExpandChange={rowData => console.log(rowData)} />
```

#### `wordWrap: boolean`

If true, enables word wrapping in cells.

```jsx
<QbsTable wordWrap={true} />
```

#### `dataRowKey: string`

Defines the key from the data that will be used for row keys.

```jsx
<QbsTable dataRowKey="id" />
```

#### `defaultExpandAllRows: boolean`

If true, expands all rows by default.

```jsx
<QbsTable defaultExpandAllRows={true} />
```

#### `handleRowExpanded: (rowData: any) => ReactNode`

A function to handle the rendering of expanded rows. It should return a valid ReactNode.

```jsx
<QbsTable handleRowExpanded={rowData => <div>{rowData.name}</div>} />
```

#### `shouldUpdateScroll: boolean`

If true, updates the scroll position when needed.

```jsx
<QbsTable shouldUpdateScroll={true} />
```

#### `rowExpand: boolean`

If true, enables the row expand functionality.

```jsx
<QbsTable rowExpand={true} />
```

#### `actionProps: any[]`

An array of action props to be passed to the `ActionCell` component.

```jsx
<QbsTable actionProps={[{ title: 'Delete', onClick: rowData => console.log(rowData) }]} />
```

#### `theme: string`

Defines the theme of the table. It could be 'light' or 'dark'.

```jsx
<QbsTable theme="dark" />
```

#### `handleMenuActions: (action: any, rowData: any) => void`

A function to handle the actions from the action menu.

```jsx
<QbsTable handleMenuActions={(action, rowData) => console.log(action, rowData)} />
```

#### `onRowClick: (rowData: any) => void`

Callback fired when a row is clicked.

```jsx
<QbsTable onRowClick={rowData => console.log(rowData)} />
```

#### `expandedRowKeys: string[]`

An array of the keys of the currently expanded rows.

```jsx
<QbsTable expandedRowKeys={['1', '2']} />
```

#### `setExpandedRowKeys: (keys: string[]) => void`

A function to set the keys of the currently expanded rows.

```jsx
<QbsTable setExpandedRowKeys={keys => console.log(keys)} />
```

#### `primaryFilter: any`

Prop to handle primary filtering.

```jsx
<QbsTable primaryFilter={{ filterType: 'date', filterValue: '2023-01-01' }} />
```

#### `advancefilter: any`

Prop to handle advanced filtering.

```jsx
<QbsTable advancefilter={{ filterType: 'name', filterValue: 'John' }} />
```

#### `classes: object`

Object containing className strings.

```jsx
<QbsTable classes={{ headerClass: 'my-header-class', cellClass: 'my-cell-class' }} />
```

#### `toolbar: boolean`

If true, displays the toolbar.

```jsx
<QbsTable toolbar={true} />
```

### Example

Here is an example of how you might use the `QbsTable` component with various props:

```jsx
<QbsTable
  title="User Data"
  data={[
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]}
  columns={[{ title: 'Name', field: 'name' }]}
  sortColumn="name"
  sortType="asc"
  selection={true}
  onSelect={selectedKeys => console.log(selectedKeys)}
  search={true}
  onSearch={value => console.log(value)}
  pagination={true}
  paginationProps={{ total: 100, pageSize: 10 }}
  cellBordered={true}
  bordered={true}
  minHeight={300}
  height={550}
  onExpandChange={rowData => console.log(rowData)}
  wordWrap={true}
  dataRowKey="id"
  defaultExpandAllRows={true}
  handleRowExpanded={rowData => <div>{rowData.name}</div>}
  shouldUpdateScroll={true}
  rowExpand={true}
  actionProps={[{ title: 'Delete', onClick: rowData => console.log(rowData) }]}
  theme="dark"
  handleMenuActions={(action, rowData) => console.log(action, rowData)}
  onRowClick={rowData => console.log(rowData)}
  expandedRowKeys={['1', '2']}
  setExpandedRowKeys={keys => console.log(keys)}
  primaryFilter={{ filterType: 'date', filterValue: '2023-01-01' }}
  advancefilter={{ filterType: 'name', filterValue: 'John' }}
  classes={{ headerClass: 'my-header-class', cellClass: 'my-cell-class' }}
  toolbar={true}
/>
```

### Notes

- The `QbsTable` component should be used in accordance with the requirements of your application. Ensure that you pass the correct props for your desired functionality.
- Please ensure that you have handled the callback functions properly for your specific use cases, as mismanagement of state and props may lead to unexpected behavior of the component. -->
