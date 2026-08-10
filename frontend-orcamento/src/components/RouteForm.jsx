import { useMemo, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { buscarCidades } from "../services/routeService";
import { CORES } from "../theme";

function useBuscaCidades() {
  const [opcoes, setOpcoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const timeoutRef = useRef(null);

  const buscar = (consulta) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!consulta || consulta.trim().length < 3) {
      setOpcoes([]);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      setCarregando(true);
      try {
        const resultado = await buscarCidades(consulta);
        setOpcoes(resultado);
      } finally {
        setCarregando(false);
      }
    }, 400);
  };

  return { opcoes, carregando, buscar };
}

function CampoLocal({ rotulo, cor, valor, aoMudar }) {
  const { opcoes, carregando, buscar } = useBuscaCidades();

  return (
    <Stack spacing={0.75}>
      <Typography variant="body2" sx={{ color: CORES.textoPrincipal, fontWeight: 600 }}>
        {rotulo}
      </Typography>
      <Autocomplete
        value={valor}
        onChange={(_evento, novoValor) => aoMudar(novoValor)}
        onInputChange={(_evento, texto, motivo) => {
          if (motivo === "input") {
            buscar(texto);
          }
        }}
        options={opcoes}
        loading={carregando}
        getOptionLabel={(opcao) => opcao?.rotulo || ""}
        isOptionEqualToValue={(opcao, item) => opcao.id === item.id}
        noOptionsText="Digite ao menos 3 letras"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Cidade de origem ou destino"
            InputProps={{
              ...params.InputProps,
              startAdornment: <LocationOnIcon sx={{ color: cor, fontSize: 20, mr: 0.5 }} />,
              endAdornment: (
                <>
                  {carregando ? <CircularProgress color="inherit" size={16} /> : null}
                  {valor && (
                    <IconButton size="small" onClick={() => aoMudar(null)} sx={{ mr: 2 }}>
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                </>
              )
            }}
          />
        )}
      />
    </Stack>
  );
}

export default function RouteForm({ origem, destino, aoMudarOrigem, aoMudarDestino, aoInverter, aoCalcular, calculando }) {
  const podeCalcular = useMemo(() => Boolean(origem && destino), [origem, destino]);

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: "16px" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, mb: 2.5, color: CORES.textoPrincipal }}>
        Dados da Rota
      </Typography>

      <Stack direction="row" spacing={1.5} alignItems="flex-end">
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <CampoLocal rotulo="Origem" cor={CORES.origem} valor={origem} aoMudar={aoMudarOrigem} />
          <CampoLocal rotulo="Destino" cor={CORES.destino} valor={destino} aoMudar={aoMudarDestino} />
        </Stack>

        <IconButton
          onClick={aoInverter}
          sx={{
            border: `1px solid ${CORES.borda}`,
            borderRadius: "10px",
            mb: 0.5,
            color: CORES.textoSecundario
          }}
        >
          <SwapVertIcon />
        </IconButton>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        disabled={!podeCalcular || calculando}
        onClick={aoCalcular}
        startIcon={calculando ? <CircularProgress size={18} color="inherit" /> : <AltRouteIcon />}
        sx={{
          mt: 3,
          height: 48,
          borderRadius: "10px",
          backgroundColor: CORES.primaria,
          fontWeight: 700,
          letterSpacing: "0.03em",
          "&:hover": { backgroundColor: "#1D4ED8" }
        }}
      >
        {calculando ? "CALCULANDO..." : "CALCULAR ROTA"}
      </Button>
    </Paper>
  );
}
