import React, { useEffect, useState } from 'react';
import { history, useParams, Link } from 'umi';
import { PageHeaderWrapper, PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Table, Divider } from 'antd';
import ApiUtils from '@/utils/ApiUtils';

export default () => {
    const [selectedBookDetail, setSelectedBookDetail] = useState([]);
    const [imageIndex, setImageIndex] = useState([]);
    const params = useParams();

    useEffect(() => {
        ApiUtils.getBookDetail(params.itemId).then((res) => {
            let result = [];
            result.push({key:1, property: "书名", value: res.data["name"]});
            result.push({key:2, property: "ISBN", value: res.data["isbn"]});
            result.push({key:3, property: "作者", value: res.data["author"]});
            result.push({key:4, property: "类型", value: res.data["category"]});
            result.push({key:5, property: "折扣前价格", value: res.data["price"].toFixed(2) + " 元"});
            result.push({key:6, property: "折扣比例", value: res.data["discount"]});
            result.push({key:7, property: "折扣后价格", value: (res.data["price"] * res.data["discount"]).toFixed(2)  + " 元"});
            result.push({key:8, property: "库存量", value: res.data["inventory"] + "件"});
            result.push({key:9, property: "简介", value: res.data["abstract"]});
            setSelectedBookDetail(result);
            setImageIndex(res.data.image)
        })
    }, []);

    const columns = [
        {
          title: '属性',
          dataIndex: 'property',
          key: 'property',
        },
        {
          title: '说明',
          dataIndex: 'value',
          key: 'value',
        },
      ];

    console.log(selectedBookDetail)

    return (
        <PageHeaderWrapper>
            <img alt="example" src={`http://101.226.16.95:8089/jpg/${imageIndex}.jpg`} height="200" width="200"/>
            <Divider></Divider>
            <Card>
                <Table dataSource={selectedBookDetail} columns={columns} />
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    返回
            </Button>
            </Card>
        </PageHeaderWrapper>
    );
};
