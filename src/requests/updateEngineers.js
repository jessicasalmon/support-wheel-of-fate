const updateEngineers = (engineers, shiftToday, shiftYesterday) => {
  return new Promise((resolve, reject) => {

    fetch('/engineers/update', {
      method: 'post',
      body: JSON.stringify({ engineers, shiftToday, shiftYesterday}),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res;
      console.log('successfully updated');
    })
    .catch((error) => {
      console.error('error occurred updating data')
    })
  })
}
export default updateEngineers;
