export default class Utils {
  static getCurrentYear() {
    let date = new Date();
    let year = date.getFullYear();
    return year;
  }

  static getCurrentDateInFrench() {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }

  static Ucase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static format_number(n) {
    const s = String(n);
    const [intPart, fracPart] = s.split(".");
    const intWithSpace = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return fracPart ? `${intWithSpace}.${fracPart}` : intWithSpace;
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static downloadJSON(data, filename = "data.json") {
    const json = JSON.stringify(data, null, 2);

    if (window.AndroidShare?.shareJSON) {
      window.AndroidShare.shareJSON(json, filename);
      return;
    }

    // Browser fallback
    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  static importJSON() {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = ".json,application/json";

      input.onchange = async () => {
        const file = input.files[0];

        if (!file) {
          reject(new Error("No file selected."));
          return;
        }

        try {
          const text = await file.text();
          const data = JSON.parse(text);
          resolve(data);
        } catch (error) {
          reject(new Error("Invalid JSON file: " + error.message));
        }
      };

      input.click();
    });
  }
}

/*
async function handleImport() {
    try {
        const data = await importJSON();

        console.log(data);
        // Use the imported object here
    } catch (error) {
        console.error(error.message);
    }
}

handleImport();
*/
