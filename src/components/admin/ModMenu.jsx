import {useMemo, useCallback, useState} from 'react';
import { Grid, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Table} from "reactstrap";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';


const initialRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


function ModMenu(){
    const [rows, setRows] = useState(initialRows);

    const deleteUser = useCallback(
        (id) => () => {
            console.log(id)
          setTimeout(() => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          });
        },
        [],
      );

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
            field: 'Edit',
            headerName: '',
            renderCell: () => (
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: 16 }}
                >
                  Edit
                </Button>
            ),
          },
          {
            field: 'Delete',
            headerName: '',
            renderCell: (params) => (
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginLeft: 16 }}
                >
                  Delete
                </Button>
            ),
          },
          {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={deleteUser(params.id)}
              />,
            ]
          }
    ], [deleteUser])

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     {
    //       field: 'age',
    //       headerName: 'Age',
    //       type: 'number',
    //       width: 90,
    //     },
    //     {
    //         field: 'Edit',
    //         headerName: '',
    //         renderCell: () => (
    //             <Button
    //               variant="contained"
    //               size="small"
    //               style={{ marginLeft: 16 }}
    //             >
    //               Edit
    //             </Button>
    //         ),
    //       },
    //       {
    //         field: 'Delete',
    //         headerName: '',
    //         renderCell: (params) => (
    //             <Button
    //               variant="contained"
    //               size="small"
    //               style={{ marginLeft: 16 }}
    //             >
    //               Delete
    //             </Button>
    //         ),
    //       },
    //   ];
      
      

    return (
        <div style={{marginLeft: '18vw', backgroundColor:"white", height: '100vh'}}>
            <DataGrid autoHeight={true} pagi
            rows={rows}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[5]}
            checkboxSelection
            />
        </div>
    );
}

export default ModMenu;