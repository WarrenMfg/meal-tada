import React from 'react';

export const parseAndHandleErrors = async res => {
  if (res.ok) {
    return await res.json();
  } else {
    throw await res.json();
  }
};
