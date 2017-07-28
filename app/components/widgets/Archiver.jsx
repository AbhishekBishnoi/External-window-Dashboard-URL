import jszip from 'jszip';
import FileSaver from 'file-saver';

export default class Archiver {
    zipFiles(files, packageName) {
        var zip = new jszip();
        files.forEach(function (file) {
            zip.file(file.fileName, file.content);
        }, this);
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, packageName);
        });
    }
}