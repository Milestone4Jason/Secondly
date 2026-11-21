import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const COLORS = {
  bg: "#080D18",
  panel: "#111A2B",
  panel2: "#17243A",
  text: "#F4F7FC",
  muted: "#93A4BC",
  green: "#A3F36B",
  blue: "#75B8FF",
  border: "#26364F"
};

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.brandMark}><Text style={styles.brandMarkText}>2</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.brand}>Secondly</Text>
        <Text style={styles.tagline}>YOUR NUMBER. YOUR DATA. YOUR FREEDOM.</Text>
      </View>
      <View style={styles.demoPill}><Text style={styles.demoText}>DEMO</Text></View>
    </View>
  );
}

function SectionTitle({ children, action }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{children}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

function Dashboard() {
  return (
    <>
      <View style={styles.welcome}>
        <Text style={styles.eyebrow}>WELCOME TO SECONDLY</Text>
        <Text style={styles.heading}>Stay connected.{ "\n" }Stay free.</Text>
        <Text style={styles.subheading}>Your mobile plan, made simpler.</Text>
      </View>

      <View style={styles.usageCard}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.cardEyebrow}>SECONDLY FREE</Text>
            <Text style={styles.cardTitle}>Your data allowance</Text>
          </View>
          <View style={styles.activePill}><Text style={styles.activeText}>PLAN PREVIEW</Text></View>
        </View>
        <View style={styles.dataLine}>
          <Text style={styles.dataNumber}>5 GB</Text>
          <Text style={styles.dataCycle}>every 5 weeks</Text>
        </View>
        <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
        <View style={styles.progressLabels}>
          <Text style={styles.mutedSmall}>0 GB used</Text>
          <Text style={styles.mutedSmall}>5 GB total</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Renewal cycle</Text>
          <Text style={styles.infoValue}>35 days</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Plan price</Text>
          <Text style={[styles.infoValue, { color: COLORS.green }]}>€0 / month</Text>
        </View>
      </View>

      <SectionTitle action="DETAILS">Earn extra data</SectionTitle>
      <View style={styles.rewardCard}>
        <View style={styles.rewardIcon}><Text style={styles.rewardIconText}>＋</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.rewardTitle}>Rewarded ads</Text>
          <Text style={styles.rewardDescription}>100 MB per completed ad</Text>
        </View>
        <View style={styles.rewardAmount}><Text style={styles.rewardAmountText}>+100</Text><Text style={styles.rewardUnit}>MB</Text></View>
      </View>
      <Text style={styles.limitText}>Up to 10 ads per day · Maximum 1 GB/day</Text>

      <SectionTitle>Get started</SectionTitle>
      <View style={styles.actionCard}>
        <View style={styles.actionIcon}><Text style={styles.actionIconText}>⌁</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>Activate your eSIM</Text>
          <Text style={styles.actionDescription}>Provider connection coming soon</Text>
        </View>
        <Text style={styles.comingSoon}>SOON</Text>
      </View>
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Early preview</Text>
        <Text style={styles.noticeText}>This app is a prototype. It does not yet provide mobile data, a phone number, calls, SMS, eSIM activation or ad rewards.</Text>
      </View>
    </>
  );
}

function Account() {
  return (
    <View style={styles.accountCard}>
      <View style={styles.accountAvatar}><Text style={styles.accountAvatarText}>S</Text></View>
      <Text style={styles.accountName}>Secondly account</Text>
      <Text style={styles.accountEmail}>Demo profile · Not connected</Text>
      <View style={styles.divider} />
      <View style={styles.infoRow}><Text style={styles.infoLabel}>Account type</Text><Text style={styles.infoValue}>Preview</Text></View>
      <View style={styles.infoRow}><Text style={styles.infoLabel}>Mobile number</Text><Text style={styles.infoValue}>Not assigned</Text></View>
      <View style={styles.infoRow}><Text style={styles.infoLabel}>eSIM status</Text><Text style={styles.infoValue}>Not activated</Text></View>
      <Text style={styles.accountNote}>A real account and number will be available only after Secondly connects to an authorized telecom provider.</Text>
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <Header />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "home" ? <Dashboard /> : <Account />}
        <Text style={styles.footer}>SECONDLY · VERSION 0.1.0 · PREVIEW</Text>
      </ScrollView>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setTab("home")}>
          <Text style={[styles.navIcon, tab === "home" && styles.navSelected]}>⌂</Text>
          <Text style={[styles.navLabel, tab === "home" && styles.navSelected]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setTab("account")}>
          <Text style={[styles.navIcon, tab === "account" && styles.navSelected]}>◉</Text>
          <Text style={[styles.navLabel, tab === "account" && styles.navSelected]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 22, paddingTop: 12, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#18243A" },
  brandMark: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center", marginRight: 12 },
  brandMarkText: { color: COLORS.bg, fontSize: 27, fontWeight: "900" },
  brand: { color: COLORS.text, fontSize: 19, fontWeight: "800", letterSpacing: -0.4 },
  tagline: { color: COLORS.muted, fontSize: 8, letterSpacing: 1.1, marginTop: 3, fontWeight: "700" },
  demoPill: { borderWidth: 1, borderColor: "#526A42", backgroundColor: "#1D2B1B", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  demoText: { color: COLORS.green, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  content: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 28 },
  welcome: { marginBottom: 22 },
  eyebrow: { color: COLORS.green, fontSize: 10, fontWeight: "900", letterSpacing: 1.8, marginBottom: 9 },
  heading: { color: COLORS.text, fontSize: 35, lineHeight: 39, fontWeight: "900", letterSpacing: -1.2 },
  subheading: { color: COLORS.muted, fontSize: 14, marginTop: 9 },
  usageCard: { backgroundColor: COLORS.panel, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border, padding: 19, marginBottom: 27 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardEyebrow: { color: COLORS.green, fontSize: 9, fontWeight: "900", letterSpacing: 1.4 },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700", marginTop: 5 },
  activePill: { backgroundColor: "#25351F", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  activeText: { color: COLORS.green, fontSize: 8, fontWeight: "900" },
  dataLine: { flexDirection: "row", alignItems: "baseline", marginTop: 22, marginBottom: 14 },
  dataNumber: { color: COLORS.text, fontSize: 43, fontWeight: "900", letterSpacing: -1.5 },
  dataCycle: { color: COLORS.muted, fontSize: 13, marginLeft: 9 },
  progressTrack: { height: 9, backgroundColor: "#29374D", borderRadius: 10, overflow: "hidden" },
  progressFill: { width: "0%", height: "100%", backgroundColor: COLORS.green, borderRadius: 10 },
  progressLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 9 },
  mutedSmall: { color: COLORS.muted, fontSize: 10 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  infoLabel: { color: COLORS.muted, fontSize: 12 },
  infoValue: { color: COLORS.text, fontSize: 12, fontWeight: "700" },
  sectionTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: "800", marginBottom: 12, marginTop: 2 },
  sectionAction: { color: COLORS.blue, fontSize: 9, fontWeight: "800", letterSpacing: 1, marginBottom: 12 },
  rewardCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.panel, borderRadius: 17, borderWidth: 1, borderColor: COLORS.border, padding: 15 },
  rewardIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#24351F", alignItems: "center", justifyContent: "center", marginRight: 12 },
  rewardIconText: { color: COLORS.green, fontSize: 25, fontWeight: "500" },
  rewardTitle: { color: COLORS.text, fontSize: 14, fontWeight: "800" },
  rewardDescription: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  rewardAmount: { alignItems: "flex-end" },
  rewardAmountText: { color: COLORS.green, fontSize: 16, fontWeight: "900" },
  rewardUnit: { color: COLORS.muted, fontSize: 9, fontWeight: "700" },
  limitText: { color: COLORS.muted, fontSize: 10, marginTop: 9, marginBottom: 25, marginLeft: 2 },
  actionCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.panel, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 14, marginBottom: 10 },
  actionIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#1D2C42", alignItems: "center", justifyContent: "center", marginRight: 12 },
  actionIconText: { color: COLORS.blue, fontSize: 25 },
  actionTitle: { color: COLORS.text, fontSize: 13, fontWeight: "800" },
  actionDescription: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  comingSoon: { color: COLORS.blue, fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  notice: { backgroundColor: "#211F18", borderColor: "#51452A", borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 12 },
  noticeTitle: { color: "#F4D28A", fontSize: 12, fontWeight: "800", marginBottom: 5 },
  noticeText: { color: "#C7B990", fontSize: 10, lineHeight: 16 },
  accountCard: { backgroundColor: COLORS.panel, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border, padding: 20, alignItems: "center", marginTop: 8 },
  accountAvatar: { width: 64, height: 64, borderRadius: 22, backgroundColor: COLORS.green, alignItems: "center", justifyContent: "center", marginBottom: 13 },
  accountAvatarText: { color: COLORS.bg, fontSize: 34, fontWeight: "900" },
  accountName: { color: COLORS.text, fontSize: 18, fontWeight: "900" },
  accountEmail: { color: COLORS.muted, fontSize: 11, marginTop: 5 },
  accountNote: { color: COLORS.muted, fontSize: 11, lineHeight: 17, textAlign: "center", marginTop: 15 },
  nav: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#1C2940", backgroundColor: "#0D1524", paddingTop: 10, paddingBottom: 10 },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  navIcon: { color: COLORS.muted, fontSize: 21 },
  navLabel: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  navSelected: { color: COLORS.green },
  footer: { color: "#59677C", fontSize: 9, textAlign: "center", marginTop: 25, letterSpacing: 1 }
});
