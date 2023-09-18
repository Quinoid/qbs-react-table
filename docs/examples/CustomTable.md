### Custom Table

Affix the table header to the specified position on the page

<!--start-code-->

```js
const App = () => {
  return (
    <div>
      <QbsTable
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },

          { title: 'Name', field: 'city' },

          { title: 'Country', field: 'country' },
          { title: 'Date of Birth', field: 'date_of_birth' },
          { title: 'Age', field: 'age' }
        ]}
        data={[
          {
            name: 'John Doe',
            email: 'johndoe@example.com',
            city: 'New York',
            country: 'United States',
            date_of_birth: '1990-05-15',
            age: 31,
            id: 1
          },
          {
            name: 'David Johnson',
            email: 'davidjohnson@example.com',
            city: 'London',
            country: 'United Kingdom',
            date_of_birth: '1992-08-10',
            age: 29,
            id: 2
          },
          {
            name: 'Emily Brown',
            email: 'emilybrown@example.com',
            city: 'Sydney',
            country: 'Australia',
            date_of_birth: '1988-03-28',
            age: 33,
            id: 3
          },
          {
            name: 'Michael Garcia',
            email: 'michaelgarcia@example.com',
            city: 'Madrid',
            country: 'Spain',
            date_of_birth: '1995-09-02',
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
            city: 'Tokyo',
            country: 'Japan',
            date_of_birth: '1984-09-30',
            age: 37,
            id: 10
          },
          {
            name: 'Sophia Bianchi',
            email: 'sophiabianchi@example.com',
            city: 'Rome',
            country: 'Italy',
            date_of_birth: '1996-12-03',
            age: 25,
            id: 11
          },
          {
            name: 'Logan Smith',
            email: 'logansmith@example.com',
            city: 'Toronto',
            country: 'Canada',
            date_of_birth: '1999-01-18',
            age: 22,
            id: 12
          },
          {
            name: 'Mia Andersson',
            email: 'miaandersson@example.com',
            city: 'Stockholm',
            country: 'Sweden',
            date_of_birth: '1994-07-06',
            age: 27,
            id: 13
          },
          {
            name: 'Benjamin Nguyen',
            email: 'benjaminnguyen@example.com',
            city: 'Paris',
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
      />
      <div style={{ height: 2000 }}>
        <hr />
      </div>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
