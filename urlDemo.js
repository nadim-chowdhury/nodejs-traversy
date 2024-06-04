import url from "url";

const urlString = "http://www.joybangla.com/search?q=joy+bangla";

const urlObj = new URL(urlString);

// console.log(urlObj);
// console.log(url.format(urlObj));
// console.log(import.meta.url);
// console.log(url.fileURLToPath(import.meta.url));

const params = new URLSearchParams(urlObj.search);
params.append("limit", "420");
params.delete("limit");
console.log("params:", params);
console.log(params.get("q"));
