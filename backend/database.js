const fs = require('fs');

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

    makeBackup() {
        const path = '/Users/chingizegamberdiev/programming/board-backups/backup.txt';

        fs.writeFile(path, JSON.stringify(this.dataTable), (err) => {
            console.log(JSON.stringify(this.dataTable));
            if (err) return console.log(err);
        });
    }

    async loadBackup() {
        const path = '/Users/chingizegamberdiev/programming/board-backups/backup.txt';

        const data = await new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err);
                this.dataTable = JSON.parse(data);
                resolve(this.dataTable);
            });
        });

        console.log('Data type', typeof data);
        console.log('Data: ', data);
        return data;
    }
}

module.exports = Database;
