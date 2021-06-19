import React, { useEffect, useState } from 'react';
import NeoVis from 'neovis.js';
import { Input, Radio, Empty } from 'antd';
import styles from './style.less';

const [{ Search }, { Group }] = [Input, Radio];
function SearchPage() {
  let viz;
  const [cate, setCate] = useState(1);
  useEffect((_) => {
    console.log(1);
    // draw(`MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.hasPermId="4297347979" RETURN path LIMIT 20`);
  }, []);
  const search = (keyword) => {
    const cypher = /^\d+$/.test(keyword)
      ? `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE ${
          cate === 1 ? 'o' : 'p'
        }.hasPermId="${keyword}" RETURN path LIMIT 25`
      : `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.\`organization-name\` CONTAINS '${keyword}' RETURN path LIMIT 25`;
    // eslint-disable-next-line no-unused-expressions
    viz ? viz.renderWithCypher(cypher) : draw(cypher);
  };
  const deeperSearch = (node) => {
    let cypher = '';
    if (node.raw.labels[0] == 'Organization') {
      cypher = `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE o.\`organization-name\` CONTAINS '${node.label}' RETURN path LIMIT 25`;
    }
    if (node.raw.labels[0] == 'Resource' && node.raw.labels[1] == 'Person') {
      cypher = `MATCH path=(p:Person)-[]->(t:TenureInOrganization)-[]->(o:Organization) WHERE p.hasPermId="${node.raw.properties.hasPermId}" RETURN path LIMIT 25`;
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
      server_url: 'bolt://47.115.147.32:7687',
      server_user: 'neo4j',
      server_password: 'neo4jadmin',
      labels: {
        Resource: {
          caption: (n) => {
            const categary = n.labels[1];
            let Title = '';
            if (categary == 'Person') {
              Title = n.properties['given-name'] + n.properties['family-name'];
            }
            return Title;
          },
          size: '3',
          community: 'Green',
          title_properties: [],
        },
        Organization: {
          caption: 'organization-name',
          size: 'pagerank',
          community: 'community',
          title_properties: ['organization-name', 'pagerank'],
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
        console.log(2);

        if (nodes.length !== 0) {
          const node = viz.nodes.get(nodes[0]);
          deeperSearch(node);
        }
      });
    });
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
      <div className={styles.scoreWrap}></div>
    </>
  );
}

export default SearchPage;
