const CreateZeitToken = require("create-zeit-token");
const username = process.argv[2];
console.log("Creating new session for ", username);
const T = new CreateZeitToken(username);

T.getSecurityCode().then(async code => {
  console.log(
    `- Your security code is \`${code}\`.\n- Please check your email (${username})for confirmation`
  ); // Security code is usually in the form of Adjective-Animal
});

T.on("token", token => {
  console.log(`Your ZEIT token is ${token}`);
});
