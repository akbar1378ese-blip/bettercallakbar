import Request from "./Request";

export default class GetInfoRequest extends Request {
  static getBaseUrl() {
    return import.meta.env?.VITE_PANEL_DOMAIN || window.location.origin;
  }

  static getCurrentSubscriptionPathname() {
    return window.location.pathname.split("#")[0].replace(/\/+$/, "");
  }

  static getCurrentSubscriptionUrl() {
    return `${GetInfoRequest.getBaseUrl()}${GetInfoRequest.getCurrentSubscriptionPathname()}`;
  }

  static getCurrentSubId() {
    const pathname = GetInfoRequest.getCurrentSubscriptionPathname();
    const match = pathname.match(/\/sub\/([^/?#]+)/);

    if (match?.[1]) {
      return decodeURIComponent(match[1]);
    }

    const parts = pathname.split("/").filter(Boolean);
    return parts.length ? decodeURIComponent(parts[parts.length - 1]) : "";
  }

  static getJsonUrl() {
    const subId = GetInfoRequest.getCurrentSubId();

    if (subId) {
      return `${GetInfoRequest.getBaseUrl()}/json/${encodeURIComponent(subId)}`;
    }

    return `${GetInfoRequest.getCurrentSubscriptionUrl()}/json`;
  }

  static async getInfo() {
    try {
      const response = await GetInfoRequest.send(
        `${GetInfoRequest.getCurrentSubscriptionUrl()}/info`,
        "GET",
        {},
        {
          toastError: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching info:", error);
      throw error;
    }
  }

  static async getConfigs() {
    try {
      const response = await GetInfoRequest.send(
        `${GetInfoRequest.getCurrentSubscriptionUrl()}`,
        "GET",
        {},
        {
          toastError: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching configs:", error);
      throw error;
    }
  }

  static async getJsonConfig() {
    try {
      const response = await GetInfoRequest.send(
        GetInfoRequest.getJsonUrl(),
        "GET",
        {
          headers: {
            Accept: "application/json",
          },
        },
        {
          toastError: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching JSON config:", error);
      throw error;
    }
  }
}
