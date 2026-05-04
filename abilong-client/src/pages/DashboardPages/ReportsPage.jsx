import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName',  headerName: 'Last name',  width: 150, editable: true },
    { field: 'age',       headerName: 'Age', type: 'number', width: 100, editable: true },
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow',       firstName: 'Jon',      age: 35 },
    { id: 2, lastName: 'Lannister',  firstName: 'Cersei',   age: 42 },
    { id: 3, lastName: 'Lannister',  firstName: 'Jaime',    age: 45 },
    { id: 4, lastName: 'Stark',      firstName: 'Arya',     age: 16 },
    { id: 5, lastName: 'Targaryen',  firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null,        age: 150 },
    { id: 7, lastName: 'Clifford',   firstName: 'Ferrara',  age: 44 },
    { id: 8, lastName: 'Frances',    firstName: 'Rossini',  age: 36 },
    { id: 9, lastName: 'Roxie',      firstName: 'Harvey',   age: 65 },
];


const secondaryBtnSx = {
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: '50px',
    px: 2.5,
    py: 1,
    fontSize: 14,
    borderColor: 'rgba(15,15,26,0.18)',
    color: '#374151',
    transition: 'all 0.2s ease',
    '&:hover': {
        bgcolor: '#f3f4f6',
        borderColor: 'rgba(15,15,26,0.32)',
        transform: 'translateY(-1px)',
    },
    '&:active': { transform: 'translateY(0)' },
};

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Print Report &mdash; School</title>
                    ${headMarkup}
                    <style>
                        @page { size: A4; margin: 15mm; }
                        * { box-sizing: border-box; }
                        body {
                            margin: 0;
                            font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
                            background: #fff;
                            color: #111827;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .report-header {
                            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
                            color: #fff;
                            padding: 24px 28px 20px;
                            border-radius: 8px;
                            margin-bottom: 20px;
                        }
                        .header-inner {
                            display: flex;
                            align-items: flex-start;
                            justify-content: space-between;
                            gap: 24px;
                        }
                        .header-left h1 { margin: 0 0 6px; font-size: 24px; font-weight: 700; }
                        .header-left p  { margin: 0; font-size: 12px; color: rgba(255,255,255,0.82); line-height: 1.5; max-width: 420px; }
                        .header-right   { text-align: right; flex-shrink: 0; }
                        .report-badge {
                            display: inline-block;
                            background: rgba(255,255,255,0.2);
                            border: 1px solid rgba(255,255,255,0.35);
                            color: #fff;
                            padding: 3px 10px;
                            border-radius: 4px;
                            font-size: 9px;
                            font-weight: 700;
                            letter-spacing: 1.5px;
                            margin-bottom: 8px;
                        }
                        .header-right p { margin: 0; font-size: 11px; color: rgba(255,255,255,0.75); }
                        .kpi-row { display: flex; gap: 12px; margin-bottom: 20px; }
                        .kpi-card {
                            flex: 1;
                            background: #fff;
                            border: 1px solid #e2e8f0;
                            border-radius: 8px;
                            padding: 12px 10px;
                            text-align: center;
                        }
                        .kpi-card.accent { background: #eff6ff; border-color: #93c5fd; }
                        .kpi-value { font-size: 24px; font-weight: 700; color: #1e3a8a; line-height: 1; margin-bottom: 4px; }
                        .kpi-label { font-size: 10px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.6px; }
                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 1px solid #e2e8f0 !important;
                            border-radius: 8px !important;
                            break-inside: avoid;
                            page-break-inside: avoid;
                            margin-bottom: 16px;
                            background: #fff !important;
                        }
                        .report-content .MuiCardContent-root { padding: 18px 20px !important; }
                        .report-content .MuiTypography-h6 {
                            color: #1e40af !important;
                            font-size: 14px !important;
                            font-weight: 600 !important;
                            border-bottom: 2px solid #dbeafe;
                            padding-bottom: 8px !important;
                            margin-bottom: 8px !important;
                        }
                        .report-content svg { max-width: 100%; }
                        .report-footer {
                            margin-top: 20px;
                            padding-top: 12px;
                            border-top: 1px solid #e2e8f0;
                            display: flex;
                            justify-content: space-between;
                            font-size: 10px;
                            color: #94a3b8;
                        }
                        .report-footer strong { color: #64748b; }
                    </style>
                </head>
                <body>
                    <header class="report-header">
                        <div class="header-inner">
                            <div class="header-left">
                                <h1>Reports Summary</h1>
                                <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
                            </div>
                            <div class="header-right">
                                <div class="report-badge">OFFICIAL REPORT</div>
                                <p>Prepared on ${exportedAt}</p>
                            </div>
                        </div>
                    </header>
                    <div class="kpi-row">
                        <div class="kpi-card"><div class="kpi-value">89</div><div class="kpi-label">Total Generated</div></div>
                        <div class="kpi-card"><div class="kpi-value">71</div><div class="kpi-label">Total Completed</div></div>
                        <div class="kpi-card accent"><div class="kpi-value">78%</div><div class="kpi-label">Completion Rate</div></div>
                        <div class="kpi-card"><div class="kpi-value">4</div><div class="kpi-label">Categories</div></div>
                    </div>
                    <section class="report-content">${printContent.innerHTML}</section>
                    <footer class="report-footer">
                        <span><strong>School Management System</strong> &mdash; Confidential</span>
                        <span>Exported: ${exportedAt}</span>
                    </footer>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Box>
            
            <Paper
                elevation={0}
                sx={{
                    px: 3.5,
                    pt: 3,
                    pb: 2.75,
                    mb: 2.5,
                    border: '1px solid rgba(15,15,26,0.07)',
                    borderRadius: 2.5,
                    bgcolor: '#fff',
                    boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
                }}
            >
                <Stack direction="row" alignItems="center" gap={2}>
                    <Typography
                        variant="h5"
                        sx={{ flex: 1, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}
                    >
                        Reports
                    </Typography>

                    <Stack direction="row" spacing={1.5} flexShrink={0} flexWrap="wrap" useFlexGap>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '50px',
                                px: 3,
                                py: 1,
                                fontSize: 14,
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                                boxShadow: '0 4px 14px rgba(37,99,235,0.28)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                                    boxShadow: '0 6px 20px rgba(37,99,235,0.42)',
                                    transform: 'translateY(-1px)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
                                },
                            }}
                        >
                            Generate
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadOutlinedIcon />}
                            onClick={handlePrint}
                            sx={secondaryBtnSx}
                        >
                            Export PDF
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListOutlinedIcon />}
                            sx={secondaryBtnSx}
                        >
                            Filter
                        </Button>
                    </Stack>
                </Stack>

                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>
                    Analytics overview — generated reports, category breakdown, and completion performance.
                </Typography>
            </Paper>

            
            <Stack ref={printRef} spacing={3}>
                <Card elevation={0} sx={{ border: '1px solid rgba(15,15,26,0.08)', borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ pl: 1.5, borderLeft: '3px solid #2563eb', mb: 2.5 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ color: '#0f0f1a' }}>
                                Monthly Report Output
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Compares generated vs. completed reports across the last four months.
                            </Typography>
                        </Box>
                        <BarChart
                            series={[
                                { data: [18, 24, 20, 27], label: 'Generated' },
                                { data: [12, 19, 17, 23], label: 'Completed' },
                            ]}
                            height={300}
                            xAxis={[{
                                data: ['January', 'February', 'March', 'April'],
                                scaleType: 'band',
                                label: 'Months',
                            }]}
                        />
                    </CardContent>
                </Card>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                    <Card elevation={0} sx={{ flex: 1, border: '1px solid rgba(15,15,26,0.08)', borderRadius: 2 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ pl: 1.5, borderLeft: '3px solid #7c3aed', mb: 2.5 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ color: '#0f0f1a' }}>
                                    Report Category Share
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Distribution of report requests by category for the current period.
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PieChart
                                    series={[{
                                        data: [
                                            { id: 0, value: 14, label: 'Sales' },
                                            { id: 1, value: 10, label: 'Users' },
                                            { id: 2, value: 8,  label: 'Inventory' },
                                            { id: 3, value: 6,  label: 'Finance' },
                                        ],
                                    }]}
                                    height={280}
                                    width={220}
                                />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card elevation={0} sx={{ flex: 1, border: '1px solid rgba(15,15,26,0.08)', borderRadius: 2 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ pl: 1.5, borderLeft: '3px solid #059669', mb: 2.5 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ color: '#0f0f1a' }}>
                                    Completion Rate
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Percentage of reports completed out of total generated.
                                </Typography>
                            </Box>
                            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Gauge width={180} height={180} value={78} />
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>

                <Card elevation={0} sx={{ border: '1px solid rgba(15,15,26,0.08)', borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ pl: 1.5, borderLeft: '3px solid #0891b2', mb: 2.5 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ color: '#0f0f1a' }}>
                                Report Records
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Detailed breakdown of individual report entries.
                            </Typography>
                        </Box>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: 13, color: '#374151' },
                            }}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
};

export default ReportsPage;
