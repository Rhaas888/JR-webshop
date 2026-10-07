(function () {
  var card = document.querySelector("[data-shop-video]");
  if (!card) return;

  var video = card.querySelector("video");
  var canvas = card.querySelector("canvas");
  if (!video || !canvas) return;

  var ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  var width = 800;
  var height = 450;
  canvas.width = width;
  canvas.height = height;

  var seen = new Uint8Array(width * height);
  var mark = new Uint8Array(width * height);
  var guard = new Uint8Array(width * height);
  var qx = new Int32Array(width * height);
  var qy = new Int32Array(width * height);
  var playing = false;

  var clearBackdrop = function (data) {
    var n = width * height;
    var i;
    var p;
    var r;
    var g;
    var b;
    var mn;
    var x;
    var y;

    for (i = 0; i < n; i += 1) {
      p = i << 2;
      r = data[p];
      g = data[p + 1];
      b = data[p + 2];
      mn = r < g ? (r < b ? r : b) : (g < b ? g : b);
      // Light blue rulers and corner marks stay. The pale backdrop does not.
      if (b - r >= 9 && b + 2 >= g && mn > 80) mark[i] = 1;
      else mark[i] = 0;
    }

    guard.fill(0);
    for (i = 0; i < n; i += 1) {
      if (!mark[i]) continue;
      x = i % width;
      y = (i / width) | 0;
      guard[i] = 1;
      if (x > 0) guard[i - 1] = 1;
      if (x + 1 < width) guard[i + 1] = 1;
      if (y > 0) guard[i - width] = 1;
      if (y + 1 < height) guard[i + width] = 1;
      if (x > 0 && y > 0) guard[i - width - 1] = 1;
      if (x + 1 < width && y > 0) guard[i - width + 1] = 1;
      if (x > 0 && y + 1 < height) guard[i + width - 1] = 1;
      if (x + 1 < width && y + 1 < height) guard[i + width + 1] = 1;
    }

    seen.fill(0);
    var qe = 0;
    var consider = function (px, py) {
      var idx = py * width + px;
      if (seen[idx] || guard[idx]) return;
      var q = idx << 2;
      var rr = data[q];
      var gg = data[q + 1];
      var bb = data[q + 2];
      var lo = rr < gg ? (rr < bb ? rr : bb) : (gg < bb ? gg : bb);
      var hi = rr > gg ? (rr > bb ? rr : bb) : (gg > bb ? gg : bb);
      if (lo < 188 || hi - lo > 36) return;
      seen[idx] = 1;
      qx[qe] = px;
      qy[qe] = py;
      qe += 1;
    };

    for (x = 0; x < width; x += 1) {
      consider(x, 0);
      consider(x, height - 1);
    }
    for (y = 0; y < height; y += 1) {
      consider(0, y);
      consider(width - 1, y);
    }

    var qs = 0;
    while (qs < qe) {
      x = qx[qs];
      y = qy[qs];
      qs += 1;
      data[((y * width + x) << 2) + 3] = 0;
      if (x + 1 < width) consider(x + 1, y);
      if (x > 0) consider(x - 1, y);
      if (y + 1 < height) consider(x, y + 1);
      if (y > 0) consider(x, y - 1);
    }
  };

  var draw = function () {
    if (video.readyState < 2) return;
    var vw = video.videoWidth;
    var vh = video.videoHeight;
    if (!vw || !vh) return;
    ctx.drawImage(video, 0, 0, vw, vh, 0, 0, width, height);
    var frame = ctx.getImageData(0, 0, width, height);
    clearBackdrop(frame.data);
    ctx.putImageData(frame, 0, 0);
  };

  var tick = function () {
    if (!playing) return;
    draw();
    window.requestAnimationFrame(tick);
  };

  var start = function () {
    var pending = video.play();
    if (pending && pending.catch) pending.catch(function () {});
    if (playing) return;
    playing = true;
    window.requestAnimationFrame(tick);
  };

  video.addEventListener("loadeddata", function () {
    draw();
    start();
  });
  video.addEventListener("canplay", start);
  start();
})();
