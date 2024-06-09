export const GA_TRACKING_ID = "G-Z470NDBRNE";

export const commandEvent = (command: string) => {
  if (typeof window === "undefined") return;

  window.gtag("event", "command", {
    event_category: "Terminal",
    event_label: command,
    value: 1,
  });
};
