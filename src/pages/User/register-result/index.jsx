import { Button, Result } from 'antd'
import { FormattedMessage, formatMessage, Link } from 'umi'
import React from 'react'
import styles from './style.less'

const actions = (
  <div className={styles.actions}>
    <Link to='/user/login'>
      <Button size='large' type='primary'>
        前去登录
      </Button>
    </Link>
    <Link to='/'>
      <Button size='large'>返回首页</Button>
    </Link>
  </div>
)

const RegisterResult = () => (
  <Result
    className={styles.registerResult}
    status='success'
    title={<div className={styles.title}>注册成功</div>}
    subTitle={`您的账号已经顺利激活，请登录系统进行使用`}
    extra={actions}
  />
)

export default RegisterResult
