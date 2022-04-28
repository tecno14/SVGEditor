// Programmatically Lighten or Darken a hex color (or rgb, and blend colors)
// https://stackoverflow.com/a/13532993/8581829
// Examples
//  Lighten: shadeColor("#63C6FF",40);
//  Darken: shadeColor("#63C6FF",-40);
function ShadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

// Create a hexadecimal colour based on a string
// https://stackoverflow.com/a/16348977/8581829
// Example: stringToColour("greenish"); -> #9bc63b
// function StringToColour(str) {
//   var hash = 0;
//   for (var i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   var colour = "#";
//   for (var i = 0; i < 3; i++) {
//     var value = (hash >> (i * 8)) & 0xff;
//     var tmp = "00" + value.toString(16);
//     colour += tmp.substring(tmp.length - 2, tmp.length);
//   }
//   return colour;
// }
