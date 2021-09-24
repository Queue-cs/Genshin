import { makeAutoObservable, toJS } from "mobx";

import changeLog from '../changeLog.json';

class Store {
  lastVisitVersion = "0";
  windowWidth = 0;

  ready = false;
  needsSave = false;

  constructor() {
    makeAutoObservable(this, { needsSave: false }, { autoBind: true });
    this.Load();
    setInterval(this.Save, 5000);
    window.addEventListener("beforeunload", () => {
      this.ForceSave();
    })
    window.addEventListener("resize", () => {
      this.Update({
        windowWidth: window.innerWidth
      });
    });
    this.windowWidth = window.innerWidth;
  }

  Save() {
    if (!this.needsSave) return;
    this.needsSave = false;
    localStorage.setItem("local", JSON.stringify(this.toOBJ));
  }

  Load() {
    const storedLocal = JSON.parse(localStorage.getItem("local") || "{}");
    this.FromOBJ(storedLocal);
    this.ready = true;
  }

  Defaults() {
    return {
      lastVisitVersion: "0"
    }
  }

  get toOBJ() {
    // const data = toJS(this);
    return {
      lastVisitVersion: changeLog.currentVersion
    }
  }

  FromOBJ(obj) {
    let changes = this.Defaults();
    for (const key in changes) {
      if (obj.hasOwnProperty(key)) {
        changes[key] = obj[key];
      }
    }
    this.Update(changes);
  }

  Update(state) {
    for (const key in state) {
      if (this.hasOwnProperty(key)) {
        this[key] = state[key];
      }
    }
    this.needsSave = true;
  }

  ForceSave() {
    this.needsSave = true
    this.Save();
  }

  get isXS() {
    return this.windowWidth < 576;
  }

  get isMD() {
    return this.windowWidth >= 576 && this.windowWidth < 768;
  }

  get isLG() {
    return this.windowWidth >= 768;
  }

  get outDated() {
    return this.lastVisitVersion !== changeLog.currentVersion;
  }

  get isReady() {
    return this.ready;
  }
}

export default new Store();