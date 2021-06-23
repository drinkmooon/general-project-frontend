import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, Interval, Tooltip, Axis, Coordinate, getTheme } from 'bizcharts';
import { PageContainer } from '@ant-design/pro-layout';
import { getPapersDownloadRank, getPapersRating } from '@/services/statistics';

export default function () {
  const [scoreData, setScoreData] = useState([
    { item: '事例一', percent: 0.4 },
    { item: '事例二', percent: 0.21 },
    { item: '事例三', percent: 0.17 },
    { item: '事例四', percent: 0.13 },
    { item: '事例五', percent: 0.09 },
  ]);
  const scoreColors = scoreData.reduce((pre, cur, idx) => {
    pre[cur.item] = getTheme().colors10[idx];
    return pre;
  }, {});

  const scoreCols = {
    percent: {
      formatter: (val) => `${val * 100}%`,
    },
  };

  const [downData, setDownData] = useState([
    {
      title: '中国',
      downloadCount: 131744,
    },
    {
        title: '印度',
        downloadCount: 104970,
    },
    {
        title: '美国',
        downloadCount: 29034,
    },
    {
        title: '印尼',
        downloadCount: 23489,
    },
    {
        title: '巴西',
        downloadCount: 18203,
    },
  ]);

  downData.sort((a, b) => a.population - b.population);
  useEffect(_=>{
      getPapersDownloadRank().then(res=>{
          setDownData(res.pappers)
      })
      getPapersRating().then(res=>{
          const total = Object.keys(res).map(k=>res[k]).reduce((p,c,i,a)=>p+c)
          console.log(total);
          console.log(res);
          const ans = [
              {item:'优秀',percent:res.excellenceCount/total},
              {item:'合格',percent:res.passesCount/total},
              {item:'不合格',percent:res.failuresCount/total},
              {item:'未评分',percent:res.ungradedCount/total},
        ]
        setScoreData(ans)
        //   setScoreData({res})
      })
  },[])
  return (
    <PageContainer>
      <Row>
        <Col span={8} offset={2}>
          <Card title={'论文分数比例'}>
            <Chart
              height={400}
              data={scoreData}
              scale={scoreCols}
              interactions={['element-active']}
              autoFit
            >
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                label={[
                  'item',
                  (item) => {
                    return {
                      offset: 20,
                      content: (data) => {
                        return `${data.item}\n ${data.percent * 100}%`;
                      },
                      style: {
                        fill: scoreColors[item],
                      },
                    };
                  },
                ]}
              />
            </Chart>
          </Card>
        </Col>
        <Col span={8} offset={4}>
          <Card title="下载量统计">
            <Chart height={400} data={downData} autoFit>
              <Coordinate transpose />
              <Interval position="title*downloadCount" />
            </Chart>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
