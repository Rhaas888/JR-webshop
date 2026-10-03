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
  var qx = new Int32Array(width * height);
  var qy = new Int32Array(width * height);
  var playing = false;
  var frameReady = false;

  var clearBackdrop = function (data) {
    var n = width * height;
    seen.fill(0);
    var qe = 0;
    var consider = function (x, y) {
      var i = y * width + x;
      if (seen[i]) return;
      var p = i << 2;
      var r = data[p];
      var g = data[p + 1];
      var b = data[p + 2];
      var mn = r < g ? (r < b ? r : b) : (g < b ? g : b);
      var mx = r > g ? (r > b ? r : b) : (g > b ? g : b);
      if (mn < 188 || mx - mn > 32) return;
      seen[i] = 1;
      qx[qe] = x;
      qy[qe] = y;
      qe += 1;
    };

    var x;
    var y;
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
    ctx.drawImage(
      video,
      vw * 0.03,
      vh * 0.04,
      vw * 0.94,
      vh * 0.92,
      0,
      0,
      width,
      height
    );
    var frame = ctx.getImageData(0, 0, width, height);
    clearBackdrop(frame.data);
    ctx.putImageData(frame, 0, 0);
    frameReady = true;
  };

  var tick = function () {
    if (!playing) return;
    draw();
    window.requestAnimationFrame(tick);
  };

  var play = function () {
    var pending = video.play();
    if (pending && pending.catch) pending.catch(function () {});
    if (playing) return;
    playing = true;
    window.requestAnimationFrame(tick);
  };

  var pause = function () {
    playing = false;
    video.pause();
  };

  video.addEventListener("loadeddata", draw);
  video.addEventListener("seeked", function () {
    if (!playing) draw();
  });

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) {
    card.addEventListener("pointerenter", play);
    card.addEventListener("pointerleave", pause);
  } else if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play();
          else pause();
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(card);
  } else {
    play();
  }
})();
