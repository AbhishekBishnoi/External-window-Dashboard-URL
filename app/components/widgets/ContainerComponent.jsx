import React from 'react';
import { ContainerQuery } from 'react-container-query';
import classnames from 'classnames';

export default class ContainerQComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const query = {
            'width-between-200-and-399': {
                minWidth: 200,
                maxWidth: 399
            },
            'width-larger-than-400': {
                minWidth: 400
            }
        };
        const items = [1, 2, 3, 4].map((item, index) => {
            return <div key={index}><p>{'Item:' + item}</p></div>
        });
        return (
            <ContainerQuery query={query}>
                {(params) => (
                    <div className={classnames(params)}>{items}</div>
                )}
            </ContainerQuery>
        );
    }
}
