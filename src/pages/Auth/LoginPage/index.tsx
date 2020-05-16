import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import DefaultLayout from "../../../components/layouts/default";
import Card from '../../../components/Card';
import { Form, Input, message, Button } from 'antd';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import { loginUser, getUserFromToken } from '../../../actions/auth';
import { useParams, useHistory, Link } from 'react-router-dom';
import UserContext from '../../../UserContext';

function LoginPage() {
  let {user, setUser} = useContext(UserContext);
  const params: any = useParams();
  const history = useHistory();
  const { handleSubmit, errors, control } = useForm();
  const [registerStep, setRegisterStep] = useState('start');
  const onSubmit = (values: any) => {
    // update step
    setRegisterStep('processing');
    
    console.log(values);
    loginUser(params.id, values).then((res: any) => {
      setUser(getUserFromToken(res));
      message.success('Logged in!');
      history.push('/dimensions/' + params.id);
    });
  }
  useEffect(() => {
    user.loggedIn && message.info('Already logged in!') && history.push('/dimensions/' + params.id);
  }, []);
  return (
    <DefaultLayout>
      <div className='LoginPage'>
        <Card className="loginCard">
          <div className="cardContent">
            <h2>Login</h2>
            <br />
            <Form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                  as={
                    <Form.Item>
                      <Input
                        type='text'
                        placeholder='Username'
                        name='username'
                      />
                    </Form.Item>
                  }
                  control={control}
                  rules={{ required: true }}
                  name='username'
                />
                <Controller 
                  as={
                    <Form.Item>
                      <Input.Password
                        type='password'
                        placeholder='Password'
                        name='password'
                      />
                    </Form.Item>
                  }

                  name='password'
                  control={control}
                  rules={{ required: true }}
                />

              
              {errors.username && <p className='danger'>Missing username</p>}
              {errors.password && (
                (errors.password.type === 'required' && <p className='danger'>Password is required</p>)
              )}
              <Button htmlType="submit" className='loginButton'>Login</Button>
              </form>
            </Form>
            <div className='register-info'>
              <Link to='./register'>Or Register an Account for Dimension ({params.id}) here</Link>
            </div>
          </div>
        </Card>
      </div>
    </DefaultLayout>
  );
}
export default LoginPage
