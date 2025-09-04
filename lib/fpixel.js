export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
  window.fbq && window.fbq('track', 'PageView');
};

export const event = (name, options = {}) => {
  window.fbq && window.fbq('track', name, options);
};
