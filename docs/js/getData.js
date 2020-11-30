"use strict";

const getData = async url => {
  const responce = await fetch(url);
  const data = await responce.json();
  return data;
};

export { getData };