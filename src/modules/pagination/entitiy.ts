class Pagination {
    pageSize: number = 10
    currentPage: number = 1
    total: number = 10

    constructor(pagination) {
        if (!pagination) return

        Object.keys(pagination).map(key => {
            if (pagination[ key ]) {
                this[ key ] = pagination[ key ]
            }
        })
    }
}

export default Pagination