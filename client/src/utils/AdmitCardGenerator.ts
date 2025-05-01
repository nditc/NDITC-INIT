import { getEventKey } from "@/api/events";

const DHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link rel="stylesheet" href="./main.css" /> -->
    <title>HTML</title>
    <style>
      @import 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap';
      @import 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap';
      @import 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
      *{
        color: black !important;
      }
      *,
      :before,
      :after {
        --tw-border-spacing-x: 0;
        --tw-border-spacing-y: 0;
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        --tw-gradient-from-position: ;
        --tw-gradient-via-position: ;
        --tw-gradient-to-position: ;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
        --tw-contain-size: ;
        --tw-contain-layout: ;
        --tw-contain-paint: ;
        --tw-contain-style: ;
      }
      ::backdrop {
        --tw-border-spacing-x: 0;
        --tw-border-spacing-y: 0;
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        --tw-pan-x: ;
        --tw-pan-y: ;
        --tw-pinch-zoom: ;
        --tw-scroll-snap-strictness: proximity;
        --tw-gradient-from-position: ;
        --tw-gradient-via-position: ;
        --tw-gradient-to-position: ;
        --tw-ordinal: ;
        --tw-slashed-zero: ;
        --tw-numeric-figure: ;
        --tw-numeric-spacing: ;
        --tw-numeric-fraction: ;
        --tw-ring-inset: ;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgb(59 130 246 / 0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-colored: 0 0 #0000;
        --tw-blur: ;
        --tw-brightness: ;
        --tw-contrast: ;
        --tw-grayscale: ;
        --tw-hue-rotate: ;
        --tw-invert: ;
        --tw-saturate: ;
        --tw-sepia: ;
        --tw-drop-shadow: ;
        --tw-backdrop-blur: ;
        --tw-backdrop-brightness: ;
        --tw-backdrop-contrast: ;
        --tw-backdrop-grayscale: ;
        --tw-backdrop-hue-rotate: ;
        --tw-backdrop-invert: ;
        --tw-backdrop-opacity: ;
        --tw-backdrop-saturate: ;
        --tw-backdrop-sepia: ;
        --tw-contain-size: ;
        --tw-contain-layout: ;
        --tw-contain-paint: ;
        --tw-contain-style: ;
      }
      *,
      :before,
      :after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: #e5e7eb;
      }
      :before,
      :after {
        --tw-content: '';
      }
      html,
      :host {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          Segoe UI Symbol, 'Noto Color Emoji';
        font-feature-settings: normal;
        font-variation-settings: normal;
        -webkit-tap-highlight-color: transparent;
      }
      body {
        margin: 0;
        line-height: inherit;
      }
      hr {
        height: 0;
        color: inherit;
        border-top-width: 1px;
      }
      abbr:where([title]) {
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }
      a {
        color: inherit;
        text-decoration: inherit;
      }
      b,
      strong {
        font-weight: bolder;
      }
      code,
      kbd,
      samp,
      pre {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
          Courier New, monospace;
        font-feature-settings: normal;
        font-variation-settings: normal;
        font-size: 1em;
      }
      small {
        font-size: 80%;
      }
      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
      sub {
        bottom: -0.25em;
      }
      sup {
        top: -0.5em;
      }
      table {
        text-indent: 0;
        border-color: inherit;
        border-collapse: collapse;
      }
      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-variation-settings: inherit;
        font-size: 100%;
        font-weight: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        color: inherit;
        margin: 0;
        padding: 0;
      }
      button,
      select {
        text-transform: none;
      }
      button,
      input:where([type='button']),
      input:where([type='reset']),
      input:where([type='submit']) {
        -webkit-appearance: button;
        background-color: transparent;
        background-image: none;
      }
      :-moz-focusring {
        outline: auto;
      }
      :-moz-ui-invalid {
        box-shadow: none;
      }
      progress {
        vertical-align: baseline;
      }
      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        height: auto;
      }
      [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }
      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }
      summary {
        display: list-item;
      }
      blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: 0;
      }
      fieldset {
        margin: 0;
        padding: 0;
      }
      legend {
        padding: 0;
      }
      ol,
      ul,
      menu {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      dialog {
        padding: 0;
      }
      textarea {
        resize: vertical;
      }
      input::-moz-placeholder,
      textarea::-moz-placeholder {
        opacity: 1;
        color: #9ca3af;
      }
      input::placeholder,
      textarea::placeholder {
        opacity: 1;
        color: #9ca3af;
      }
      button,
      [role='button'] {
        cursor: pointer;
      }
      :disabled {
        cursor: default;
      }
      img,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
        vertical-align: middle;
      }
      svg{
      display:inline-block;
      }
      img,
      video {
        max-width: 100%;
        height: auto;
      }
      [hidden]:where(:not([hidden='until-found'])) {
        display: none;
      }
      .visible {
        visibility: visible;
      }
      .collapse {
        visibility: collapse;
      }
      .absolute {
        position: absolute;
      }
      .relative {
        position: relative;
      }
      .bottom-\\[2\\%\\] {
        bottom: 2%;
      }
      .left-0 {
        left: 0;
      }
      .left-\\[7\\%\\] {
        left: 7%;
      }
      .right-4 {
        right: 1rem;
      }
      .right-\\[5\\%\\] {
        right: 5%;
      }
      .top-0 {
        top: 0;
      }
      .top-\\[10\\%\\] {
        top: 10%;
      }
      .top-\\[12\\%\\] {
        top: 12%;
      }
      .top-\\[25\\%\\] {
        top: 25%;
      }
      .-z-10 {
        z-index: -10;
      }
      .m-auto {
        margin: auto;
      }
      .mb-12 {
        margin-bottom: 3rem;
      }
      .mb-2 {
        margin-bottom: 0.5rem;
      }
      .mb-3 {
        margin-bottom: 0.75rem;
      }
      .mb-4 {
        margin-bottom: 1rem;
      }
      .mb-6 {
        margin-bottom: 1.5rem;
      }
      .block {
        display: block;
      }
      .flex {
        display: flex;
      }
      .table {
        display: table;
      }
      .grid {
        display: grid;
      }
      .contents {
        display: contents;
      }
      .hidden {
        display: none;
      }
      .aspect-\\[1\\/1\\.414\\] {
        aspect-ratio: 1/1.414;
      }
      .h-full {
        height: 100%;
      }
      .h-screen {
        height: 100vh;
      }
      .w-1 {
        width: 0.25rem;
      }
      .w-1\\/3 {
        width: 33.333333%;
      }
      .w-3 {
        width: 0.75rem;
      }
      .w-3\\/4 {
        width: 75%;
      }
      .w-\\[120px\\] {
        width: 120px;
      }
      .w-\\[48rem\\] {
        width: 48rem;
      }
      .w-\\[75\\%\\] {
        width: 75%;
      }
      .w-\\[80px\\] {
        width: 80px;
      }
      .w-fit {
        width: -moz-fit-content;
        width: fit-content;
      }
      .w-full {
        width: 100%;
      }
      .w-screen {
        width: 100vw;
      }
      .max-w-\\[100\\%\\] {
        max-width: 100%;
      }
      .border-collapse {
        border-collapse: collapse;
      }
      .transform {
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
          skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
          scaleY(var(--tw-scale-y));
      }
      .resize {
        resize: both;
      }
      .grid-cols-\\[3fr_1fr_10fr\\] {
        grid-template-columns: 3fr 1fr 10fr;
      }
      .grid-rows-4 {
        grid-template-rows: repeat(4, minmax(0, 1fr));
      }
      .flex-col {
        flex-direction: column;
      }
      .flex-wrap {
        flex-wrap: wrap;
      }
      .items-center {
        align-items: center;
      }
      .items-stretch {
        align-items: stretch;
      }
      .justify-center {
        justify-content: center;
      }
      .overflow-x-hidden {
        overflow-x: hidden;
      }
      .break-words {
        overflow-wrap: break-word;
      }
      .border {
        border-width: 1px;
      }
      .border-b-2 {
        border-bottom-width: 2px;
      }
      .border-zinc-300 {
        --tw-border-opacity: 1;
        border-color: rgb(212 212 216 / var(--tw-border-opacity, 1));
      }
      .border-zinc-400 {
        --tw-border-opacity: 1;
        border-color: rgb(161 161 170 / var(--tw-border-opacity, 1));
      }
      .p-16 {
        padding: 4rem;
      }
      .p-2 {
        padding: 0.5rem;
      }
      .py-1 {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      .py-2 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .text-center {
        text-align: center;
      }
      .text-2xl {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      .text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .text-xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      .font-bold {
        font-weight: 700;
      }
      .font-semibold {
        font-weight: 600;
      }
      .italic {
        font-style: italic;
      }
      .underline {
        text-decoration-line: underline;
      }
      .opacity-30 {
        opacity: 0.3;
      }
      .outline {
        outline-style: solid;
      }
      .font-exo-2 {
        font-family: 'Exo 2', Tahoma, Verdana, Roboto, sans-serif;
        font-optical-sizing: auto;
      }
      .font-orbitron {
        font-family: Orbitron, Tahoma, Verdana, Roboto, sans-serif;
        font-optical-sizing: auto;
      }
      .font-audiowide {
        font-family: Audiowide, Tahoma, Verdana, Roboto, sans-serif;
        font-weight: 400;
        font-style: normal;
      }
      img {
        display: inline;
      }
      .\\*\\:flex > * {
        display: flex;
      }
      .\\*\\:min-w-\\[25\\%\\] > * {
        min-width: 25%;
      }
      .\\*\\:flex-col > * {
        flex-direction: column;
      }
      .\\*\\:items-center > * {
        align-items: center;
      }
      .\\*\\:justify-center > * {
        justify-content: center;
      }
      .\\*\\:break-words > * {
        overflow-wrap: break-word;
      }
      .\\*\\:border-b-2 > * {
        border-bottom-width: 2px;
      }
      .\\*\\:border-zinc-300 > * {
        --tw-border-opacity: 1;
        border-color: rgb(212 212 216 / var(--tw-border-opacity, 1));
      }
      .\\*\\:py-1 > * {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      .\\*\\:py-2 > * {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .\\*\\:text-center > * {
        text-align: center;
      }
    </style>
</head>

  <body> {{body}} </body>
</html>
`;

export const AdmitHTMLGenerator = async (obj: any, qrSvg: string) => {
  let eventlist = Object.keys(obj.ParEvent.eventInfo).slice(2); //array of event names
  let teamNameList = obj.ParEvent.teamName; //object holding the teamnames
  let paidEvent = obj.ParEvent.paidEvent;
  let eventHtml = "";
  let soloPass = "";
  const { result } = await getEventKey();
  // cmnt
  for (let i = 0; i < eventlist.length; i++) {
    if (eventlist[i] === "soloPass") {
      soloPass = `<div
            class="w-full flex justify-center *:text-center items-center *:border-b-2 *:min-w-[25%] max-w-[100%] flex-wrap *:border-zinc-300 *:py-1 mb-6" >
            <p class="text-lg font-semibold w-full text-center">Solo Pass${
              paidEvent.soloPass
                ? ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" id="check">
  <path fill="#59d96c" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.536-13.536A1 1 0 0 1 16.95 9.88l-5.653 5.653-.004.004a.997.997 0 0 1-1.414 0l-.004-.004-2.825-2.825a1 1 0 1 1 1.414-1.414l2.122 2.121 4.95-4.95Z" clip-rule="evenodd"></path>
</svg>`
                : ``
            }</p>
            <p>IT olympiad </p>
            <p>Robotics Olympiad</p>
            <p>Google it</p>
            <p>Marvel-DC Quiz</p>
            <p>Anime Quiz</p>
            <p>Cipher-Decipher</p>
            <p>Cyber Security Olympiad</p></div>`;
    } else if (Object.keys(teamNameList).includes(eventlist[i])) {
      eventHtml += `<div class="w-1/3"><p class="w-full break-words">${result[eventlist[i]]?.name} ${
        paidEvent[eventlist[i]]
          ? ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" id="check">
  <path fill="#59d96c" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.536-13.536A1 1 0 0 1 16.95 9.88l-5.653 5.653-.004.004a.997.997 0 0 1-1.414 0l-.004-.004-2.825-2.825a1 1 0 1 1 1.414-1.414l2.122 2.121 4.95-4.95Z" clip-rule="evenodd"></path>
</svg>`
          : ``
      }</p><p class="text-sm">(${teamNameList[eventlist[i]]})</p></div>`;
    } else {
      eventHtml += `<div class="w-1/3"><p class="w-full break-words">${result[eventlist[i]]?.name} ${
        paidEvent[eventlist[i]]
          ? ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" id="check">
  <path fill="#59d96c" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.536-13.536A1 1 0 0 1 16.95 9.88l-5.653 5.653-.004.004a.997.997 0 0 1-1.414 0l-.004-.004-2.825-2.825a1 1 0 1 1 1.414-1.414l2.122 2.121 4.95-4.95Z" clip-rule="evenodd"></path>
</svg>`
          : ``
      }</p></div>`;
    }
  }

  const ret = `<div class="aspect-[1/1.414]  p-16 relative border">
    <div class="w-fit m-auto text-center mb-12">
    <p class="text-xl font-semibold mb-4 font-audiowide">UNITED INTERNATIONAL UNIVERSITY PRESENTS</p>
    <p class="text-3xl font-semibold mb-3 font-audiowide">INIT 5.0</p>
    <div class="mb-4">
    <p>Hosted by: Notre Dame Information Technology Club</p>
    <p>Location: Notre Dame College, Dhaka</p>
    <p>May 08-10, 2025</p>
    </div>
    <p class="font-bold text-xl">REGISTRATION CARD</p>
    </div>
    <div class="w-[75%] grid grid-rows-4 grid-cols-[3fr_1fr_10fr] *:py-2 mb-4"">
    <p class="font-bold">Name</p>
    <p>:</p>
    <p>${obj.fullName}</p>
    <p class="font-bold">Institute</p>
    <p>:</p>
    <p>${obj.institute}</p>
    <p class="font-bold">Class</p>
    <p>:</p>
    <p>${obj.className}</p>
    <p class="font-bold">User Code</p>
    <p>:</p>
    <p>${obj.userName}</p>
    </div>
    <h2 class="w-fit m-auto text-2xl font-bold mb-2">Event list</h2>
    ${soloPass}
    <div
    class="w-full flex justify-center *:text-center items-stretch *:border-b-2 flex-wrap *:border-zinc-300 *:py-1 *:flex *:flex-col *:justify-center *:items-center *:break-words">
    <p class="text-lg font-semibold w-full">Regular Events</p>
    ${eventHtml}
    </div>
    <div class="italic font-semibold border border-zinc-400 p-2 w-fit absolute bottom-[2%] left-[7%]">
    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" id="check">
  <path fill="#59d96c" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.536-13.536A1 1 0 0 1 16.95 9.88l-5.653 5.653-.004.004a.997.997 0 0 1-1.414 0l-.004-.004-2.825-2.825a1 1 0 1 1 1.414-1.414l2.122 2.121 4.95-4.95Z" clip-rule="evenodd"></path>
</svg> Payment verified</p>

    </div>
    <div class="w-fit absolute top-[25%] right-4 text-center">
    ${qrSvg}
    <div class="text-sm">Code: ${obj.qrCode}</div>
    </div>
    <div class="w-full h-full absolute top-0 left-0 flex justify-center items-center opacity-30 -z-10">
    <div class="w-3/4">
    <img src="/INIT_Icon.svg" width="500" alt="">
            </div>
        </div>
        <div class="w-[120px] absolute top-[12%] right-[5%]">
        <img src="/Logo.png" alt="NDITC logo">
        </div>
        <div class="w-[80px] absolute top-[10%] left-[7%]">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Notre_Dame_College%2C_Dhaka_Monogram.svg/1200px-Notre_Dame_College%2C_Dhaka_Monogram.svg.png" alt="NDITC logo">
            </div>
            </div>`;

  return DHTML.replace(`{{body}}`, ret).replaceAll(`\n`, ` `);
};
