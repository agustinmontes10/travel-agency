import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { formatUSD, nightsBetween, round2 } from "../calculations";
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

const styles = StyleSheet.create({
  page: { backgroundColor: C.page, fontFamily: "Inter", fontWeight: 400, fontSize: 10, color: C.ink, paddingBottom: 64 },
  topBar: { height: 8, backgroundColor: C.navy },
  header: {
    backgroundColor: C.card,
    paddingHorizontal: 36,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stripe: { height: 4, backgroundColor: C.accent },
  headerTitle: { fontWeight: 700, fontSize: 16, letterSpacing: 3, color: C.navy, textAlign: "right" },
  headerMeta: { fontSize: 9, color: C.muted, textAlign: "right", marginTop: 4 },
  body: { paddingHorizontal: 36, paddingTop: 20 },
  eyebrow: { fontSize: 8, letterSpacing: 2, color: C.accent, fontWeight: 700 },
  client: { fontWeight: 700, fontSize: 24, color: C.navy, marginTop: 4 },
  chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 12 },
  chip: {
    backgroundColor: C.tint,
    color: C.navy,
    fontSize: 9,
    fontWeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 13,
    marginBottom: 9,
  },
  cardHead: { flexDirection: "row", alignItems: "center", marginBottom: 9 },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitle: { fontWeight: 700, fontSize: 10.5, letterSpacing: 1.6, color: C.navy },
  item: { paddingLeft: 40, marginBottom: 7 },
  itemLast: { paddingLeft: 40 },
  route: { flexDirection: "row", alignItems: "center" },
  strong: { fontWeight: 600, fontSize: 11.5, color: C.navy },
  sub: { fontSize: 9.5, color: C.muted, marginTop: 3 },
  totalBox: {
    backgroundColor: C.navy,
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 22,
    marginTop: 4,
  },
  totalLabel: { fontSize: 8.5, letterSpacing: 2, color: C.onDark, fontWeight: 700 },
  totalValue: { fontWeight: 700, fontSize: 32, color: "#ffffff", marginTop: 7 },
  notesTitle: { fontWeight: 700, fontSize: 9, letterSpacing: 1.6, color: C.accent, marginBottom: 6 },
  notesText: { fontSize: 10, color: C.ink, lineHeight: 1.5 },
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
});

const dateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const long = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
const short = (iso: string) => shortDateFormat.format(new Date(`${iso}T00:00:00Z`));

function Block({ icon, title, children }: { icon: SolidIconName; title: string; children: ReactNode }) {
  return (
    <View style={styles.card} wrap={false}>
      <View style={styles.cardHead}>
        <View style={styles.iconCircle}>
          <SolidIcon name={icon} size={17} />
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
}

/** Presupuesto para el cliente: solo la combinación elegida y el precio total por pasajero (sin neto ni comisión). */
export function QuotePdf({ quote, logo }: QuotePdfProps) {
  const flight = quote.flights.find((f) => f.id === quote.selectedFlightId);
  const hotel = quote.hotels.find((h) => h.id === quote.selectedHotelId);
  const transfer = quote.transfers.find((t) => t.id === quote.selectedTransferId);
  const hasAssistance = quote.assistancePrice > 0;
  const perPerson = round2(quote.total / Math.max(1, quote.passengers));

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
            <Image src={{ data: logo, format: "png" }} style={{ width: 168, height: 42 }} />
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
            <Block icon="plane" title="VUELO">
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
            <Block icon="bed" title={hotel.stays.length > 1 ? "HOTELES" : "HOTEL"}>
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
            <Block icon="car" title="TRASLADOS">
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
            <Block icon="shield" title="ASISTENCIA">
              <View style={styles.itemLast}>
                <Text style={styles.strong}>{quote.assistanceType}</Text>
              </View>
            </Block>
          )}

          <View style={styles.totalBox} wrap={false}>
            <Text style={styles.totalLabel}>PRECIO TOTAL POR PASAJERO</Text>
            <Text style={styles.totalValue}>{formatUSD(perPerson)}</Text>
          </View>

          {/* Es larga para la fila de chips del encabezado (choca con la decoración): va centrada bajo el precio. */}
          <Text style={[styles.chip, { alignSelf: "center", marginTop: 10, marginRight: 0, marginBottom: 0 }]}>
            Tarifa sujeta a disponibilidad y cambios al momento de la reserva
          </Text>

          {quote.notes.trim() ? (
            <View style={{ marginTop: 18 }} wrap={false}>
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
