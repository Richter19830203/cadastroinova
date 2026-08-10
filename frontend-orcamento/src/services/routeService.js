import axios from "axios";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const AUTH_TOKEN_KEY = "inova_auth_token";

const API_BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:3001/api"
  : "/api";

function extrairUF(endereco) {
  if (endereco.state_code) {
    return endereco.state_code;
  }
  const isoEstado = endereco["ISO3166-2-lvl4"];
  if (isoEstado && isoEstado.includes("-")) {
    return isoEstado.split("-")[1];
  }
  return endereco.state || "";
}

function formatarSugestao(item) {
  const endereco = item.address || {};
  const cidade = endereco.city || endereco.town || endereco.village || endereco.municipality || item.name;
  const estado = extrairUF(endereco);
  const pais = endereco.country || "";

  const partes = [cidade, estado].filter(Boolean).join(" - ");
  const rotulo = [partes, pais].filter(Boolean).join(", ") || item.display_name;

  return {
    id: item.place_id,
    rotulo,
    lat: Number(item.lat),
    lon: Number(item.lon)
  };
}

export async function buscarCidades(consulta) {
  if (!consulta || consulta.trim().length < 3) {
    return [];
  }

  const resposta = await axios.get(NOMINATIM_URL, {
    params: {
      q: consulta,
      format: "jsonv2",
      addressdetails: 1,
      featureType: "city",
      "accept-language": "pt-BR",
      limit: 6
    }
  });

  return resposta.data.map(formatarSugestao);
}

export async function calcularRota(origem, destino) {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY) || "";

  const resposta = await axios.post(
    `${API_BASE_URL}/rota/distancia`,
    {
      origem: { lat: origem.lat, lon: origem.lon },
      destino: { lat: destino.lat, lon: destino.lon }
    },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }
  );

  return resposta.data;
}
