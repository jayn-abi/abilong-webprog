import { DataGrid } from '@mui/x-data-grid';
import Button from '../../components/Button';

const columns = [
    { field: 'id',        headerName: 'ID',         width: 70 },
    { field: 'firstName', headerName: 'First Name',  width: 150, editable: true },
    { field: 'lastName',  headerName: 'Last Name',   width: 150, editable: true },
    { field: 'age',       headerName: 'Age',         width: 100, type: 'number', editable: true },
    {
        field: 'fullName',
        headerName: 'Full Name',
        sortable: false,
        flex: 1,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
];

const rows = [
    { id: 1, lastName: 'Snow',       firstName: 'Jon',      age: 35  },
    { id: 2, lastName: 'Lannister',  firstName: 'Cersei',   age: 42  },
    { id: 3, lastName: 'Lannister',  firstName: 'Jaime',    age: 45  },
    { id: 4, lastName: 'Stark',      firstName: 'Arya',     age: 16  },
    { id: 5, lastName: 'Targaryen',  firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null,        age: 150 },
    { id: 7, lastName: 'Clifford',   firstName: 'Ferrara',  age: 44  },
    { id: 8, lastName: 'Frances',    firstName: 'Rossini',  age: 36  },
    { id: 9, lastName: 'Roxie',      firstName: 'Harvey',   age: 65  },
];

const UsersPage = () => (
    <div className="pb-10">

        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
                
                <div className="mt-1 flex items-center gap-3">
                    <h1 className="text-3xl font-bold" style={{ color: '#0f0f1a' }}>Users</h1>
                    <span
                        className="rounded-full px-3 py-1 text-xs font-semibold border"
                        style={{
                            color: '#00b8d9',
                            borderColor: 'rgba(0,212,255,0.25)',
                            background: 'rgba(0,212,255,0.08)',
                        }}
                    >
                        {rows.length} Total
                    </span>
                </div>
                
            </div>
            
        </div>

        {/* Data Table */}
        <div
            className="glass-card rounded-[1.25rem] overflow-hidden"
            style={{ height: 480 }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                    border: 'none',
                    bgcolor: 'transparent',
                    fontFamily: "'Inter', sans-serif",
                    '& .MuiDataGrid-columnHeader': {
                        bgcolor: 'rgba(0, 0, 0, 0.03)',
                        color: '#0f0f1a',
                        fontWeight: 600,
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                    },
                    '& .MuiDataGrid-row': {
                        color: '#0f0f1a',
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: 'rgba(0, 212, 255, 0.05)',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        bgcolor: 'rgba(0, 212, 255, 0.10)',
                        '&:hover': { bgcolor: 'rgba(0, 212, 255, 0.14)' },
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: 'rgba(15, 15, 26, 0.06)',
                    },
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(15, 15, 26, 0.06)',
                    },
                    '& .MuiCheckbox-root': {
                        color: 'rgba(15,15,26,0.35)',
                        '&.Mui-checked': { color: '#00b8d9' },
                    },
                }}
            />
        </div>

    </div>
);

export default UsersPage;