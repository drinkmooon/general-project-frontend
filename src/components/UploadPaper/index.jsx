import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Avatar, Modal, Button, Form, Input, Upload, message } from 'antd';
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { getAuthority } from '@/utils/authority';
import { uploadPaperFile, uploadPaper } from '@/services/paper';

const { Item } = Form;
export default connect(({ login }) => ({ currentUser: login.currentUser }))(function ({
  currentUser,
}) {
  const [modalVisible, setMV] = useState(false);
  const [compVisible, setCompVis] = useState('guest');
  const [_, setFile] = useState() 
  useEffect((_) => {
    const authority = getAuthority()[0];
    if (authority !== 'guest') {
      setCompVis(authority);
    }
  }, []);
  const normFile = e => {
    if(Array.isArray(e)){
      return e
    }
    return e?.fileList;
  }
  const onFinish = (v) => {
    const copy = {...v,instructorId:Number(v.instructorId),writerId: Number(compVisible === 'Member' ? currentUser.id : v.writerId),deptId: Number(compVisible === 'Member' ? currentUser.deptId : v.deptId),}
    delete copy.upload;
    uploadPaper(copy).then(res=>{
      if(res.isSuccess){
        uploadPaperFile(res.papper.url,v.upload[0].originFileObj).then(_=>{
          message.success('上传成功')
          setMV(false)
        })
      }
    })
  };
  return (
    compVisible !== 'guest' && (
      <>
        <div
          style={{
            position: 'fixed',
            right: 32,
            bottom: 102,
            zIndex: 2147483640,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer'}}
          onClick={() => {
            setMV(true);
          }}
        >
          <Avatar size={'large'} style={{backgroundColor:'#53618a'}} icon={<PlusCircleOutlined style={{color:'#fff'}}/>} />
        </div>
        <Modal visible={modalVisible} onCancel={() => setMV(false)} footer={null}>
          <Form
          style={{padding:20}}
            onFinish={onFinish}
          >
            <Item 
              name="title"
              label='标题'
              rules={[{ required: true, message: '请输入标题' }]}>
              <Input placeholder={'title'}/>
            </Item>
            <Item
              label='导师Id'
              name="instructorId"
              rules={[{ required: true, message: '请输入导师Id' }]}
            >
              <Input placeholder={'instructorId'}/>
            </Item>
            {compVisible === 'SchoolAdmin' && (
              <Item
              label='作者Id'
              name="writerId"
                rules={[{ required: true, message: '请输入作者Id' }]}
              >
                <Input placeholder={'writerId'}/>
              </Item>
            )}
            <Item
              label='摘要'
              name="digest"
              rules={[{ required: true, message: '请输入摘要!' }]}
            >
              <Input.TextArea placeholder={'digest'}/>
            </Item>
            <Item name="type" 
              label='论文类别'
              rules={[{ required: true, message: '请输入论文类别' }]}>
              <Input placeholder={'type'}/>
            </Item>
            {compVisible === 'SchoolAdmin' && (
              <Item
                name="deptId"
                label="院系Id"
                rules={[{ required: true, message: '请输入院系Id' }]}
              >
                <Input placeholder={'deptId'}/>
              </Item>
            )}
            <Item 
              name="upload"         
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label='论文文件'
              rules={[{ required: true, message: '请提交论文文件' }]}
            >
              <Upload name="logo" action={(v)=>{setFile(v)}} listType="picture">
                <Button icon={<UploadOutlined style={{color:'#1890ff'}}/>}>上传文件</Button>
              </Upload>
            </Item>
            <Item>
              <Button type='primary' htmlType='submit'>上传</Button>
            </Item>
          </Form>
        </Modal>
      </>
    )
  );
});
