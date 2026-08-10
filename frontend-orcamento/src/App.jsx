import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import NovoOrcamento from "./pages/NovoOrcamento";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NovoOrcamento />
    </ThemeProvider>
  );
}
