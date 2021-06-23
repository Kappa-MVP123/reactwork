import React from 'react';

const App  = () => {
  const data =
  [
     {
        "id":1,
        "name":"Foo",
        "age":"20"
     },
     {
        "id":2,
        "name":"Bar",
        "age":"30"
     },
     {
        "id":3,
        "name":"Baz",
        "age":"40"
     }
  ]
      return (
         <div>
            <Header/>
            <table>
               <tbody>
                  {data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
         </div>
      );
   }

const Header = () => {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
}
const TableRow = (props)  => {
  const {data} =props;
      return (
         <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.age}</td>
         </tr>
      );
}
export default App;