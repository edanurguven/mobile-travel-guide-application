import {useState, useEffect} from 'react';
import axios from 'axios';

function useFetchPost(endpoint, apiData) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    try {
      const {data: responseData} = await axios.post(
        'http://192.168.91.236:3030' + endpoint,
        apiData,
      );
      console.log('Response Data : ' + responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {data, loading, error};
}

export default useFetchPost;
