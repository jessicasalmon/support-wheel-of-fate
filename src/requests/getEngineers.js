const getEngineers = new Promise((resolve, reject) => {
  fetch('/engineers', {
    credentials: 'include',
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  .then((res) => {
    return res.json();
  })
  .then(data => {
    return resolve(data);
  })
  .catch((error) => {
    console.log('has been an error')
  });
});

export default getEngineers;
