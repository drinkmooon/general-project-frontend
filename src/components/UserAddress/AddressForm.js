import React, { useState }from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, CarOutlined } from '@ant-design/icons';
import ApiUtils from '@/utils/ApiUtils';

export default function AddressForm({preAddr,closeModal}) {
    
    const [updating, setUpdating] = useState(false);

    const onFinish = values => {
        if(preAddr){
            ApiUtils.editAddr(preAddr.id,values).then((res)=>{
                closeModal();
            })
        }
        else{
        ApiUtils.addAddr(values).then((res)=>{
            closeModal();
        })}
      };
    return (<>
        <Form
            wrapperCol={{
                span: 4,
            }}
            layout="horizontal"
            onFinish={onFinish}
            initialValues={preAddr}
        >
            <Form.Item label="姓名" name="name">
                <Input 
                    style={{width:240}}
                    placeholder={"请输入收货人姓名"}
                    prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="联系方式" name="phone">
                <Input
                    style={{width:240}}
                    placeholder="请输入电话或座机号码"
                    prefix={<PhoneOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="国家和地区" name="country">
                <Input
                    style={{width:240}}
                    placeholder="请输入您所在的国家或地区"
                    prefix={<GlobalOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
            <Form.Item label="省份" name="province">
                <Input
                    style={{width:240}}
                    placeholder="请输入您所在的省"
                    prefix={<GlobalOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
            <Form.Item label="城市" name="city">
                <Input
                    style={{width:240}}
                    placeholder="请输入您居住的城市"
                    prefix={<HomeOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="行政区" name="district">
                <Input
                    style={{width:240}}
                    placeholder="请输入您属于的行政区"/>
            </Form.Item>
            <Form.Item label="邮编" name="postCode">
                <Input
                    style={{width:160}}
                    placeholder="请输入您使用的邮编"
                    />
            </Form.Item>
            <Form.Item label="住址" name="location">
                <Input
                    style={{width:240}}
                    placeholder="请输入您的配送地址"
                    prefix={<CarOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item wrapperCol={{span:30}}>
                <Button style={{float:'right'}} type="primary" htmlType="submit">确认</Button>
            </Form.Item>
        </Form>
        </>                 
    )
}