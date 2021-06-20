/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import NeoVis from 'neovis.js';
import { Input, Radio, Empty, Button } from 'antd';
import { getScoreByOrgId, getScoreByPersonId } from '@/services/score';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  Point,
  Interval,
} from 'bizcharts';
import styles from './style.less';

const [{ Search }, { Group }] = [Input, Radio];
function SearchPage() {
  let viz;
  let top = 0;
  const [scoreData, setScoreData] = useState([]);
  const [cate, setCate] = useState(1);
  // useEffect((_) => {
  //   console.log(scoreData);
  //   // draw(`MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.hasPermId="4297347979" RETURN path LIMIT 20`);
  // }, [scoreData]);
  const deeperSearch = (node) => {
    let cypher = '';
    if (node.raw.labels[0] == 'Organization') {
      cypher = `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.\`organization-name\` CONTAINS '${node.label}' RETURN path LIMIT 25`;
      getScoreByOrgId(node.raw.properties.hasPermId).then((res) => {
        setScoreData((oldData) => [
          ...oldData,
          { name: node.label, score: res.data.score, cate: 'org' },
        ]);
      });
    }
    if (node.raw.labels[0] == 'Person') {
      cypher = `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE p.hasPermId="${node.raw.properties.hasPermId}" RETURN path LIMIT 25`;
      getScoreByPersonId(node.raw.properties.hasPermId).then((res) => {
        setScoreData((oldData) => [
          ...oldData,
          { name: node.label, score: res.data.score, cate: 'person' },
        ]);
      });
    }
    if (cypher !== '') {
      const old = viz.nodes.length;
      viz.updateWithCypher(cypher);
      setTimeout(() => {
        if (old == viz.nodes.length) {
          console.log('No more results');
        } else if (viz.nodes.length >= 99) {
          viz.renderWithCypher(cypher);
        }
      }, 2000);
    }
  };

  const draw = (currentCypher) => {
    const config = {
      container_id: 'viz',
      neo4j: {
        server_url: 'bolt://47.115.147.32:7687',
        server_user: 'neo4j',
        server_password: 'neo4jadmin',
      },
      server_url: 'bolt://47.115.147.32:7687',
      server_user: 'neo4j',
      server_password: 'neo4jadmin',
      labels: {
        Person: {
          caption: (n) => {
            n.properties.size = 3;
            return `${n.properties['given-name']} ${n.properties['family-name']}`;
          },
          size: 'size',
          title_properties: ['hasPermId', 'given-name', 'family-name', 'uri'],
        },
        Resource: {
          caption: (n) => {
            n.properties.size = 1;
            return '';
          },
          size: 'size',
        },
        Organization: {
          caption: (n) => {
            n.properties.size = 4;
            return n.properties['organization-name'];
          },
          size: 'size',
          title_properties: ['organization-name', 'hasPermId', 'HeadquartersAddress', 'uri'],
        },
      },
      relationships: {
        INTERACTS: {
          thickness: 'weight',
          caption: false,
        },
      },
      initial_cypher: currentCypher,
    };

    viz = new NeoVis(config);
    viz.render();
    viz.registerOnEvent('completed', () => {
      // eslint-disable-next-line no-underscore-dangle
      viz._network.on('click', ({ nodes }) => {
        if (nodes.length !== 0 && nodes[0] != top) {
          console.log(nodes, top);
          const node = viz.nodes.get(nodes[0]);
          top = nodes[0];
          deeperSearch(node);
          console.log(nodes[0]);
        }
      });
    });
  };
  const search = (keyword) => {
    const cypher = /^\d+$/.test(keyword)
      ? `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE ${
          cate === 1 ? 'o' : 'p'
        }.hasPermId="${keyword}" RETURN path LIMIT 25`
      : `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.\`organization-name\` CONTAINS '${keyword}' RETURN path LIMIT 25`;
    if (cate !== 1) {
      getScoreByPersonId(keyword).then((res) => {
        setScoreData((oldData) => [
          ...oldData,
          { score: res.data.score, name: keyword, cate: 'org' },
        ]);
      });
    } else if (/^\d+$/.test(keyword)) {
      getScoreByOrgId(keyword).then((res) => {
        setScoreData((oldData) => [
          ...oldData,
          { score: res.data.score, name: keyword, cate: 'person' },
        ]);
      });
    }
    if (viz) {
      viz.renderWithCypher(cypher);
    } else {
      draw(cypher);
    }
  };

  return (
    <>
      <Group
        onChange={(v) => {
          setCate(v.target.value);
        }}
        value={cate}
      >
        <Radio value={1}>Organization</Radio>
        <Radio value={2}>Person</Radio>
      </Group>
      <Search
        onSearch={(k) => {
          search(k);
        }}
      />
      <div className={styles.vizWrap}>
        <div id="viz" className={styles.viz}>
          <Empty className={styles.empty} />
        </div>
      </div>
      <div className={styles.scoreWrap}>
        {scoreData?.length != 0 ? (
          <>
            <Button className={styles.clearAll} onClick={(_) => setScoreData([])}>Clear All!</Button>
            <Chart
              data={scoreData}
              padding={[60, 20, 40, 60]}
              scale={{
                score: {
                  min: 0,
                },
              }}
              autoFit
              height={550}
            >
              <Axis name="score" labels={null} title={null} line={null} tickLine={null} />
              <Interval position="name*score" color={['cate', ['#ffff00', '#97c2fc']]} />
              <Tooltip />
              <Point position="name*score" label="name" />
            </Chart>
          </>
        ) : (
          <Empty className={styles.empty} />
        )}
      </div>
    </>
  );
}

export default SearchPage;
