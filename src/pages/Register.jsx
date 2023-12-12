import { useCallback, useRef, useState } from 'react';
import Add from '../img/addAvatar.png';
import pb from '../pocketbase';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    name: ''
  });

  let test = useRef('yannick');
  const onChange = (e) => {
    const { name, value } = e.target;
    test = test.current = 'christian';
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});

  const file = useRef(null);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = 'username is required';
    }

    console.log(test.current);

    if (!formData.email.trim()) {
      validationErrors.email = 'email is required';
    }
    else if (/\S+@\S\.\S+/.test(formData.email)) {
      validationErrors.email = 'email is not valid';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'password is required';
    }
    else if (formData.password.length < 6) {
      validationErrors.password = 'password should be at least 6 characters';
    }

    if (formData.passwordConfirm !== formData.password) {
      validationErrors.passwordConfirm = 'password not matching';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const record = pb.collection('users').create(formData);
        const authData = pb.collection('users').authWithPassword(record.email, record.password);
      }
      catch (exception) {
        console.log(exception);
      }
    }

    // Const username = e.target.elements.username.value;
    // const email = e.target.elements.email.value;
    // const password = e.target.elements.password.value;

    // const data = {
    //   'username': username,
    //   'email': email,
    //   'emailVisibility': true,
    //   'password': password,
    //   'passwordConfirm': password,
    //   'name': username,
    //   'avatar': file.current.files[0]
    // };

  }, [formData, test]);

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Sushi Chat</span>
        <span className="title">Register</span>
        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            autoComplete='off'
            onChange={onChange}
          />
          {errors.username && <span>errors.username</span>}

          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete='off'
            onChange={onChange}
          />
          {errors.email && <span>errors.email</span>}

          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
          />
          {errors.password && <span>errors.password</span>}

          <input
            type="passwordConfirm"
            name="passwordConfirm"
            placeholder="confirm password"
            onChange={onChange}
          />
          {errors.passwordConfirm && <span>errors.passwordConfirm</span>}

          <input
            style={{ display: 'none' }}
            ref={file}
            name="file"
            type="file"
            id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          <button type="submit">Sign Up</button>
        </form>
        <div>
          {JSON.stringify(formData)}
        </div>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
