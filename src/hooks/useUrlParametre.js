import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useUrlParametre() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const obj = {};
  params.forEach(function (value, key) {
    obj[key] = value.split(',');
  });

  return obj;
}
