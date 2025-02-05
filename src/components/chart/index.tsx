import React, { PureComponent } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default class MyChart extends PureComponent {
    render() {
        return (
            <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient
                        id="colorUv"
                        x1="348.692"
                        y1="0"
                        x2="348.692"
                        y2="221.559"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#CEDDFF" />
                        <stop
                            offset="1"
                            stop-color="#CEDDFF"
                            stop-opacity="0"
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#EAEAEC" vertical={false} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#5185F7"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        );
    }
}
