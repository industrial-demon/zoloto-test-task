class CollapsibleList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.mediaQuery = window.matchMedia("(max-width: 1200px)");
  }

  connectedCallback() {
    this.props = JSON.parse(this.getAttribute("props") || "{}");
    this.render();
    this.mediaQuery.addEventListener("change", this.resize);

    const trigger = this.shadowRoot.querySelector(`#trigger`);
  }

  resize = () => {
    this.render();
  };

  toggle = () => {
    const list = this.shadowRoot.querySelector(`#list`);

    const isHidden = Array.from(list.classList).includes("hide");
    if (isHidden) {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  };

  render() {
    const isMobile = this.mediaQuery.matches;

    const arrowDown = isMobile
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6572 15.2798L12.3281 15.9497L18.6924 9.58549C17.9114 8.80485 16.6452 8.80483 15.8643 9.58549L12.3271 13.1226L8.82812 9.6226C8.0471 8.84186 6.78097 8.84176 6 9.62259L11.6572 15.2798Z" fill="black"/>
</svg>`
      : "";

    const style = `
      <style>
        
        .hide {
          display: none;
        }

        .heading {
            cursor: ${isMobile ?"pointer": "static" };
            font-family: "Montserrat";
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            min-width: 120px;
         }

        .menu-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          row-gap: 16px;
          margin: 16px 0 0 0;
          padding: 0;
         }

         .hide {
            display: none !important;
          }

        .list-item { 
          font-family: "Roboto Flex";
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #747474;
        }
        
      </style>
    `;

    const html = this.props.items
      .map(
        (item, i) => `
          <li class="list-item"> ${item.title} </li>
      `
      )
      .join("");

    this.shadowRoot.innerHTML = `${style}
    <div>
        <div class="heading" id="trigger">
              ${this.props.heading}
              ${arrowDown}
        </div>
        <ul class="menu-list" id="list">
          ${html}
        </ul>
    </div>`;

    if (isMobile) {
      this.shadowRoot.querySelector(`#list`).classList.add("hide");
      this.shadowRoot.querySelector(`#trigger`).addEventListener("click", this.toggle);
    }
  }
}

customElements.define("collapsible-list", CollapsibleList);
