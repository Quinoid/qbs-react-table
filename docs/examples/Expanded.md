### Expandable

<!--start-code-->

```js
const rowKey = 'id';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props}>
    <Button
      size="xs"
      onClick={() => {
        onChange(rowData);
      }}
    >
      {expandedRowKeys.some(key => key === rowData[rowKey]) ? <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.792893 0.292893C1.18342 -0.097631 1.81658 -0.097631 2.20711 0.292893L5.5 3.58579L8.79289 0.292893C9.18342 -0.0976311 9.81658 -0.0976311 10.2071 0.292893C10.5976 0.683417 10.5976 1.31658 10.2071 1.70711L6.20711 5.70711C5.81658 6.09763 5.18342 6.09763 4.79289 5.70711L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z" fill="#313131"/>
      </svg> : 
      <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.792894 9.70711C0.402369 9.31658 0.402369 8.68342 0.792894 8.29289L4.08579 5L0.792893 1.70711C0.402369 1.31658 0.402369 0.683418 0.792893 0.292894C1.18342 -0.0976312 1.81658 -0.0976312 2.20711 0.292894L6.20711 4.29289C6.59763 4.68342 6.59763 5.31658 6.20711 5.70711L2.20711 9.70711C1.81658 10.0976 1.18342 10.0976 0.792894 9.70711Z" fill="#313131"/>
      </svg>
      }
    </Button>
  </Cell>
);

const data = mockUsers(20);

const ExpandedTable = () => {
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([0]);

  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach(key => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

  return (
    <Table
      shouldUpdateScroll={false}
      height={400}
      data={data}
      rowKey={rowKey}
      expandedRowKeys={expandedRowKeys}
      onRowClick={data => {
        console.log(data);
      }}
      renderRowExpanded={rowData => {
        return (
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                float: 'left',
                marginRight: 10,
                background: '#eee'
              }}
            >
              <img src={rowData.avatar} style={{ width: 60 }} />
            </div>
            <p>{rowData.email}</p>
            <p>{rowData.date}</p>
          </div>
        );
      }}
    >
      <Column width={70} align="center">
        <HeaderCell>#</HeaderCell>
        <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>

      <Column width={300} verticalAlign="middle">
        <HeaderCell>Company</HeaderCell>
        <Cell dataKey="company" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<ExpandedTable />);
```

<!--end-code-->
