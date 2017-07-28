import cloneDeep from "lodash/cloneDeep";
export default (state = { rowData: [] }, action) => {
    switch (action.type) {
        case 'UPDATE_GRID':
            return {
                ...state,
                rowData: action.rowData,
            };
        default:
            return { ...action.state };
    }
};