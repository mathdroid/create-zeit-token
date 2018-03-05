const test = require("ava");
const puppeteer = require("puppeteer");
const Z = require("./");

test("sanity", t => {
  t.is(true, !false);
});

test("index", async t => {
  let badSession, badErr;
  try {
    badSession = new Z();
  } catch (e) {
    badErr = e;
  }
  t.is(badErr instanceof Error, true);
  const session = new Z("muhammad.mustadi@gmail.com");
  const securityCode = await session.getSecurityCode();
  t.is(typeof securityCode, "string");
});
