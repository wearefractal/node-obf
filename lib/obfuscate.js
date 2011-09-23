maRainey = function (v) {
    var o = '';
    for (var i = 0; i < v; i++) {
        o += String.fromCharCode(92);
    }
    return o;
}
module.exports.obfuscate = function (glob, code) {
  var r = '';
  var n;
  var t;
  var b = ["___", "__$", "_$_", "_$$", "$__", "$_$", "$$_", "$$$", "$___", "$__$", "$_$_", "$_$$", "$$__", "$$_$", "$$$_", "$$$$"];
  var s = '';
  for (var i = 0; i < code.length; i++) {
    n = code.charCodeAt(i);
    if (n == 0x22 || n == 0x5c) {
      s += maRainey(3) + code.charAt(i).toString(16);
    } else if ((0x21 <= n && n <= 0x2f) || (0x3A <= n && n <= 0x40) || (0x5b <= n && n <= 0x60) || (0x7b <= n && n <= 0x7f)) {
      s += code.charAt(i);
    } else if ((0x30 <= n && n <= 0x39) || (0x61 <= n && n <= 0x66)) {
      if (s) r += '"' + s + '"+';
      r += glob + '.' + b[n < 0x40 ? n - 0x30 : n - 0x57] + '+';
      s = "";
    } else if (n == 0x6c) { 
      if (s) r += '"' + s + '"+';
      r += '(![]+"")[' + glob + '._$_]+';
      s = "";
    } else if (n == 0x6f) {
      if (s) r += '"' + s + '"+';
      r += glob + "._$+";
      s = "";
    } else if (n == 0x74) {
      if (s) r += '"' + s + '"+';
      r += glob + ".__+";
      s = "";
    } else if (n == 0x75) {
      if (s) r += '"' + s + '"+';
      r += glob + "._+";
      s = "";
    } else if (n < 128) {
      if (s) r += '"' + s;
      else r += '"';
      r += maRainey(2) + '"+' + n.toString(8).replace(/[0-7]/g, function (c) {
        return glob + '.' + b[c] + '+'
      });
      s = "";
    } else {
      if (s) r += '"' + s;
      else r += '"';
      r += maRainey(2) + '"+' + glob + '._+' + n.toString(16).replace(/[0-9a-f]/gi, function (c) {
        return glob + '.' + b[parseInt(c, 16)] + '+'
      });
      s = "";
    }
  }
  if (s) r += '"' + s + '"+';
  r = glob + "=~[];" + glob + "={___:++" + glob + ',$$$$:(![]+"")[' + glob + "],__$:++" + glob + ',$_$_:(![]+"")[' + glob + "],_$_:++" + glob + ',$_$$:({}+"")[' + glob + "],$$_$:(" + glob + "[" + glob + ']+"")[' + glob + "],_$$:++" + glob + ',$$$_:(!""+"")[' + glob + "],$__:++" + glob + ",$_$:++" + glob + ',$$__:({}+"")[' + glob + "],$$_:++" + glob + ",$$$:++" + glob + ",$___:++" + glob + ",$__$:++" + glob + "};" + glob + ".$_=" + "(" + glob + ".$_=" + glob + '+"")[' + glob + ".$_$]+" + "(" + glob + "._$=" + glob + ".$_[" + glob + ".__$])+" + "(" + glob + ".$$=(" + glob + '.$+"")[' + glob + ".__$])+" + "((!" + glob + ')+"")[' + glob + "._$$]+" + "(" + glob + ".__=" + glob + ".$_[" + glob + ".$$_])+" + "(" + glob + '.$=(!""+"")[' + glob + ".__$])+" + "(" + glob + '._=(!""+"")[' + glob + "._$_])+" + glob + ".$_[" + glob + ".$_$]+" + glob + ".__+" + glob + "._$+" + glob + ".$;" + glob + ".$$=" + glob + ".$+" + '(!""+"")[' + glob + "._$$]+" + glob + ".__+" + glob + "._+" + glob + ".$+" + glob + ".$$;" + glob + ".$=(" + glob + ".___)[" + glob + ".$_][" + glob + ".$_];" + glob + ".$(" + glob + ".$(" + glob + '.$$+"' + maRainey(1) + '""+' + r + '"' + maRainey(1) + '"")())();';
  return r;
}
