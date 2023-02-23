const log = console.log;
const secp256k1 = require("@noble/secp256k1");

const defaults = {
  private_key: "",
  public_key: "",
  nostr: {
    relays: [],
    profile: {
      name: "",
      display_name: "",
      website: "",
      nip05: "",
      picture: "",
      about: "",
      lud16: "",
    },
  },
};

module.exports = (options) => {
  const profile = Object.assign({}, defaults, options);

  profile.new_private_key = () => {
    log("new_private_key");
    profile.private_key = secp256k1.utils.bytesToHex(
      secp256k1.utils.randomPrivateKey()
    );
    return profile;
  };

  profile.calc_public_key = () => {
    log("calc_public_key");
    profile.public_key = secp256k1.utils.bytesToHex(
      secp256k1.schnorr.getPublicKey(profile.private_key)
    );
    return profile;
  };

  log(profile);
  if (!profile.private_key) profile.new_private_key();
  log(profile);
  if (!profile.public_key) profile.calc_public_key();
  log(profile);
  return profile;
};
