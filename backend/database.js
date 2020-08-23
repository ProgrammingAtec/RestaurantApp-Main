class Database {
    constructor() {}

    dataTable = {};

    write(tableId, order) {
        if (this.dataTable.hasOwnProperty(tableId)) {
            this.dataTable[tableId].push(order);
            return;
        }

        this.dataTable[tableId] = [order];
    }

    get(tableId) {
        return this.dataTable[tableId];
    }

    getAll() {
        return this.dataTable;
    }
}

module.exports = Database;
