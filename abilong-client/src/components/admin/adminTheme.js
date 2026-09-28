import { createTheme } from '@mui/material/styles';

// Dashboard theme — matches the portfolio's cyan → purple brand on a light workspace.
export const gradient = 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)';

export const gradientButtonSx = {
    background: gradient,
    color: '#fff',
    '&:hover': { background: gradient, boxShadow: '0 0 18px rgba(0,212,255,0.45)' },
    '&.Mui-disabled': { background: 'rgba(15,15,26,0.1)', color: 'rgba(15,15,26,0.35)' },
};

const adminTheme = createTheme({
    palette: {
        primary: { main: '#0891b2', dark: '#0e7490', light: '#22d3ee', contrastText: '#fff' },
        secondary: { main: '#a855f7', contrastText: '#fff' },
        background: { default: '#f5f5fa', paper: '#ffffff' },
        text: { primary: '#0f0f1a', secondary: '#5b5b6e' },
        divider: 'rgba(15,15,26,0.08)',
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' },
        h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.01em' },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: { root: { borderRadius: 999 } },
        },
        MuiTextField: { defaultProps: { size: 'small' } },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,15,26,0.14)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,15,26,0.3)' },
                },
            },
        },
        MuiPaper: { styleOverrides: { outlined: { borderColor: 'rgba(15,15,26,0.08)' } } },
        MuiAccordion: {
            defaultProps: { disableGutters: true, elevation: 0 },
            styleOverrides: {
                root: {
                    border: '1px solid rgba(15,15,26,0.1)',
                    borderRadius: '14px !important',
                    '&::before': { display: 'none' },
                    '&.Mui-expanded': { borderColor: 'rgba(8,145,178,0.45)', boxShadow: '0 6px 24px -12px rgba(8,145,178,0.35)' },
                },
            },
        },
        MuiTooltip: { defaultProps: { arrow: true } },
        MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    },
});

export default adminTheme;
