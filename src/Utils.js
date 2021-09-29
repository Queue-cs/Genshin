import react from 'react';
import React from 'react';
import ReactMarkdown from 'react-markdown'

class Utils {
  FormatNumber(val) {
    return Math.round(val);
  }

  FormatPercent(val) {
    return this.FormatNumber(val * 100);
  }

  Format(val, type) {
    if (type.includes("P")) val *= 100;
    if (type.includes("F1")) {
      val *= 10;
      val = Math.round(val) / 10;
    } else {
      val = Math.round(val);
    }
    if (type.includes("P")) val += "%";
    return val;
  }

  StringFormat(effect, numbers) {
    if (effect === undefined || numbers.length === 0) return effect;
    for (let i = 0; i < numbers.length; i++) {
      const reg = new RegExp(`\\{${i}\\}`, 'g');
      const sub = `**${numbers[i]}**`;
      effect = effect.replace(reg, sub);
    }
    return effect;
  }

  FormatWSub(value, substat) {
    if (!value && value !== 0) return "N/A";
    const isPercent = substat !== "Elemental Mastery";
    const sub = this.Format(value, isPercent ? "P" : "I");
    return sub;
  }

  SimilarMaterial(a, b) {
    // false if 1 is a crown
    if (a.sortorder === 1856 || b.sortorder === 1856) return false;
    if (Math.abs(a.sortorder - b.sortorder) > 1) return false;
    if (a.rarity === b.rarity) return false;
    // check name?
    return true;
  }


  Markdown(string) {
    return <ReactMarkdown>
      {string.replaceAll("\n", "  \n")}
    </ReactMarkdown>
  }

  Redirect(history, loc) {
    const location = {
      pathname: loc,
      state: { fromDashboard: true }
    }
    history.push(location);
  }

  isPlainObject(obj) {
    if (react.isValidElement(obj)) {
      return false;
    }
    // Basic check for Type object that's not null
    if (typeof obj == 'object' && obj !== null) {

      // If Object.getPrototypeOf supported, use it
      if (typeof Object.getPrototypeOf == 'function') {
        var proto = Object.getPrototypeOf(obj);
        return proto === Object.prototype || proto === null;
      }

      // Otherwise, use internal class
      // This should be reliable as if getPrototypeOf not supported, is pre-ES5
      return Object.prototype.toString.call(obj) === '[object Object]';
    }

    // Not an object
    return false;
  }

}

export default new Utils();