import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SIDEBAR_WIDTH = 240;

const ITENS_PRINCIPAL = [
  { chave: "dashboard", rotulo: "Dashboard", Icone: DashboardOutlinedIcon },
  { chave: "orcamentos", rotulo: "Orçamentos", Icone: AltRouteOutlinedIcon },
  { chave: "fretes", rotulo: "Fretes", Icone: LocalShippingOutlinedIcon },
  { chave: "viagens", rotulo: "Viagens", Icone: MapOutlinedIcon },
  { chave: "clientes", rotulo: "Clientes", Icone: PeopleOutlinedIcon },
  { chave: "veiculos", rotulo: "Veículos", Icone: DirectionsCarOutlinedIcon },
  { chave: "motoristas", rotulo: "Motoristas", Icone: Person4OutlinedIcon },
  { chave: "financeiro", rotulo: "Financeiro", Icone: PaidOutlinedIcon },
  { chave: "relatorios", rotulo: "Relatórios", Icone: BarChartOutlinedIcon }
];

const ITENS_CONFIGURACOES = [
  { chave: "cadastros", rotulo: "Cadastros", Icone: AppRegistrationOutlinedIcon, temSubmenu: true },
  { chave: "tabelas", rotulo: "Tabelas", Icone: TableChartOutlinedIcon },
  { chave: "usuarios", rotulo: "Usuários", Icone: GroupOutlinedIcon },
  { chave: "configuracoes", rotulo: "Configurações", Icone: SettingsOutlinedIcon },
  { chave: "ajuda", rotulo: "Ajuda", Icone: HelpOutlineOutlinedIcon }
];

const ITENS_MENU = [...ITENS_PRINCIPAL, ...ITENS_CONFIGURACOES];

function ItemMenu({ chave, rotulo, Icone, temSubmenu, ativo, aoSelecionar }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      role="button"
      tabIndex={0}
      onClick={() => aoSelecionar(chave)}
      onKeyDown={(evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          aoSelecionar(chave);
        }
      }}
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: "10px",
        cursor: "pointer",
        color: ativo ? "#FFFFFF" : "#94A3B8",
        backgroundColor: ativo ? "#2563EB" : "transparent",
        "&:hover": {
          backgroundColor: ativo ? "#2563EB" : "rgba(148, 163, 184, 0.08)"
        },
        "&:focus-visible": {
          outline: "2px solid #60A5FA",
          outlineOffset: "2px"
        }
      }}
    >
      <Icone sx={{ fontSize: 20 }} />
      <Typography variant="body2" fontWeight={ativo ? 600 : 500} sx={{ flexGrow: 1 }}>
        {rotulo}
      </Typography>
      {temSubmenu && <ChevronRightIcon sx={{ fontSize: 18, color: "#64748B" }} />}
    </Stack>
  );
}

function RotuloSecao({ texto }) {
  return (
    <Typography
      variant="caption"
      sx={{
        px: 1.5,
        pt: 2,
        pb: 0.5,
        display: "block",
        color: "#64748B",
        letterSpacing: "0.06em",
        fontWeight: 600
      }}
    >
      {texto}
    </Typography>
  );
}

function nomeUsuarioLogado() {
  return sessionStorage.getItem("inova_usuario_logado") || localStorage.getItem("inova_usuario_logado") || "Administrador";
}

export default function Sidebar({ aberta, secaoAtiva, aoSelecionarSecao }) {
  const usuario = nomeUsuarioLogado();

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#0B1220",
        display: aberta ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto"
      }}
    >
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2.5, py: 3 }}>
          <Avatar sx={{ bgcolor: "#2563EB", width: 34, height: 34 }}>
            <AltRouteOutlinedIcon sx={{ fontSize: 18 }} />
          </Avatar>
          <Box>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 700, lineHeight: 1.1, fontSize: 15 }}>
              INOVA
            </Typography>
            <Typography sx={{ color: "#64748B", fontWeight: 500, fontSize: 11, letterSpacing: "0.05em" }}>
              TRANSPORTES
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ px: 1.5 }}>
          <RotuloSecao texto="PRINCIPAL" />
          <Stack spacing={0.5}>
            {ITENS_PRINCIPAL.map((item) => (
              <ItemMenu key={item.chave} {...item} ativo={item.chave === secaoAtiva} aoSelecionar={aoSelecionarSecao} />
            ))}
          </Stack>

          <RotuloSecao texto="CONFIGURAÇÕES" />
          <Stack spacing={0.5}>
            {ITENS_CONFIGURACOES.map((item) => (
              <ItemMenu key={item.chave} {...item} ativo={item.chave === secaoAtiva} aoSelecionar={aoSelecionarSecao} />
            ))}
          </Stack>
        </Box>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ px: 2, py: 2, borderTop: "1px solid rgba(148, 163, 184, 0.12)" }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{ width: 38, height: 38 }}>{usuario.charAt(0).toUpperCase()}</Avatar>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              border: "2px solid #0B1220"
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 13 }}>
            {usuario}
          </Typography>
          <Typography noWrap sx={{ color: "#64748B", fontSize: 12 }}>
            Online
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "#64748B" }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export { SIDEBAR_WIDTH, ITENS_MENU };
