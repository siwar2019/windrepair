export const employeeListResponse = {
    success: true,
    message: 'usersFetchedSuccessfully',
    data: {
        list: [
            {
                id: 6,
                email: 'test@b',
                companyName: null,
                name: 'name',
                phone: '23115535',
                isActive: true,
                isDeleted: false,
                typeId: 2,
                tenantId: 2,
                createdAt: '2024-06-11T10:39:06.000Z',
                updatedAt: '2024-06-11T10:39:06.000Z',
                role: [
                    {
                        id: 1,
                        name: 'technicien',
                        createdBy: 2,
                        createdAt: '2024-06-11T09:36:04.000Z',
                        updatedAt: '2024-06-11T09:36:04.000Z'
                    }
                ]
            }
        ],
        page: null,
        itemsPerPage: null,
        total: 4
    }
}
