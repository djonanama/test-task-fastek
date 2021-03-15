const fs = require('fs');
const path = require('path');
const mime = require('mime');

class Storage {

    constructor(store) {
        this.pathStore = path.join(__dirname, '../storage',store);
        fs.mkdirSync(this.pathStore, { recursive: true });
    }

    add = async (namefile) => {
        const pathFile = path.join(this.pathStore, namefile);
        return new Promise((resolve, reject) => {
            fs.access(pathFile, (err) => {
                if (err) {
                    resolve(fs.createWriteStream(pathFile)); // is not exist
                }else{
                    reject(`File is exist: ${pathFile}`); // is exist
                }
            });
        });
    }

    update = async (newnfilename,oldfilename) => {
        const pathOld = path.join(this.pathStore, oldfilename);
        const pathNew = path.join(this.pathStore, newnfilename);
        return new Promise((resolve, reject) => {
            fs.access(pathOld, (err) => {
                if (err) {
                    reject(`File is not exist: ${newnfilename}`); // is not exist
                }else{
                    fs. unlink(pathOld , e => {
                        resolve(fs.createWriteStream(pathNew)); // is not exist
                    });
                    resolve(fs.createWriteStream(pathNew)); // is not exist
                }
            });
        });
    }

    find = async (namefile) => {
        const pathFile = path.join(this.pathStore, namefile);
        return new Promise((resolve, reject) => {
            fs.access(pathFile, (err) => {
                if (err) {
                    reject(err);
                }else{
                    const mimetype = mime.getType(pathFile);
                    const filestream = fs.createReadStream(pathFile);

                    resolve({filestream,namefile,mimetype});
                }
            });
        });
    }

    findAll = async () => {
        return new Promise((resolve, reject) => 
            fs.readdir(this.pathStore, (err, files) => {
                if (err) {
                    reject(err);
                }else{
                resolve(files);
                }
            })
        );
    }

    delete = async (namefile) => {
        const pathFile = path.join(this.pathStore, namefile);
        return new Promise((resolve, reject) => {
            fs.unlink(pathFile, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Delete file: ${namefile}`);
                }
            });
        });
    }



}

const StorageFactory = (store) => new Storage(store);

module.exports = { Storage, StorageFactory};