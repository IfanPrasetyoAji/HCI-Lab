// implementasi liquid glass, hasil reverse engineer dari shuttletv.su
// viva la piracy!

document.addEventListener("DOMContentLoaded", () => {
  const glassElements = document.querySelectorAll(".liquid-glass");

  // firefox kaga suport liquid glass
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const supportsCSS = window.CSS && window.CSS.supports;

  const supportsSvgBackdrop =
    supportsCSS &&
    !isFirefox &&
    (CSS.supports("backdrop-filter", "url(#test)") ||
      CSS.supports("-webkit-backdrop-filter", "url(#test)"));

  if (!supportsSvgBackdrop) {
    return;
  }

  const applyLiquidGlass = (el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const width = rect.width;
    const height = rect.height;

    const style = window.getComputedStyle(el);
    const radius = parseFloat(style.borderRadius) || 20;
    const filterId = `glass-filter-${index}`;

    const mapSVG = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
                    <defs>
                        <linearGradient id="red-grad-${index}" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stop-color="#000000"/>
                            <stop offset="100%" stop-color="#ff0000"/>
                        </linearGradient>
                        <linearGradient id="blue-grad-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#000000"/>
                            <stop offset="100%" stop-color="#0000ff"/>
                        </linearGradient>

                        <filter id="inner-blur-${index}" x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur stdDeviation="3" />
                        </filter>
                    </defs>

                    <rect x="0" y="0" width="${width}" height="${height}" fill="#000000" />

                    <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red-grad-${index})" />
                    <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue-grad-${index})" style="mix-blend-mode: screen;" />

                    <rect x="2" y="2"
                          width="${width - 4}"
                          height="${height - 4}"
                          rx="${radius}"
                          fill="rgb(128, 128, 128)"
                          filter="url(#inner-blur-${index})" />
                </svg>
            `;

    const encodedMap =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(mapSVG.trim());

    const filterHTML = `
            <filter id="${filterId}" color-interpolation-filters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" href="${encodedMap}"></feImage>

                <feDisplacementMap in="SourceGraphic" in2="map" id="redchannel" result="dispRed" scale="-180" xChannelSelector="R" yChannelSelector="B"></feDisplacementMap>
                <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"></feColorMatrix>

                <feDisplacementMap in="SourceGraphic" in2="map" id="greenchannel" result="dispGreen" scale="-170" xChannelSelector="R" yChannelSelector="B"></feDisplacementMap>
                <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green"></feColorMatrix>

                <feDisplacementMap in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" scale="-160" xChannelSelector="R" yChannelSelector="B"></feDisplacementMap>
                <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue"></feColorMatrix>

                <feBlend in="red" in2="green" mode="screen" result="rg"></feBlend>
                <feBlend in="rg" in2="blue" mode="screen" result="output"></feBlend>

                <feGaussianBlur in="output" stdDeviation="0.5"></feGaussianBlur>
            </filter>
        `;

    let localSvg = el.querySelector(":scope > .glass-svg");

    if (!localSvg) {
      const svgMarkup = `
                    <svg class="glass-svg"
                         xmlns="http://www.w3.org/2000/svg"
                         style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0; z-index: -10;"
                         aria-hidden="true">
                        <defs class="glass-defs"></defs>
                    </svg>
                `;
      el.insertAdjacentHTML("afterbegin", svgMarkup);
      localSvg = el.querySelector(":scope > .glass-svg");
    }

    const defs = localSvg.querySelector(".glass-defs");
    defs.innerHTML = filterHTML;

    el.style.backdropFilter = `url(#${filterId}) saturate(1.2)`;
    el.style.webkitBackdropFilter = `url(#${filterId}) saturate(1.2)`;
  };

  const resizeObserver = new ResizeObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      const elIndex = Array.from(glassElements).indexOf(entries[i].target);
      applyLiquidGlass(entries[i].target, elIndex);
    }
  });

  glassElements.forEach((el, index) => {
    applyLiquidGlass(el, index);
    resizeObserver.observe(el);
  });
});
