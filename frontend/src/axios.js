import axios from "axios";
axios
   .get("http://127.0.0.1:8000/api/")
   .then(resp => {
      console.log("Response", resp);
   })
   .catch(err => {
      console.log("Error", err.response.status);
   });
