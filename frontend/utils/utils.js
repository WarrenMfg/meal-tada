export const parseAndHandleErrors = async res => {
  if (res.ok) {
    return await res.json();
  } else {
    throw await res.json();
  }
};

export const wait = async ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

export const updateMeta = ({ title, description, image }) => {
  const jpg = `${image}.jpg`;

  const meta = document.head.getElementsByTagName('meta');
  meta.namedItem('ogUrl').setAttribute('content', window.location.href);
  meta.namedItem('ogTitle').setAttribute('content', title);
  meta.namedItem('ogImage').setAttribute('content', jpg);
  meta.namedItem('ogDescription').setAttribute('content', description);
  meta.namedItem('description').setAttribute('content', description);
  meta.namedItem('twitter:title').setAttribute('content', title);
  meta.namedItem('twitter:image').setAttribute('content', jpg);
  meta.namedItem('twitter:description').setAttribute('content', description);

  const canonical = document.head.querySelector('link[rel="canonical"]');
  canonical.href = window.location.href;
};
