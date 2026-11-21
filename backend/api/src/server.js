import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

app.get("/health", (_request, response) => {
  response.json({ service: "Secondly API", status: "ok", mode: "development", liveTelecomService: false });
});

app.get("/api/v1/plans", (_request, response) => {
  response.json({
    currency: "EUR",
    plans: [
      { id: "free", name: "Secondly Free", dataBytes: 5 * 1024 ** 3, cycleDays: 35, priceCents: 0 },
      { id: "founder", name: "Secondly Founder", dataBytesPerDay: 20 * 1024 ** 3, cycleDays: 1, priceCents: 0, assignment: "server-side-admin-only" }
    ],
    rewards: { type: "rewarded-ad", dataBytesPerVerifiedAd: 100 * 1024 ** 2, maxAdsPerDay: 10, maxRewardBytesPerDay: 1024 ** 3, verification: "server-side-required" },
    note: "Plan definitions only. No mobile data or eSIM service is provisioned."
  });
});

app.use((_request, response) => response.status(404).json({ error: "not_found" }));
app.listen(port, "0.0.0.0", () => console.log("Secondly API listening on port " + port));
