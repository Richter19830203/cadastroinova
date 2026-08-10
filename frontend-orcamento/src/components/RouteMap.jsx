import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CORES } from "../theme";

function criarIconePin(cor) {
  return L.divIcon({
    className: "",
    html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${cor}"/>
      <circle cx="15" cy="15" r="6" fill="#FFFFFF"/>
    </svg>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });
}

const ICONE_ORIGEM = criarIconePin(CORES.origem);
const ICONE_DESTINO = criarIconePin(CORES.destino);

function AjustarEnquadramento({ origem, destino, geometria }) {
  const mapa = useMap();

  useEffect(() => {
    if (geometria && geometria.length > 0) {
      mapa.fitBounds(geometria, { padding: [40, 40] });
    } else if (origem && destino) {
      mapa.fitBounds(
        [
          [origem.lat, origem.lon],
          [destino.lat, destino.lon]
        ],
        { padding: [60, 60] }
      );
    }
  }, [origem, destino, geometria, mapa]);

  return null;
}

export default function RouteMap({ origem, destino, geometria }) {
  const centroInicial = [-14.235, -51.9253];

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: "16px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, mb: 2, color: CORES.textoPrincipal }}>
        Mapa da Rota
      </Typography>

      <Box sx={{ flexGrow: 1, minHeight: 420, borderRadius: "12px", overflow: "hidden" }}>
        <MapContainer center={centroInicial} zoom={4} style={{ width: "100%", height: "100%" }}>
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {origem && <Marker position={[origem.lat, origem.lon]} icon={ICONE_ORIGEM} />}
          {destino && <Marker position={[destino.lat, destino.lon]} icon={ICONE_DESTINO} />}
          {geometria && geometria.length > 0 && (
            <Polyline positions={geometria} pathOptions={{ color: CORES.primaria, weight: 4 }} />
          )}

          <AjustarEnquadramento origem={origem} destino={destino} geometria={geometria} />
        </MapContainer>
      </Box>
    </Paper>
  );
}
