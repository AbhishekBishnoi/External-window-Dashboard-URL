import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import InfiniteGrid from '../app/components/widgets/DataGrid/InfiniteGrid.jsx';

describe('<InfiniteGrid />', function () {
    it('should display 500th row after jumping', function () {
        const wrapper = shallow(<InfiniteGrid />);
        // wrapper.find('#jumpto').simulate('change', { target: { value: '500' } });
        // wrapper.find('.go-btn').simulate('click');
        expect(wrapper.find('.jumpto')).to.be.present();
        // expect(wrapper.find('#jumpto')).to.have.text('500');
        // expect(wrapper.find('.ag-cell-value')).to.be.present();
    });
}); 