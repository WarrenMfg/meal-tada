export const parseAndHandleErrors = async res => {
  if (res.ok) {
    return await res.json();
  } else {
    throw await res.json();
  }
};

export const updateMeta = ({ title, description, image }) => {
  const meta = document.head.getElementsByTagName('meta');
  meta.namedItem('ogTitle').setAttribute('content', title);
  meta.namedItem('ogImage').setAttribute('content', image);
  meta.namedItem('ogDescription').setAttribute('content', description);
  meta.namedItem('description').setAttribute('content', description);
  meta.namedItem('twitter:title').setAttribute('content', title);
  meta.namedItem('twitter:image').setAttribute('content', image);
  meta.namedItem('twitter:description').setAttribute('content', description);
};
