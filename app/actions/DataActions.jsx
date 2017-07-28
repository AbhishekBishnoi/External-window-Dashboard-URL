import cloneDeep from "lodash/cloneDeep";

export function updateGrid(users) {
    return {
        type: 'UPDATE_GRID',
        rowData: cloneDeep(users)
    };
}

