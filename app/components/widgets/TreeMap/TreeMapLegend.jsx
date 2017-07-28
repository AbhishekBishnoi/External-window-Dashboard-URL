import React from 'react';
export default class TreeMapLegend extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = {
            colorsvg: {
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '4px'
            },
            colorbox: {
                display: 'inline-block',
                marginRight: '10px'
            },
            colorpanel:{
                textAlign:'center'
            }
        };
        return (
            <ul className="recharts-default-legend" style={styles.colorpanel}>
                <li className="recharts-legend-item" style={styles.colorbox}>
                    <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={styles.colorbox}><path stroke="none" fill="#ff4b1f" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path></svg>
                    <span>> 10%</span>
                </li>
                <li className="recharts-legend-item" style={styles.colorbox}>
                    <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={styles.colorbox}><path stroke="none" fill="#feb645" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path></svg>
                    <span> &gt; 5% and &lt; 10%</span>
                </li>
                <li className="recharts-legend-item" style={styles.colorbox}>
                    <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={styles.colorbox}><path stroke="none" fill="#56ab2f" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path></svg>
                    <span>&gt; -5% &lt; -10%</span>
                </li>
                <li className="recharts-legend-item" style={styles.colorbox}>
                    <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={styles.colorbox}><path stroke="none" fill="#414d0b" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path></svg>
                    <span>&lt; -10%</span>
                </li>
            </ul>);
    }
}