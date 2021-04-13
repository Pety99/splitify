import /*makeStyles*/ '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';

const useStyles = makeStyles(() => ({
    root: {
        //        minHeight: 0,
        //        height: 'min(calc(100vh - 400px), 100vh)',
        width: '100%',
        maxHeight: 'min(500px, calc(100vh - 400px))',
        maxWidth: 400,
        aspectRatio: '1',
    },
}));

function Chart({ data, currency }) {
    const format = (value) => {
        return value.toFixed(2) + getSymbolFromCurrency(currency);
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
                valueFormat={format}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={3}
                colors={{ scheme: 'pastel2' }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={0}
                radialLabelsTextColor="#333333"
                radialLabelsLinkHorizontalLength={16}
                radialLabelsLinkStrokeWidth={0}
                radialLabelsLinkColor={{ from: 'color', modifiers: [] }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'ruby',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'c',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'go',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'python',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'scala',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'lisp',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'elixir',
                        },
                        id: 'lines',
                    },
                    {
                        match: {
                            id: 'javascript',
                        },
                        id: 'lines',
                    },
                ]}
                legends={[]}
            />
        </div>
    );
}

Chart.propTypes = {
    data: PropTypes.object,
    currency: PropTypes.string,
};

export default Chart;
