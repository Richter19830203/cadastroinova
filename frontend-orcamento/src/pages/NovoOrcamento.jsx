import { useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Sidebar, { ITENS_MENU } from "../components/Sidebar";
import Header from "../components/Header";
import RouteForm from "../components/RouteForm";
import RouteSummary from "../components/RouteSummary";
import RouteMap from "../components/RouteMap";
import BlankPanel from "../components/BlankPanel";
import PlaceholderSection from "../components/PlaceholderSection";
import { calcularRota } from "../services/routeService";
import { CORES } from "../theme";

const TEXTOS_PLACEHOLDER = {
  orcamentos:
    "O cadastro completo de orçamentos (cliente, produtos, tipo de veículo, valor, status, proposta comercial, listagem com filtros) continua no formulário atual — esta tela nova cuida só do cálculo de rota, à parte.",
  cadastro:
    "Já existe hoje, com os cadastros de Clientes, Motoristas, Responsáveis, Tipos de Serviço e Veículos — ainda no formato atual, não portado pro layout novo.",
  financeiro: "Já existe hoje no sistema atual — ainda não portado pro layout novo.",
  graficos: "Já existe hoje no sistema atual — ainda não portado pro layout novo."
};

function secaoInicialDaUrl() {
  if (typeof window === "undefined") {
    return "orcamentos";
  }
  const chave = new URLSearchParams(window.location.search).get("secao");
  return ITENS_MENU.some((item) => item.chave === chave) ? chave : "orcamentos";
}

export default function NovoOrcamento() {
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [secaoAtiva, setSecaoAtiva] = useState(secaoInicialDaUrl);
  const itemSecaoAtiva = ITENS_MENU.find((item) => item.chave === secaoAtiva) || ITENS_MENU[0];
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [distanciaKm, setDistanciaKm] = useState(null);
  const [geometria, setGeometria] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erro, setErro] = useState("");

  const inverterOrigemDestino = () => {
    setOrigem(destino);
    setDestino(origem);
    setDistanciaKm(null);
    setGeometria(null);
  };

  const calcularRotaAtual = async () => {
    if (!origem || !destino) {
      return;
    }
    setCalculando(true);
    setErro("");
    try {
      const resultado = await calcularRota(origem, destino);
      setDistanciaKm(resultado.distanciaKm);
      setGeometria(resultado.geometria || null);
    } catch (excecao) {
      const mensagem = excecao?.response?.data?.error || "Não foi possível calcular a rota agora.";
      setErro(mensagem);
    } finally {
      setCalculando(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: CORES.background }}>
      <Sidebar aberta={sidebarAberta} secaoAtiva={secaoAtiva} aoSelecionarSecao={setSecaoAtiva} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Header aoAlternarSidebar={() => setSidebarAberta((valor) => !valor)} secaoAtiva={itemSecaoAtiva} />

        <Box sx={{ p: 3 }}>
          {secaoAtiva === "calculo-rotas" ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "28% 1fr" },
                  gap: "20px"
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <RouteForm
                    origem={origem}
                    destino={destino}
                    aoMudarOrigem={(valor) => {
                      setOrigem(valor);
                      setDistanciaKm(null);
                      setGeometria(null);
                    }}
                    aoMudarDestino={(valor) => {
                      setDestino(valor);
                      setDistanciaKm(null);
                      setGeometria(null);
                    }}
                    aoInverter={inverterOrigemDestino}
                    aoCalcular={calcularRotaAtual}
                    calculando={calculando}
                  />
                  <RouteSummary distanciaKm={distanciaKm} />
                </Box>

                <RouteMap origem={origem} destino={destino} geometria={geometria} />
              </Box>

              <Box sx={{ mt: "20px" }}>
                <BlankPanel />
              </Box>
            </>
          ) : (
            <PlaceholderSection
              rotulo={itemSecaoAtiva.rotulo}
              Icone={itemSecaoAtiva.Icone}
              texto={TEXTOS_PLACEHOLDER[secaoAtiva]}
            />
          )}
        </Box>
      </Box>

      <Snackbar open={Boolean(erro)} autoHideDuration={5000} onClose={() => setErro("")}>
        <Alert severity="error" onClose={() => setErro("")}>
          {erro}
        </Alert>
      </Snackbar>
    </Box>
  );
}
