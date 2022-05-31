import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export const HomeUI = ({ rows, columns }) => {
    let navigate = useNavigate();

    const deffaultColumns = [
        { field: '_id', headerName: 'ID', width: 70 },
        {
            field: 'image',
            headerName: 'Avatar',
            editable: true,
            sortable: false,
            renderCell: (params) => (
                <img
                    style={{ borderRadius: '50%', width: 40, height: 40 }}
                    src={params.value}
                />
            ),
            width: 100,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label='delete'
                        style={{ color: 'rgb(212, 0, 0)' }}
                        size='large'
                        onClick={() => { OpenModal(params.id) }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label='delete' color='primary' size='large' onClick={() => { navigate('edit') }}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
            width: 105,
        },
    ];

    const OpenModal = (id) => document.getElementById("modal").showModal()
    const CloseModal = () => document.getElementById("modal").close()


    return (
        <>
            <dialog id='modal'>
                <p>Are you sure you want to delete the user from the system?</p>
                <button>yes</button>
                <button onClick={() => { CloseModal() }}>no</button>
            </dialog>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => { navigate('add') }}>
                    ADD
                </Button>
                <div style={{ height: 'calc(100vh - 48px)', width: '1250px' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={rows}
                        columns={deffaultColumns.concat(columns)}
                        pageSize={12}
                        rowsPerPageOptions={[12]}
                    // checkboxSelection
                    />
                </div>
            </div>
        </>
    )
}