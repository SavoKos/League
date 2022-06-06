import { useState } from 'react';
import axios from '../../utils/axiosBackend';
import { useNavigate } from 'react-router-dom';
import Styled from './register.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Spinner from '../../components/Spinner';

axios.defaults.withCredentials = true;

export const Register = ({ podaci, value, pageNavigate, url, method }) => {
  let navigate = useNavigate();

  console.log(method, url);

  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  console.log(data);

  const Submit = (e) => {
    e.preventDefault();
    if (!data) return setError('Please enter data!');
    setLoading(true);
    const formData = new FormData();
    formData.append('image', data.image);

    axios
      .request({ url, data, method })
      .then(() => navigate(pageNavigate, { replace: true }))
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const newValue = (e) => setData({ ...data, [e.target.name]: e.target.value });
  if (loading) return <Spinner />;

  return (
    <form className={Styled.form} onSubmit={Submit}>
      {podaci.map((data) => {
        return (
          <TextField
            key={data.id}
            label={data.label || data.name}
            type={data.type}
            placeholder={data.placeholder || data.name}
            name={data.name}
            onChange={newValue}
            className={Styled.field}
            required={data.required}
          />
        );
      })}
      {error && <p>{error}</p>}
      <Button
        style={{
          padding: 15,
          marginBottom: 10,
          width: '100%',
          fontWeight: 'bold',
          marginTop: '0.3rem',
        }}
        type='submit'
        variant='contained'
        color='primary'
      >
        {value}
      </Button>
    </form>
  );
};
