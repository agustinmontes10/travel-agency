import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { formatUSDWhole, nightsBetween, roundToFive } from "../calculations";
import type { QuoteRecord } from "../service";
import { PageDecorations, RouteArrow } from "./decorations";
import { SolidIcon, type SolidIconName } from "./icons";

// Paleta de la marca (ver globals.css)
const C = {
  page: "#F8F8FF", // ghostwhite
  navy: "#13243b",
  accent: "#25436b",
  tint: "#e4eaf4", // azul muy suave, para chips
  onDark: "#a9bdd9", // azul claro para texto sobre navy
  ink: "#1b2c44",
  muted: "#5c6b80",
  line: "#dfe3ee",
  card: "#ffffff",
};

/**
 * Estilos en función de la densidad `d` (1 = diseño normal, menos = más compacto).
 * Los espacios escalan con `d`; los tamaños de letra, solo a medias, para que siga leyéndose bien.
 * Así un presupuesto largo se puede apretar hasta que entre en una sola hoja (ver render.tsx).
 */
function createStyles(d: number) {
  const sp = (n: number) => Math.round(n * d * 10) / 10;
  const fs = (n: number) => Math.round(n * (0.55 + 0.45 * d) * 10) / 10;
  const circle = Math.round(32 * (0.7 + 0.3 * d));
  const logoW = Math.round(168 * (0.75 + 0.25 * d));

  return {
    sizes: {
      circle,
      icon: Math.round(17 * (0.7 + 0.3 * d)),
      logoW,
      logoH: Math.round(logoW / 4),
    },
    ...StyleSheet.create({
      page: {
        backgroundColor: C.page,
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: fs(10),
        color: C.ink,
        paddingBottom: Math.round(40 + 24 * d),
      },
      topBar: { height: Math.round(5 + 3 * d), backgroundColor: C.navy },
      header: {
        backgroundColor: C.card,
        paddingHorizontal: 36,
        paddingVertical: sp(14),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      stripe: { height: 4, backgroundColor: C.accent },
      headerTitle: { fontWeight: 700, fontSize: fs(16), letterSpacing: 3, color: C.navy, textAlign: "right" },
      headerMeta: { fontSize: fs(9), color: C.muted, textAlign: "right", marginTop: sp(4) },
      body: { paddingHorizontal: 36, paddingTop: sp(20) },
      eyebrow: { fontSize: fs(8), letterSpacing: 2, color: C.accent, fontWeight: 700 },
      client: { fontWeight: 700, fontSize: fs(24), color: C.navy, marginTop: sp(4) },
      chips: { flexDirection: "row", flexWrap: "wrap", marginTop: sp(10), marginBottom: sp(12) },
      chip: {
        backgroundColor: C.tint,
        color: C.navy,
        fontSize: fs(9),
        fontWeight: 600,
        paddingHorizontal: 10,
        paddingVertical: sp(5),
        borderRadius: 10,
        marginRight: 6,
        marginBottom: sp(6),
      },
      disclaimer: {
        backgroundColor: C.tint,
        color: C.navy,
        fontSize: fs(9),
        fontWeight: 600,
        paddingHorizontal: 12,
        paddingVertical: sp(5),
        borderRadius: 10,
        alignSelf: "center",
        marginTop: sp(10),
      },
      card: {
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: C.line,
        borderRadius: 12,
        padding: sp(13),
        marginBottom: sp(9),
      },
      cardHead: { flexDirection: "row", alignItems: "center", marginBottom: sp(9) },
      iconCircle: {
        width: circle,
        height: circle,
        borderRadius: circle / 2,
        backgroundColor: C.accent,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
      },
      cardTitle: { fontWeight: 700, fontSize: fs(10.5), letterSpacing: 1.6, color: C.navy },
      // El texto de cada rubro se alinea con el título (pasado el círculo del icono).
      item: { paddingLeft: circle + 8, marginBottom: sp(7) },
      itemLast: { paddingLeft: circle + 8 },
      route: { flexDirection: "row", alignItems: "center" },
      strong: { fontWeight: 600, fontSize: fs(11.5), color: C.navy },
      sub: { fontSize: fs(9.5), color: C.muted, marginTop: sp(3) },
      totalBox: {
        backgroundColor: C.navy,
        borderRadius: 14,
        paddingVertical: sp(17),
        paddingHorizontal: 22,
        marginTop: sp(4),
      },
      totalLabel: { fontSize: fs(8.5), letterSpacing: 2, color: C.onDark, fontWeight: 700 },
      totalValue: { fontWeight: 700, fontSize: fs(32), color: "#ffffff", marginTop: sp(7) },
      notes: { marginTop: sp(18) },
      notesTitle: { fontWeight: 700, fontSize: fs(9), letterSpacing: 1.6, color: C.accent, marginBottom: sp(6) },
      notesText: { fontSize: fs(10), color: C.ink, lineHeight: 1.35 + 0.15 * d },
      footer: {
        position: "absolute",
        left: 84,
        right: 84,
        bottom: 26,
        borderTopWidth: 1,
        borderTopColor: C.line,
        paddingTop: 9,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      footerText: { fontSize: 8, color: C.muted },
    }),
  };
}

type Styles = ReturnType<typeof createStyles>;

const dateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const long = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
const short = (iso: string) => shortDateFormat.format(new Date(`${iso}T00:00:00Z`));

function Block({ styles, icon, title, children }: { styles: Styles; icon: SolidIconName; title: string; children: ReactNode }) {
  return (
    <View style={styles.card} wrap={false}>
      <View style={styles.cardHead}>
        <View style={styles.iconCircle}>
          <SolidIcon name={icon} size={styles.sizes.icon} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export interface QuotePdfProps {
  quote: QuoteRecord;
  /** PNG de la logo a color para la cabecera clara. */
  logo: Buffer;
  /** 1 = diseño normal; valores menores lo compactan (ver render.tsx). */
  density?: number;
}

/** Presupuesto para el cliente: solo la combinación elegida y el precio total por pasajero (sin neto ni comisión). */
export function QuotePdf({ quote, logo, density = 1 }: QuotePdfProps) {
  const styles = createStyles(density);
  const flight = quote.flights.find((f) => f.id === quote.selectedFlightId);
  const hotel = quote.hotels.find((h) => h.id === quote.selectedHotelId);
  const transfer = quote.transfers.find((t) => t.id === quote.selectedTransferId);
  const hasAssistance = quote.assistancePrice > 0;
  // El precio al cliente va redondeado a 0 o 5 (múltiplo de 5), sin centavos.
  const perPerson = roundToFive(quote.total / Math.max(1, quote.passengers));

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  const issued = shortDateFormat.format(quote.createdAt);

  return (
    <Document title={`Presupuesto - ${quote.clientName}`} author="MT Turismo" creator="MT Turismo">
      <Page size="A4" style={styles.page}>
        <PageDecorations />
        <View>
          <View style={styles.topBar} />
          <View style={styles.header}>
            {/* El Image de react-pdf no admite `alt` (el PDF no es HTML). */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={{ data: logo, format: "png" }} style={{ width: styles.sizes.logoW, height: styles.sizes.logoH }} />
            <View>
              <Text style={styles.headerTitle}>PRESUPUESTO</Text>
              <Text style={styles.headerMeta}>Emitido el {issued}</Text>
            </View>
          </View>
          <View style={styles.stripe} />
        </View>

        <View style={styles.body}>
          <Text style={styles.eyebrow}>PREPARADO PARA</Text>
          <Text style={styles.client}>{quote.clientName}</Text>
          <View style={styles.chips}>
            {quote.destination ? <Text style={styles.chip}>{quote.destination}</Text> : null}
            <Text style={styles.chip}>{plural(quote.passengers, "pasajero", "pasajeros")}</Text>
          </View>

          {flight && (
            <Block styles={styles} icon="plane" title="VUELO">
              <View style={styles.item}>
                {flight.origin || flight.destination ? (
                  <View style={styles.route}>
                    <Text style={styles.strong}>{flight.origin || "—"}</Text>
                    <View style={{ marginHorizontal: 8 }}>
                      <RouteArrow color={C.accent} plane />
                    </View>
                    <Text style={styles.strong}>{flight.destination || "—"}</Text>
                  </View>
                ) : null}
                <Text style={styles.sub}>
                  Ida: {long(flight.departDate)}  ·  Vuelta: {long(flight.returnDate)}
                </Text>
                {flight.airline ? <Text style={styles.sub}>Aerolínea: {flight.airline}</Text> : null}
              </View>
            </Block>
          )}

          {hotel && (
            <Block styles={styles} icon="bed" title={hotel.stays.length > 1 ? "HOTELES" : "HOTEL"}>
              {hotel.stays.map((stay, i) => {
                const nights = nightsBetween(stay.checkIn, stay.checkOut);
                return (
                  <View key={stay.id} style={i === hotel.stays.length - 1 ? styles.itemLast : styles.item}>
                    <Text style={styles.strong}>{stay.name}</Text>
                    <Text style={styles.sub}>
                      Entrada: {short(stay.checkIn)}  ·  Salida: {short(stay.checkOut)}  ·  {plural(nights, "noche", "noches")}
                    </Text>
                  </View>
                );
              })}
            </Block>
          )}

          {transfer && (
            <Block styles={styles} icon="car" title="TRASLADOS">
              {transfer.legs.map((leg, i) => (
                <View key={leg.id} style={i === transfer.legs.length - 1 ? styles.itemLast : styles.item}>
                  <View style={styles.route}>
                    <Text style={styles.strong}>{leg.from}</Text>
                    <View style={{ marginHorizontal: 8 }}>
                      <RouteArrow color={C.accent} />
                    </View>
                    <Text style={styles.strong}>{leg.to}</Text>
                  </View>
                </View>
              ))}
            </Block>
          )}

          {hasAssistance && (
            <Block styles={styles} icon="shield" title="ASISTENCIA">
              <View style={styles.itemLast}>
                <Text style={styles.strong}>{quote.assistanceType}</Text>
              </View>
            </Block>
          )}

          <View style={styles.totalBox} wrap={false}>
            <Text style={styles.totalLabel}>PRECIO TOTAL POR PASAJERO</Text>
            <Text style={styles.totalValue}>{formatUSDWhole(perPerson)}</Text>
          </View>

          <Text style={styles.disclaimer}>Tarifa sujeta a disponibilidad y cambios al momento de la reserva</Text>

          {quote.notes.trim() ? (
            <View style={styles.notes} wrap={false}>
              <Text style={styles.notesTitle}>OBSERVACIONES</Text>
              <Text style={styles.notesText}>{quote.notes.trim()}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            MT Turismo  ·  Adolfo Gonzales Chaves, Buenos Aires{phone ? `  ·  WhatsApp +${phone}` : ""}  ·  @mtturismochaves
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : "")}
          />
        </View>
      </Page>
    </Document>
  );
}
