export default function (location) {

  var vars = {},
    hash;
  var hashes = location.search
    .slice(location.search.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars[hash[0]] = decodeURIComponent(hash[1]);
  }
  return vars;
}