import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { CORES } from "../theme";

function formatarKm(valor) {
  if (valor == null) {
    return "—";
  }
  return `${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} km`;
}

export default function RouteSummary({ distanciaKm }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: "16px" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: CORES.textoPrincipal }}>
        Resumo da Rota
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <MapOutlinedIcon sx={{ fontSize: 18, color: CORES.textoSecundario }} />
          <Typography variant="body2" sx={{ color: CORES.textoSecundario, fontWeight: 500 }}>
            Distância
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: 700, color: CORES.textoPrincipal }}>{formatarKm(distanciaKm)}</Typography>
      </Stack>
    </Paper>
  );
}
