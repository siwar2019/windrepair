import React from 'react'
import AddEmployeeView from '../../components/employee/addEmployee-view'

const AddEmployeePage = () => {
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    return <AddEmployeeView open={open} closeModal={handleClose} />
}

export default AddEmployeePage
