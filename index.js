const log = console.log;
const DID = require("./did");
const Note = require("./note");

const me = DID({
  private_key: "",
  public_key: "",
  nostr: {
    relays: [],
    profile: {
      name: "tegila",
      display_name: "tegila.js",
      website: "melhorque.com.br",
      nip05: "tegila@melhorque.com.br",
      picture: "https://t.ly/OqkK",
      about: "Js, c dev",
      lud16: "tegila@ln.tips",
    },
  },
});
console.log(me);

const note = Note({
  kind: 1,
  tags: [
    ["e", "2e60806a190e8c518d5698dad52cef5e3abf07b7a757f2319fe7665a9af614db"],
    ["e", "58a75cb9217363e3ef87040c8cc6beb8590ca5d219cb496a88541735ecd2b8c9"],
    ["p", "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245"],
    ["t", "t"],
    ["t", "t"],
  ],
  content: "hello nostrworld",
  pubkey: me.public_key
});

note.sign(me);

log(note);
