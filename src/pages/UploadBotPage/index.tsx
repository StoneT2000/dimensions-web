import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import DefaultLayout from "../../components/layouts/default";
import { Form, Input, Button, Upload, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Card from '../../components/Card';
import { useParams, useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import TournamentContext from '../../contexts/tournament';
import { uploadBot } from '../../actions/tournament';
import UserContext from '../../UserContext';
import path from 'path';


function UploadBotPage() {
  const { handleSubmit, control} = useForm();
  const [botFile, setFile] = useState<any>();
  const { tournament } = useContext(TournamentContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const params: any = useParams();
  useEffect(() => {
    !user.loggedIn && message.info('You need to login to upload a bot') &&
    history.push(path.join(window.location.pathname, '../../../login'));
  }, []);
  const onSubmit = (values: any) => {
    uploadBot(params.id, tournament.id, values.botname, botFile, user, values.path).then(() => {
      message.success('Succesfully uploaded bot');
    });
  }
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  
  const handleFileChange = (info: any) => {
    if (info.file.status === 'uploading') {
      // setLoading('loading');
    }
    if (info.file.status !== 'uploading') {

    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      let file: any = info.file;
      setFile(file.originFileObj);
    }
  }
  
  return (
    <DefaultLayout>
      <div className='UploadBotPage'>
        <Card className='upload-form-card'>
          <h2>Submit Bot</h2>
          <h4>For Tournament: {tournament.name}</h4>
          <br />
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller 
                as={
                  <Form.Item>
                    <Input
                      type='text'
                      placeholder='Bot Name'
                      name='botname'
                    />
                  </Form.Item>
                }
                control={control}
                rules={{ required: true }}
                name='botname'
              />
              <div className='upload-wrapper'>
                <Upload
                  
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  <Button className="upload-bot">
                    <UploadOutlined /> Click to upload bot
                  </Button>
                </Upload>
              </div>
              <Controller 
                as={
                  <Form.Item>
                    <Input
                      type='text'
                      placeholder='Bot Path'
                      name='path'
                    />
                  </Form.Item>
                }
                control={control}
                rules={{ required: true }}
                name='path'
              />
              <Button htmlType="submit" className='submit-button'>Submit</Button>
            </form>
          </Form>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default UploadBotPage
