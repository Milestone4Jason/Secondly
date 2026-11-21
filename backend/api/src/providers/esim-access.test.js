import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createEsimAccessClient } from "./esim-access.js";

test("requires server-side credentials", () => {
  assert.throws(
    () => createEsimAccessClient({ accessCode: "", secretKey: "" }),
    /credentials are not configured/
  );
});

test("signs and sends the package-list request using the documented HMAC format", async () => {
  let captured;
  const client = createEsimAccessClient({
    accessCode: "test-access",
    secretKey: "test-secret",
    now: () => 123456789,
    makeRequestId: () => "fixed-request-id",
    fetchImpl: async (url, options) => {
      captured = { url: String(url), options };
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, obj: { packageList: [] } })
      };
    }
  });

  const result = await client.listPackages({ countryCode: "IT" });
  const expectedBody = JSON.stringify({
    locationCode: "IT",
    type: "BASE",
    packageCode: "",
    iccid: ""
  });
  const signData = "123456789" + "fixed-request-id" + "test-access" + expectedBody;
  const expectedSignature = createHmac("sha256", "test-secret")
    .update(signData, "utf8")
    .digest("hex");

  assert.equal(captured.url, "https://api.esimaccess.com/api/v1/open/package/list");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.body, expectedBody);
  assert.equal(captured.options.headers["RT-AccessCode"], "test-access");
  assert.equal(captured.options.headers["RT-RequestID"], "fixed-request-id");
  assert.equal(captured.options.headers["RT-Timestamp"], "123456789");
  assert.equal(captured.options.headers["RT-Signature"], expectedSignature);
  assert.deepEqual(result.obj.packageList, []);
});

test("rejects invalid country codes before making a request", async () => {
  const client = createEsimAccessClient({
    accessCode: "test-access",
    secretKey: "test-secret",
    fetchImpl: async () => {
      throw new Error("fetch should not be called");
    }
  });
  await assert.rejects(
    client.listPackages({ countryCode: "Italy" }),
    /two-letter uppercase ISO code/
  );
});

test("does not expose provider response details in thrown errors", async () => {
  const client = createEsimAccessClient({
    accessCode: "test-access",
    secretKey: "test-secret",
    fetchImpl: async () => ({
      ok: false,
      status: 401,
      json: async () => ({ success: false, errorCode: "101003", errorMsg: "private detail" })
    })
  });
  await assert.rejects(client.listPackages(), /code: 101003/);
});
