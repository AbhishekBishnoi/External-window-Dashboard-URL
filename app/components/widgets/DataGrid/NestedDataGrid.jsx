import React from 'react';
import ReactDOM from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import keys from 'lodash/keys';
import find from 'lodash/find';
import map from 'lodash/map';


import PerfectScrollbar from 'perfect-scrollbar';
import shortid from 'shortid';
import EditableTextBox from './EditableTextBox.jsx';
import ColDefFactory from './ColDefFactory.jsx';

import Constants from '../../../utils/Constants.jsx';
import DashboardStore from '../../../stores/Dashboard.jsx';

const socket = io.connect();
let data = [{
    folder: true,
    open: true,
    name: 'C:',
    size: '434GB',
    type: 'Drive',
    dateModified: '13/03/2014 10:14',
    children: [
        {
            folder: true,
            name: 'Windows',
            size: '122gb',
            type: 'File Folder',
            dateModified: '27/02/2014 04:12',
            children: [
                { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
            ]
        },
        {
            folder: true,
            name: 'Program Files',
            size: '48gb',
            type: 'File Folder',
            dateModified: '11/09/2013 02:11',
            open: true,
            children: [
                {
                    folder: true,
                    name: 'ASUS',
                    size: '32gb',
                    type: 'File Folder',
                    dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Classic Shell', size: '101 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Common Files', size: '121 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'DisplayLink Core Software', size: '98 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Intel', size: '87 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Internet Explorer', size: '88 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Intel Corporation', size: '89 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                },
                {
                    folder: true,
                    name: 'Java', size: '76 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                    children: [
                        {
                            folder: true,
                            name: 'jdk1.8.0', size: '90 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                { name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                { name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12' },
                                { name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56' }
                            ]
                        },
                        {
                            folder: true,
                            name: 'jre1.8.0_31', size: '90 kb', type: 'File Folder', dateModified: '13/03/2014 1014',
                            children: [
                                { name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                { name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12' },
                                { name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56' }
                            ]
                        },
                        { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                        { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                        { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                    ]
                }
            ]
        },
        { group: false, name: 'boot.ini', size: '16 kb', type: 'Boot File', dateModified: '27/11/2012 04:12' },
        { group: false, name: 'system.cfg', size: '13 kb', type: 'System File', dateModified: '18/03/2014 00:56' }
    ]
},
{
    folder: true,
    name: 'D:',
    size: '1.8 gb', type: 'Drive', dateModified: '13/03/2014 10:14',
    children: [
        { name: 'Game of Thrones s05e01.avi', size: '1034 mb', type: 'Movie', dateModified: '13/03/2014 10:14' },
        { name: 'The Knick s01e01', size: '523 mb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
        { name: 'musicbackup1.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56' },
        { name: 'musicbackup2.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56' }
    ]
}];
export default class NestedDataGrid extends React.Component {

    constructor(props) {
        super(props);
        this.createData(data);
        this.state = this.getPropsFromStores();
    }

    createData(arr) {
        var me = this;
        arr.forEach(function (element) {
            element.id = shortid.generate();
            if (element.children && element.children.length > 0)
                me.createData(element.children);
        }, this);
    }

    getPropsFromStores() {
        return {
            ...{
                columnDefs: [
                    {
                        headerName: "Name", field: "name", width: 250, cellRenderer: 'group', cellRendererParams: {
                            innerRenderer: this.innerCellRenderer.bind(this)
                        }
                    },
                    { headerName: "Size", field: "size", width: 70, editable: true, cellRendererFramework: EditableTextBox },
                    { headerName: "Type", field: "type", width: 150, cellRendererFramework: EditableTextBox },
                    { headerName: "Date Modified", field: "dateModified", width: 150, cellRendererFramework: EditableTextBox }
                ],
                data: data
            }
        };
    }

    createNewRow() {
        return {
            name: '',
            size: '',
            type: '',
            dateModified: ''
        }
    }

    componentDidMount() {
        this.viewport = ReactDOM.findDOMNode(this.refs.aggridnested)
            .querySelector('.ag-body-viewport');
        PerfectScrollbar.initialize(this.viewport);
    }

    onGridReady(params) {
        this._api = params.api;
        this._columnApi = params.columnApi;
    }

    getNodeChildDetails(file) {
        if (file.folder) {
            return {
                group: true,
                children: file.children,
                expanded: file.open
            };
        } else {
            return null;
        }
    }

    innerCellRenderer(params) {
        return '<input type="text" style="width:100%" value="' + params.data.name + '" />';
    }

    addRow(params) {
        let folder = this.findFolder(params.node.data.id, { children: data });
        let newFile = {
            name: '', size: '', type: '', dateModified: '', id: shortid.generate()
        };
        folder.children.push(newFile);
        folder.open = true;
        this._api.setRowData(data);
    }

    deleteRow(params) {
        this.deleteItem(params.node.data.id, { children: data });
    }

    deleteItem(id, params) {
        var me = this;
        var item = find(params.children, { id: id });
        if (!item && params.children && params.children.length > 0) {
            for (var i = 0; i < params.children.length; i++) {
                this.deleteItem(id, params.children[i]);
            }
        } else {
            if (item) {
                var index = params.children.indexOf(item);
                params.children.splice(index, 1);
                this._api.setRowData(data);
            }
        }
    }

    findFolder(id, data) {
        var me = this;
        var item = find(data.children, { id: id });
        if (!item && data.children && data.children.length > 0) {
            for (var i = 0; i < data.children.length; i++) {
                var folder = this.findFolder(id, data.children[i]);
                if (folder) {
                    return folder;
                }
            }
        } else if (item && item.folder) {
            return item;
        } else if (item) {
            return data;
        }
    }

    getContextMenuItems(params) {
        var me = this;
        var result = [
            {
                name: 'Add Row',
                action: function () { me.addRow(params) }

            },
            {
                name: 'Delete Row',
                action: function () { me.deleteRow(params) }
            }
        ];

        return result;
    }

    render() {

        const styles = {
            grid: {
                height: '100%',
                paddingBottom: '40px'
            }
        };

        const gridOptions = {
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            rowSelection: 'multiple',
            rowHeight: '22',
            getContextMenuItems: this.getContextMenuItems.bind(this),
            enableGroupEdit: true
        };
        return (
            <div style={styles.grid} className="ag-dark" {...this.props}>
                <h3 className="grid-item-header">
                    Nested Tree Grid
                </h3>
                <AgGridReact
                    ref="aggridnested"
                    onGridReady={this.onGridReady.bind(this)}
                    gridOptions={gridOptions}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.data}
                    getNodeChildDetails={this.getNodeChildDetails.bind(this)} >
                </AgGridReact>
            </div>
        );
    }
}