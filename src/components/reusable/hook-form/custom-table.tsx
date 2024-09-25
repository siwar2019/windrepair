import React, { useState } from 'react'

type customTableProps = {
    defaultRowsPerPage?: number
}

const useCustomPaginationTable = (props?: customTableProps) => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = React.useState(props?.defaultRowsPerPage || 3)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    return {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        setPage,
        setRowsPerPage
    }
}

export default useCustomPaginationTable
