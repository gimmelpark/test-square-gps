//118

class FakeBackend {
  static #localStorageKey = "fakeApiData";

  static #delay = 200;

  static #setAllData(value) {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(value));
  }

  static #getAllData() {
    return JSON.parse(localStorage.getItem(this.#localStorageKey)) ?? {};
  }

  static #getResponse(data, statusCode = 200) {
    return {
      data,
      statusCode,
    };
  }

  static #getErrorResponse(error = "Bad request", statusCode = 400) {
    return {
      error,
      statusCode,
    };
  }

  static #doRequest(cb) {
    const getTimeoutFunction =
      (fn) =>
      (...args) =>
        setTimeout(fn.bind(this, ...args), this.#delay);

    return new Promise((resolve, reject) => {
      try {
        cb(getTimeoutFunction(resolve), getTimeoutFunction(reject));
      } catch (error) {
        getTimeoutFunction(reject)(this.#getErrorResponse(error, 500));
      }
    });
  }

  static post(url, addedItem) {
    return this.#doRequest((resolve, reject) => {
      if (!url || !addedItem) {
        reject(this.#getErrorResponse());
      }

      const allData = this.#getAllData();

      let newItem;

      if (allData[url] && Array.isArray(allData[url])) {
        const newItemId =
          allData[url].reduce((acc, item) => Math.max(acc, item.id), 0) + 1;

        newItem = {
          ...addedItem,
          id: newItemId,
        };

        allData[url].push(newItem);
      } else {
        newItem = {
          ...addedItem,
          id: 1,
        };

        allData[url] = [newItem];
      }

      this.#setAllData(allData);

      resolve(this.#getResponse(newItem));
    });
  }

  static get(url, foundId = null) {
    return this.#doRequest((resolve, reject) => {
      if (!url) {
        reject(this.#getErrorResponse());
      }

      const allData = this.#getAllData();

      const data = allData[url] ?? [];

      if (foundId === null) {
        resolve(this.#getResponse(data));
      } else {
        const foundItem = data.find(({ id }) => foundId === id);

        if (foundItem) {
          resolve(this.#getResponse(foundItem));
        } else {
          reject(this.#getResponse("Not found", 404));
        }
      }
    });
  }

  static delete(url, deletedId) {
    return this.#doRequest((resolve, reject) => {
      if (!url || !deletedId) {
        reject(this.#getErrorResponse());
      }

      const allData = this.#getAllData();

      if (allData[url] && Array.isArray(allData[url])) {
        allData[url] = allData[url].filter(({ id }) => id !== deletedId);

        this.#setAllData(allData);
      }

      resolve(this.#getResponse(deletedId));
    });
  }
}

export default FakeBackend;
