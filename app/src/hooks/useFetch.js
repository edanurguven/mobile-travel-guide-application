import {useState, useEffect} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

function useFetch(endpoint, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('ip address : ', Config.IP_ADDRESS + endpoint);
      const {data: responseData} = await axios[!!body ? 'post' : 'get'](
        'http://192.168.91.236:3030' + endpoint,
        body,
      );

      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.error('useFetch error =>', error.message);
      setLoading(false);
    }
  };
  return {error, loading, data};
}

export default useFetch;
