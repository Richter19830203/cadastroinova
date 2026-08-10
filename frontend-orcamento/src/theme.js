import { createTheme } from "@mui/material/styles";

export const CORES = {
  background: "#F5F7FA",
  card: "#FFFFFF",
  primaria: "#2563EB",
  textoPrincipal: "#111827",
  textoSecundario: "#6B7280",
  borda: "#E5E7EB",
  origem: "#16A34A",
  destino: "#DC2626"
};

const theme = createTheme({
  palette: {
    background: {
      default: CORES.background,
      paper: CORES.card
    },
    primary: {
      main: CORES.primaria
    },
    text: {
      primary: CORES.textoPrincipal,
      secondary: CORES.textoSecundario
    },
    divider: CORES.borda
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
    "0 1px 3px 0 rgba(16, 24, 40, 0.08), 0 1px 2px -1px rgba(16, 24, 40, 0.06)",
    ...Array(22).fill("0 4px 10px -2px rgba(16, 24, 40, 0.08), 0 2px 4px -2px rgba(16, 24, 40, 0.06)")
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;
