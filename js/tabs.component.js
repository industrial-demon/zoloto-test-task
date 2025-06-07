class TabsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
        }
        .tabs {
          display: flex;
          border-bottom: 2px solid #ccc;
        }
        .tab {
          padding: 0.5rem 1rem;
          cursor: pointer;
          border: none;
          background: none;
          border-bottom: 2px solid transparent;
          font-weight: 600;
          font-size: 17px;
          line-height: 21px;
          width: 50%;
        }
        .tab[aria-selected="true"] {
          border-color: #DD2A00;
          color: #000000;
        }
        .tabpanels > div {
          display: none;
          padding: 1rem 0;
        }
        .tabpanels > div[active] {
          display: block;
        }
      </style>
    `;

    this.tabs = document.createElement("div");
    this.tabs.role = "tablist";
    this.tabs.classList.add("tabs");

    this.tabPanels = document.createElement("div");
    this.tabPanels.classList.add("tabpanels");
    this.shadowRoot.appendChild(this.tabs);
    this.shadowRoot.appendChild(this.tabPanels);
  }

  connectedCallback() {
    this.tabs = Array.from(this.querySelectorAll("tab-item"));
    this.tabList = this.shadowRoot.querySelector(".tabs");
    this.tabPanels = this.shadowRoot.querySelector(".tabpanels");

    console.log(this.tabs);

    this.tabs.forEach((tab, index) => {
      const label = tab.getAttribute("label") || `Tab ${index + 1}`;
      const tabButton = document.createElement("button");
      tabButton.setAttribute("role", "tab");
      tabButton.setAttribute("aria-selected", index === 0);
      tabButton.setAttribute("tabindex", index === 0 ? "0" : "-1");
      tabButton.className = "tab";
      tabButton.textContent = label;
      tabButton.addEventListener("click", () => this.selectTab(index));
      this.tabList.appendChild(tabButton);

      const panel = document.createElement("div");
      const slot = document.createElement("slot");
      slot.name = `${index}-panel`;
      panel.setAttribute("role", "tabpanel");
      panel.appendChild(slot);
      tab.slot = slot.name;
      if (index === 0) panel.setAttribute("active", "");
      this.tabPanels.appendChild(panel);
    });

    this.shadowRoot.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }

  selectTab(index) {
    const tabButtons = this.tabList.querySelectorAll(".tab");
    const panels = this.tabPanels.querySelectorAll('[role="tabpanel"]');

    tabButtons.forEach((btn, i) => {
      btn.setAttribute("aria-selected", i === index);
      btn.setAttribute("tabindex", i === index ? "0" : "-1");
    });

    panels.forEach((panel, i) => {
      if (i === index) {
        panel.setAttribute("active", "");
      } else {
        panel.removeAttribute("active");
      }
    });

    tabButtons[index].focus();
  }

  handleKeyDown(e) {
    const keys = ["ArrowRight", "ArrowLeft"];
    if (!keys.includes(e.key)) return;

    const tabs = Array.from(this.tabList.querySelectorAll(".tab"));
    const currentIndex = tabs.findIndex((tab) => tab === this.shadowRoot.activeElement);
    const nextIndex = e.key === "ArrowRight" ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length;

    this.selectTab(nextIndex);
    e.preventDefault();
  }
}

customElements.define("tabs-component", TabsComponent);
