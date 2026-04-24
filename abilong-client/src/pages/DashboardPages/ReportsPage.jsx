import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Button from '../../components/Button';

const quarterlyData = {
    series1: [35, 44, 24, 34],
    series2: [51,  6, 49, 30],
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
};

const distributionData = [
    { id: 0, value: 10, label: 'Series A' },
    { id: 1, value: 15, label: 'Series B' },
    { id: 2, value: 20, label: 'Series C' },
];

const trendData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [20, 35, 28, 50, 42, 60],
};

const ReportsPage = () => (
    <div className="pb-10">

        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
                
                <h1 className="mt-1 text-3xl font-bold" style={{ color: '#0f0f1a' }}>Reports</h1>
                
            </div>
           
        </div>

        
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr] mb-5">

            {/* Bar Chart */}
            <div className="glass-card glow-border-hover rounded-[1.25rem] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'rgba(15,15,26,0.45)' }}>
                    Sales Data
                </p>
                <h2 className="mt-1 text-lg font-bold" style={{ color: '#0f0f1a' }}>Quarterly Sales</h2>
                <p className="mt-0.5 text-sm mb-4" style={{ color: 'rgba(15,15,26,0.45)' }}>
                    Series 1 vs Series 2 across Q1–Q4.
                </p>
                <BarChart
                    series={[
                        { data: quarterlyData.series1, label: 'Series 1' },
                        { data: quarterlyData.series2, label: 'Series 2' },
                    ]}
                    height={260}
                    xAxis={[{ data: quarterlyData.quarters, scaleType: 'band', label: 'Quarters' }]}
                />
            </div>

         
            <div className="glass-card glow-border-hover rounded-[1.25rem] p-6 flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'rgba(15,15,26,0.45)' }}>
                    Distribution
                </p>
                <h2 className="mt-1 text-lg font-bold" style={{ color: '#0f0f1a' }}>Series Split</h2>
                <p className="mt-0.5 text-sm mb-2" style={{ color: 'rgba(15,15,26,0.45)' }}>
                    Proportional share per series.
                </p>
                <div className="flex flex-1 items-center justify-center">
                    <PieChart
                        series={[{
                            data: distributionData,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            innerRadius: 52,
                            paddingAngle: 3,
                            cornerRadius: 5,
                        }]}
                        width={260}
                        height={260}
                    />
                </div>
            </div>

        </div>

        
        <div className="glass-card glow-border-hover rounded-[1.25rem] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'rgba(15,15,26,0.45)' }}>
                Growth
            </p>
            <h2 className="mt-1 text-lg font-bold" style={{ color: '#0f0f1a' }}>Monthly Trend</h2>
            <p className="mt-0.5 text-sm mb-4" style={{ color: 'rgba(15,15,26,0.45)' }}>
                Overall platform growth across the first half of the year.
            </p>
            <LineChart
                series={[{ data: trendData.values, label: 'Growth', area: true, showMark: true }]}
                xAxis={[{ data: trendData.months, scaleType: 'point' }]}
                height={220}
                sx={{ '& .MuiAreaElement-root': { fillOpacity: 0.12 } }}
            />
        </div>

    </div>
);

export default ReportsPage;