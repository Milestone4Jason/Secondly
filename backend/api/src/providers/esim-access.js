import { createHmac, randomUUID } from "node:crypto";

const API_BASE_URL = "https://api.esimaccess.com";
const PACKAGE_LIST_PATH = "/api/v1/open/package/list";

export function createEsimAccessClient({
  accessCode = process.env.ESIM_ACCESS_CODE,
  secretKey = process.env.ESIM_ACCESS_SECRET_KEY,
  fetchImpl = globalThis.fetch,
  now = () => Date.now(),
  makeRequestId = randomUUID
} = {}) {
  if (!accessCode || !secretKey) {
    throw new Error("eSIM Access credentials are not configured");
  }
  if (typeof fetchImpl !== "function") {
    throw new Error("This Node.js runtime does not provide fetch");
  }

  async function post(path, payload) {
    const body = JSON.stringify(payload);
    const timestamp = String(now());
    const requestId = makeRequestId();
    const signData = timestamp + requestId + accessCode + body;
    const signature = createHmac("sha256", secretKey)
      .update(signData, "utf8")
      .digest("hex")
      .toLowerCase();

    const response = await fetchImpl(new URL(path, API_BASE_URL), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "RT-AccessCode": accessCode,
        "RT-RequestID": requestId,
        "RT-Timestamp": timestamp,
        "RT-Signature": signature
      },
      body,
      signal: AbortSignal.timeout(15000)
    });

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("eSIM Access returned an unreadable response");
    }

    if (!response.ok || result?.success === false) {
      const code = result?.errorCode ?? response.status;
      throw new Error(`eSIM Access request failed (code: ${String(code)})`);
    }

    return result;
  }

  return Object.freeze({
    async listPackages({ countryCode = "IT", type = "BASE" } = {}) {
      if (!/^[A-Z]{2}$/.test(countryCode)) {
        throw new TypeError("countryCode must be a two-letter uppercase ISO code");
      }
      if (!["BASE", "TOPUP"].includes(type)) {
        throw new TypeError("type must be BASE or TOPUP");
      }
      return post(PACKAGE_LIST_PATH, {
        locationCode: countryCode,
        type,
        packageCode: "",
        iccid: ""
      });
    }
  });
}
