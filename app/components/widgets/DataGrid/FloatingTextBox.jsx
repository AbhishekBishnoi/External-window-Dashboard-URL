
let FloatingTextBox = function () { };
let cursorPos;
FloatingTextBox.prototype.init = function (params) {
    this.onFloatingFilterChanged = params.onFloatingFilterChanged;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = "<input id='float-asset' type='text'></input>";
    this.currentValue = null;
    this.eFilterInput = this.eGui.querySelector('input#float-asset');
    var that = this;
    function onInputBoxChanged() {
        if (that.eFilterInput.value === '') {
            that.onFloatingFilterChanged({});
            return;
        }

        that.currentValue = that.eFilterInput.value;
        cursorPos = that.eFilterInput.selectionStart;
        that.onFloatingFilterChanged({
            model: {
                filter: that.currentValue,
                filterType: 'text',
                type: 'contains'

            }
        });
    }
    this.eFilterInput.addEventListener('input', onInputBoxChanged);
}
FloatingTextBox.prototype.onParentModelChanged = function (parentModel) {
    if (!parentModel) {
        this.eFilterInput.value = '';
        this.currentValue = null;
    } else {
        this.eFilterInput.value = parentModel.filter;
        this.currentValue = parentModel.filter;
        this.eFilterInput.setSelectionRange(cursorPos, cursorPos);
    }
};

FloatingTextBox.prototype.getGui = function () {
    return this.eGui;
};

module.exports = FloatingTextBox;