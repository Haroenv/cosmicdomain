export const GetData = () => {
   return fetch("http://127.0.0.1:8000/api/")
      .then(res => res.json())
      .then(data => data.result.store)
      .catch(err => err);
};

export default GetData;
