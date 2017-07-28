import map from 'lodash/map';
import random from 'lodash/random';
import Sparkline from './Sparklines.jsx';
import classnames from 'classnames';

import FloatingTextBox from './FloatingTextBoxV2.jsx';
import SelectFilter from './SelectFilter.jsx';
import SelectCheckbox from './SelectCheckbox.jsx';
import Progress from './Progress.jsx';
import DropDownFilter from './FloatingDropDown.jsx';


const columns = [
    '#',
    'Position ID',
    'Portfolio',
    'Type',
    'Progress',
    'Asset Class',
    'Description',
    'Price',
    'PnL',
    'History',
    'Instrument',
    'Position',
    'Currency',
    'NPV',
    'IR Delta',
    'FX Delta',
    'Opening Price',
    'Price CoD',
    'Opening NPV',
    'NPV CoD',
    '$ VaR',
    // 'Underlying',
    // 'Underlying CoD',
    // 'Opening Underl',
    // 'Bought Qty',
    // 'Bought Price',
    // 'Sold Qty',
    // 'Sold Price',
    // 'Maturity',
    // 'Delta',
    // 'Gamma',
    // 'Theta',
    // 'Vega',
    // 'Delta Explain',
    // 'Gamma Explain',
    // 'Theta Explain',
    // 'Vega Explain',
    // 'Total Explain',
    // '$ NAV',
    // '$ Open NAV',
    // '$ Cash',
    // '$ Open Cash',
    // 'Plane',
    // 'In Price',
    // 'Opening Pos'
];
const numberCols = [
    'Price',
    'PnL',
    'NPV',
    'IR Delta',
    'FX Delta',
    'Opening Price',
    'Price CoD',
    'Opening NPV',
    'NPV CoD',
    '$ VaR',
    'Underlying',
    'Underlying CoD',
    'Opening Underl',
    'Bought Qty',
    'Bought Price',
    'Sold Qty',
    'Sold Price',
    'Delta',
    'Gamma',
    'Theta',
    'Vega',
    'Delta Explain',
    'Gamma Explain',
    'Theta Explain',
    'Vega Explain',
    'Total Explain',
    '$ NAV',
    '$ Open NAV',
    '$ Cash',
    '$ Open Cash',
    'In Price',
    'Opening Pos'

];


export default class ColDefFactory {

    numberRenderer(params) {
        if (params.value != '-' && params.value && params.value != "") {
            let val = params.value.toString().replace(',/g', '')
            let cls = classnames({
                'negative-red': parseFloat(val) < 0.00
            });
            return "<span class='" + cls + "'>" + Number(parseFloat(val).toFixed(2)).toLocaleString('en') + "</span>";
        } else if (!params.node.floating) {
            return "<span>0</span>";
        } else {
            return null;
        }
    }

    priceTotalRenderer(params) {
        if (params.value)
            return "<span>" + params.value + "</span>";
        else
            return null;
    }

    createColDefs() {
        let me = this;
        let columnDefs = map(columns, function (column) {
            let colDef = {
                headerName: column,
                field: column,
                enableRowGroup: true,
                filter: 'set',
                // floatingCellRenderer: me.priceTotalRenderer
            };
            if (numberCols.indexOf(column) >= 0)
                colDef.cellRenderer = me.numberRenderer;

            if (column == 'History') {
                colDef.cellRendererFramework = Sparkline;
            }
            if (column == 'Type') {
                colDef.filter = 'text';
                colDef.floatingFilterComponent = DropDownFilter;
                colDef.floatingFilterComponentParams = {
                    suppressFilterButton: true
                };
            }
            if (column == "Asset Class") {
                colDef.filter = "text";
                colDef.rowGroupIndex = 1;
                colDef.floatingFilterComponentFramework = FloatingTextBox;
                colDef.floatingFilterComponentParams = {
                    suppressFilterButton: true
                };
            }
            if (column == "Currency") {
                colDef.pivotIndex = 1;
            }
            if (column == "Price") {
                colDef.aggFunc = 'sum';
            }
            if (column == 'Progress') {
                colDef.suppressMenu = true;
                colDef.cellRendererFramework = Progress;
            }
            if (column == '#') {
                colDef.cellRendererFramework = SelectCheckbox;
                colDef.suppressMenu = true;
                colDef.colId = 'chk_select';
                colDef.suppressFilter = true;
                colDef.width = 80;
                colDef.pinned = true;
                colDef.toolPanelClass = 'tp-hide';
            }
            return colDef;
        });

        return columnDefs;
    }
}