const EventEmitter = require("events");

const puppeteer = require("puppeteer");

const loginURI = "https://zeit.co/login?next=%2Faccount%2Ftokens";
const selectorLoginInput = "input";
const selectorSecurityCode = ".success .security-code";

class CreateZeitToken extends EventEmitter {
  constructor(username) {
    if (typeof username !== "string")
      throw new Error("username must be string");
    super();
    this.username = username;
    this.securityCode = "";
    this.token = "";
    this.getTokenFromHeader = this.getTokenFromHeader.bind(this);
  }

  async resetSession() {
    if (this.b) await this.b.close();
    this.securityCode = "";
    this.token = "";
  }

  async getTokenFromHeader(r) {
    const { authorization } = r.headers();
    if (authorization === undefined) {
      r.continue();
    } else {
      this.token = authorization.split(" ")[1]; // Authorization format is `Bearer xxxxxxxx`
      this.emit("token", this.token);
      r.abort();
      await this.b.close();
    }
  }

  async createBrowser(opts) {
    return this.b || (await puppeteer.launch(opts));
  }

  async getSecurityCode(opts) {
    if (this.securityCode === "") {
      let username = this.username;
      this.b = await this.createBrowser(opts);
      this.p = await this.b.newPage();
      await this.p.goto(loginURI);
      await this.p.waitForSelector(selectorLoginInput);
      await this.p.type(selectorLoginInput, username);
      await this.p.keyboard.press("Enter");
      try {
        await this.p.waitForSelector(selectorSecurityCode);
      } catch (e) {
        //   wrong email perhaps
        throw new Error(`Failed to send email to ${username}`);
      }
      this.securityCode = await this.p.$eval(
        selectorSecurityCode,
        c => c.innerText
      );
      await this.p.setRequestInterception(true);
      this.p.on("request", this.getTokenFromHeader);
    }
    return this.securityCode;
  }
}

module.exports = CreateZeitToken;
