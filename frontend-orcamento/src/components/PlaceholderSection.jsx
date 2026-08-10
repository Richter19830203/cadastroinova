import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CORES } from "../theme";

export default function PlaceholderSection({ rotulo, Icone, texto }) {
  return (
    <Box
      sx={{
        backgroundColor: CORES.card,
        borderRadius: "16px",
        boxShadow: 2,
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        p: 5
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          backgroundColor: "#EFF4FF",
          color: CORES.primaria,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icone sx={{ fontSize: 30 }} />
      </Box>

      <Typography sx={{ fontSize: 18, fontWeight: 700, color: CORES.textoPrincipal }}>
        {rotulo}
      </Typography>

      <Typography sx={{ fontSize: 13.5, color: CORES.textoSecundario, maxWidth: 360, lineHeight: 1.5 }}>
        {texto || "Esta seção já existe no sistema atual e ainda não foi portada pro layout novo."}
      </Typography>

      <Box
        sx={{
          mt: 0.5,
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: CORES.primaria,
          backgroundColor: "#EFF4FF",
          borderRadius: "999px",
          px: 1.5,
          py: 0.5
        }}
      >
        Ainda no sistema atual
      </Box>
    </Box>
  );
}
