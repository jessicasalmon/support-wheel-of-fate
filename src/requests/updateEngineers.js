const updateEngineers = (engineers) => {
  return new Promise((resolve, reject) => {

    fetch('/engineers/update', {
      method: 'post',
      body: JSON.stringify(engineers),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res, 'logging the res <<<<');
    })
    .catch((error) => {
      console.log('error occurred updating data')
    })
  })
}
export default updateEngineers;
