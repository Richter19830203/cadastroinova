import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

export default function Header({ aoAlternarSidebar, secaoAtiva }) {
  const { rotulo, Icone } = secaoAtiva;
  const alternarTelaCheia = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: 64,
        px: 3,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton size="small" onClick={aoAlternarSidebar} sx={{ color: "#111827" }}>
          <MenuIcon />
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={0.75}>
          <Icone sx={{ fontSize: 18, color: "#2563EB" }} />
          <Typography sx={{ color: "#111827", fontWeight: 700, fontSize: 14 }}>{rotulo}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton size="small" sx={{ color: "#374151" }}>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton size="small" sx={{ color: "#374151" }}>
          <DarkModeOutlinedIcon />
        </IconButton>
        <IconButton size="small" sx={{ color: "#374151" }} onClick={alternarTelaCheia}>
          <FullscreenOutlinedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
