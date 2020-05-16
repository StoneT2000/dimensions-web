import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import DefaultLayout from "../../components/layouts/default";
import { Form, Input, Button, Upload, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Card from '../../components/Card';
import { useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import TournamentContext from '../../contexts/tournament';
import { uploadBot } from '../../actions/tournament';
import UserContext from '../../UserContext';
function UploadBotPage(props: any) {
  const { register, handleSubmit, errors, control, setValue, getValues } = useForm();
  const [botFile, setFile] = useState<any>();
  const { tournament } = useContext(TournamentContext);
  const { user } = useContext(UserContext);
  const params: any = useParams();
  useEffect(() => {
    console.log(tournament);
  }, []);
  const onSubmit = (values: any) => {
    console.log(values);
    console.log(botFile);
    uploadBot(params.id, tournament.id, values.botname, botFile, user, values.path).then(() => {
      message.success('Succesfully uploaded bot');
    });
  }
  const dummyRequest = ({ file, onSuccess }: any) => {
    console.log(file, onSuccess);
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  
  const handleFileChange = (info: any) => {
    if (info.file.status === 'uploading') {
      // setLoading('loading');
    }
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
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
              <Upload
                className='upload-wrapper'
                onChange={handleFileChange}
                customRequest={dummyRequest}
              >
                <Button className="upload-bot">
                  <UploadOutlined /> Click to upload bot
                </Button>
              </Upload>
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
