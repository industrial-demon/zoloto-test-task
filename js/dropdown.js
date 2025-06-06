class Dropdown extends HTMLElement  {
  details = document.createElement("details");

  constructor() {
    super();
    this.createDropdown();
  }

  createDropdown() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.details = document.createElement("details");
    const style = document.createElement("style");
    style.textContent = `
            :host {
              position: relative;
              display: flex;
              width:max-content;
            }

            details>summary {
              list-style: none;
            }
              
            details>summary::-webkit-details-marker {
              display: none;
            }

            summary {
            }
      `;
    this.summary = document.createElement("summary");
    const content = document.createElement("div");
    this.triggerSlot = document.createElement("slot");
    this.conetntSlot = document.createElement("slot");

    this.triggerSlot.name = "trigger";
    this.conetntSlot.name = "content";

    this.summary.appendChild(this.triggerSlot);
    content.appendChild(this.conetntSlot);
    this.details.appendChild(this.summary);
    this.details.appendChild(content);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this.details);
  }

  outsideClick = (evt) => {
    if (!evt.composedPath().includes(this.details)) {
      this.details.removeAttribute("open");
    }
  };

  toggle = (evt) => {
    if (evt.newState === "open") {
      this.triggerSlot.assignedElements()[0]?.classList.add("is-open");
    } else {
      this.triggerSlot.assignedElements()[0]?.classList.remove("is-open");
    }
  };

  onItemClick = (evt) => {
    const listId = evt.target.dataset.listId;
    if (listId) {
      this.details.removeAttribute("open");
    }
  };

  connectedCallback() {
    this.details.addEventListener("toggle", this.toggle);
    this.conetntSlot.addEventListener("click", this.onItemClick);
    document.addEventListener("click", this.outsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.outsideClick);
  }
}

customElements.define("dropdown-list", Dropdown);
