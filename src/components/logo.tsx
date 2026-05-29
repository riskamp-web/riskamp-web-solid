
// why is this even a component, just include
// it as an svg?

export function Logo() {

  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="1em" height="1em" viewBox="0 0 170 170" enable-background="new 0 0 170 170" xml:space="preserve">
    <circle cx="85" cy="85" r="80" style="fill: var(--logo-background-color, none);"></circle>
    <path style="fill: var(--logo-color, #0477BE);" d="M85,0C38.056,0,0,38.056,0,85s38.056,85,85,85c46.944,0,85-38.056,85-85S131.944,0,85,0z M55,135H40V92h15
      V135z M80,135H65V62.333h15V135z M105,135H90V35h15V135z M130,135h-15V45.333h15V135z"/>
    </svg>
  );

}


