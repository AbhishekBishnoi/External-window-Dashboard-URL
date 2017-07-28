
let DropDownFilter = function () { };
DropDownFilter.prototype.init = function (params) {
    this.onFloatingFilterChanged = params.onFloatingFilterChanged;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = "<select><option value=''>All</option><option value='booked'>Booked</option><option value='whatIf'>whatIf</option></select>";
    this.currentValue = null;
    this.eFilterInput = this.eGui.querySelector('select');
    var that = this;
    function onInputBoxChanged() {
        if (that.eFilterInput.value === '') {
            that.onFloatingFilterChanged({});
            return;
        }

        that.currentValue = that.eFilterInput.value;
        that.onFloatingFilterChanged({
            model: {
                filter: that.currentValue,
                filterType: 'text',
                type: 'contains'

            }
        });
    }
    this.eFilterInput.addEventListener('change', onInputBoxChanged);
}
DropDownFilter.prototype.onParentModelChanged = function (parentModel) {
    if (!parentModel) {
        this.eFilterInput.value = '';
        this.currentValue = null;
    } else {
        this.eFilterInput.value = parentModel.filter;
        this.currentValue = parentModel.filter;
    }
};

DropDownFilter.prototype.getGui = function () {
    return this.eGui;
};

module.exports = DropDownFilter;