const log = console.log;
const secp256k1 = require("@noble/secp256k1");
const { sha256 } = require("@noble/hashes/sha256");
secp256k1.utils.sha256Sync = (...msgs) =>
  sha256(secp256k1.utils.concatBytes(...msgs));

const defaults = {
  pubkey: "",
  id: "",
  kind: 1,
  content: "",
  tags: [],
  created_at: '',
  sig: "",
};

module.exports = (options) => {
  const note = Object.assign({}, defaults, options);
  if(!note.created_at) note.created_at = Math.floor(Date.now() / 1000);
  note.toString = () => {
    const note_string = JSON.stringify([
      0,
      note.pubkey,
      note.created_at,
      note.kind,
      note.tags,
      note.content,
    ]);
    log(note_string);

    return note_string;
  };

  note.hash = () => {
    const utf8Encoder = new TextEncoder();
    const hash = sha256(utf8Encoder.encode(note.toString()));
    note.id = secp256k1.utils.bytesToHex(hash);
    log(`note.id: ${note.id}`);
    return note.id;
  };

  note.sign = (did) => {
    note.sig = secp256k1.utils.bytesToHex(
      secp256k1.schnorr.signSync(note.hash(), did.private_key)
    );
    log(`note.sig: ${note.sig}`);
    return note.sig;
  };

  return note;
};
